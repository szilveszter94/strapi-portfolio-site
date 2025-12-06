import { routing } from "./navigation";
import {
  layoutSchema,
  homePageSchema,
  projectsPageSchema,
  blogPageSchema,
  contactPageSchema,
  privacyPageSchema,
  notFoundPageSchema,
  postCollectionSchema,
  projectCollectionSchema,
  allSlugsSchema,
  dynamicPageMetadataSchema,
  aboutPageSchema,
} from "./schemas";

const qs = require("qs");

//
// Main Fetch Function
//

async function fetchData(endpoint) {
  const token = process.env.STRAPI_READ_ONLY_TOKEN;
  const url = new URL(endpoint, process.env.NEXT_PUBLIC_STRAPI).href;
  const cacheStrategy = process.env.NODE_ENV === "production" ? "force-cache" : "no-store";

  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: cacheStrategy,
  };

  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}: ${error.message}`);
    throw new Error(`Unable to fetch data from ${endpoint}.`);
  }
}

//
// Validation Utility
//

async function validateResponse(response, schema, endpoint) {
  const result = schema.safeParse(response);
  if (!result.success) {
    console.error(`Validation failed for ${endpoint}:`, result.error);
    throw new Error(`Invalid data received from ${endpoint}`);
  }
  return result.data; // Return the parsed data if validation succeeds
}

//
// Layout & Pages
//

export const fetchLayout = async (locale) => {
  const query = qs.stringify(
    {
      locale: locale,
      populate: {
        siteRepresentation: { populate: "*" },
        icons: { populate: "*" },
        announcement: true,
        footer: { populate: "*" },
        miscellaneous: { populate: "*" },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  const endpoint = `/api/global?${query}`;
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, layoutSchema, endpoint);
  return {
    announcement: validatedData.data.announcement,
    footer: validatedData.data.footer,
    siteRepresentation: validatedData.data.siteRepresentation,
    miscellaneous: validatedData.data.miscellaneous,
    icons: validatedData.data.icons,
  };
};

export const fetchHomePage = async (locale) => {
  const validatedLocale = locale ? locale : routing.defaultLocale;
  const query = qs.stringify(
    {
      locale: validatedLocale,
      populate: {
        metadata: { populate: "*" },
        about: { populate: "*" },
        featuredProjects: true,
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  const endpoint = `/api/homepage?${query}`;
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, homePageSchema, endpoint);
  return {
    metadata: validatedData.data.metadata,
    about: validatedData.data.about,
    featuredProjects: validatedData.data.featuredProjects,
  };
};

export const fetchProjectsPage = async (locale) => {
  const query = qs.stringify(
    {
      locale: locale,
      populate: {
        metadata: { populate: "*" },
        banner: true,
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  const endpoint = `/api/projects-page?${query}`;
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, projectsPageSchema, endpoint);
  return {
    metadata: validatedData.data.metadata,
    banner: validatedData.data.banner,
  };
};

export const fetchBlogPage = async (locale) => {
  const query = qs.stringify(
    {
      locale: locale,
      populate: {
        metadata: { populate: "*" },
        banner: true,
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  const endpoint = `/api/blog-page?${query}`;
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, blogPageSchema, endpoint);
  return {
    metadata: validatedData.data.metadata,
    banner: validatedData.data.banner,
  };
};

export const fetchContactPage = async (locale) => {
  const query = qs.stringify(
    {
      locale: locale,
      populate: {
        metadata: { populate: "*" },
        banner: true,
      },
      fields: ["contactFormHeading", "otherContactOptionsHeading"],
    },
    {
      encodeValuesOnly: true,
    }
  );
  const endpoint = `/api/contact-page?${query}`;
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, contactPageSchema, endpoint);
  return {
    contactFormHeading: validatedData.data.contactFormHeading,
    otherContactOptionsHeading: validatedData.data.otherContactOptionsHeading,
    metadata: validatedData.data.metadata,
    banner: validatedData.data.banner,
  };
};

export const fetchAboutPage = async (locale) => {
  const query = qs.stringify(
    {
      locale: locale,
      populate: {
        about: { populate: "*" },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  const endpoint = `/api/about?${query}`;
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, aboutPageSchema, endpoint);
  return { about: validatedData.data.about };
};

export const fetchPrivacyPage = async (locale) => {
  const query = qs.stringify(
    {
      locale: locale,
      populate: {
        metadata: { populate: "*" },
        banner: true,
      },
      fields: ["content"],
    },
    {
      encodeValuesOnly: true,
    }
  );
  const endpoint = `/api/privacy-policy?${query}`;
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, privacyPageSchema, endpoint);
  return {
    metadata: validatedData.data.metadata,
    banner: validatedData.data.banner,
    content: validatedData.data.content,
  };
};

export const fetchNotFoundPage = async (locale) => {
  const query = qs.stringify(
    {
      locale: locale,
      populate: {
        metadata: { populate: "*" },
        banner: true,
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  const endpoint = `/api/not-found?${query}`;
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, notFoundPageSchema, endpoint);
  return {
    metadata: validatedData.data.metadata,
    banner: validatedData.data.banner,
  };
};

//
// Post-related
//

export const fetchAllPosts = async (locale) => {
  // Fetch posts sorted by the createdAt field in descending order (most recent first)
  const query = qs.stringify(
    {
      locale: locale,
      populate: "*",
      sort: ["createdAt:desc"],
      pagination: {
        pageSize: 100,
        page: 1,
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  const endpoint = `/api/posts?${query}`;
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, postCollectionSchema, endpoint);

  return validatedData.data;
};

export const fetchLatestPosts = async (locale) => {
  // Fetch posts sorted by the createdAt field in descending order (most recent first)
  const query = qs.stringify(
    {
      locale: locale,
      populate: "*",
      sort: ["createdAt:desc"],
      pagination: {
        start: 0,
        limit: 3,
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  const endpoint = `/api/posts?${query}`;
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, postCollectionSchema, endpoint);
  return validatedData.data;
};

export const fetchPostBySlug = async (slug, locale) => {
  const query = qs.stringify(
    {
      locale: locale,
      populate: "*",
      filters: {
        slug: {
          $eq: slug,
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  const endpoint = `/api/posts?${query}`;
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, postCollectionSchema, endpoint);

  // Return null if the data is undefined or the array is empty (no post found for the given slug)
  if (!validatedData.data || validatedData.data.length === 0) return null;

  const post = validatedData.data[0];

  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    featuredImage: post.featuredImage,
    author: post.author,
  };
};

export const fetchPostSitemap = async () => {
  const query = qs.stringify(
    {
      populate: "*",
    },
    {
      encodeValuesOnly: true,
    }
  );
  const endpoint = `/api/posts?${query}`;
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, postCollectionSchema, endpoint);
  const posts = validatedData.data;
  return posts.map((post) => ({
    slug: post.slug,
    updatedAt: post.updatedAt,
  }));
};

//
// Project-related
//

export const fetchAllProjects = async (locale) => {
  // Fetch projects sorted by the order field in ascending order
  const query = qs.stringify(
    {
      locale: locale,
      populate: "*",
      sort: ["order:asc"],
      pagination: {
        pageSize: 100,
        page: 1,
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  const endpoint = `/api/projects?${query}`;
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, projectCollectionSchema, endpoint);
  return validatedData.data;
};

export const fetchFeaturedProjects = async (locale) => {
  // Fetch featured projects sorted by the order field in ascending order
  const query = qs.stringify(
    {
      locale: locale,
      populate: "*",
      filters: {
        isFeatured: {
          $eq: true,
        },
      },
      sort: ["order:asc"],
    },
    {
      encodeValuesOnly: true,
    }
  );
  const endpoint = `/api/projects?${query}`;
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, projectCollectionSchema, endpoint);
  return validatedData.data;
};

export const fetchProjectBySlug = async (slug, locale) => {
  const query = qs.stringify(
    {
      locale: locale,
      populate: "*",
      filters: {
        slug: {
          $eq: slug,
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  const endpoint = `/api/projects?${query}`;
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, projectCollectionSchema, endpoint);

  // Return null if the data is undefined or the array is empty (no project found for the given slug)
  if (!validatedData.data || validatedData.data.length === 0) return null;

  return {
    author: validatedData.data[0].author,
    title: validatedData.data[0].title,
    excerpt: validatedData.data[0].excerpt,
    duration: validatedData.data[0].duration,
    demoUrl: validatedData.data[0].demoUrl,
    repoUrl: validatedData.data[0].repoUrl,
    content: validatedData.data[0].content,
    featuredImage: validatedData.data[0].featuredImage,
    scopes: validatedData.data[0].scopes,
    tools: validatedData.data[0].tools,
    designFile: validatedData.data[0].designFile,
  };
};

export const fetchProjectSitemap = async () => {
  const query = qs.stringify(
    {
      populate: "*",
    },
    {
      encodeValuesOnly: true,
    }
  );
  const endpoint = `/api/projects?${query}`;
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, projectCollectionSchema, endpoint);
  const projects = validatedData.data;
  return projects.map((project) => ({
    slug: project.slug,
    updatedAt: project.updatedAt,
  }));
};

//
// Utilities
//

export const fetchAllSlugs = async (resource) => {
  const query = qs.stringify(
    {
      fields: ["slug"],
    },
    {
      encodeValuesOnly: true,
    }
  );
  const endpoint = `/api/${resource}?${query}`;
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, allSlugsSchema, endpoint);
  const entries = validatedData.data;
  return entries.map((entry) => ({
    slug: entry.slug,
  }));
};

export const fetchDynamicPageMetadata = async (resource, slug, locale) => {
  const query = qs.stringify(
    {
      locale: locale,
      fields: ["title", "excerpt"],
      populate: {
        featuredImage: true,
      },
      filters: {
        slug: {
          $eq: slug,
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  const endpoint = `/api/${resource}?${query}`;
  const response = await fetchData(endpoint);
  const validatedData = await validateResponse(response, dynamicPageMetadataSchema, endpoint);
  return {
    title: validatedData.data[0].title,
    description: validatedData.data[0].excerpt,
    image: validatedData.data[0].featuredImage,
  };
};
