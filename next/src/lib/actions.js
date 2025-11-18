"use server";

import { createFormSchema } from "./schemas";
import { getTranslations } from "next-intl/server";

const createLead = async (data) => {
  const token = process.env.STRAPI_FORM_TOKEN;
  const endpoint = `/api/leads`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ data }), // Wrap data in a 'data' object as required by Strapi
  };

  try {
    const res = await fetch(new URL(endpoint, process.env.NEXT_PUBLIC_STRAPI).href, options);

    if (!res.ok) {
      throw new Error(`Failed to create submission: ${res.status} ${res.statusText}`);
    }

    return await res.json(); // Return the response from Strapi
  } catch (error) {
    console.error(`Error creating submission: ${error.message}`);
    throw new Error(`Unable to create submission.`);
  }
};

const sanitizeInput = (data) => ({
  name: data.name.trim(),
  email: data.email.trim(),
  message: data.message.trim(),
  consent: data.consent,
});

export async function onSubmitAction(data) {
  const tZodErrors = await getTranslations("errors.zodValidation");
  const tFormErrors = await getTranslations("errors.forms");

  try {
    // Check honeypot field
    if (data.name) {
      console.warn(tFormErrors("honeypot"), data.name);
      throw new Error(tFormErrors("spamSubmission"));
    }

    // Sanitize input
    const schema = createFormSchema(tZodErrors);
    const sanitizedData = sanitizeInput(data);

    // Validate data using Zod
    const result = schema.safeParse(sanitizedData);

    if (!result.success) {
      console.error(tFormErrors("validation"), result.error);
      throw new Error(tFormErrors("invalidData"));
    }

    const validatedData = result.data;

    const { name, ...dataWithoutName } = validatedData;

    // Save lead to database
    await createLead(dataWithoutName);

    // Send email notification
  } catch (error) {
    console.error(tFormErrors("processing"), error);
    throw new Error(tFormErrors("generalProcessing"));
  }
}
