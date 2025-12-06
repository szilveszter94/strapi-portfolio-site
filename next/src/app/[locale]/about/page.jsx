import { fetchAboutPage, fetchLayout } from "@/lib/api";
import Form from "@/components/Form";
import About from "@/components/About";

export async function generateMetadata({ params }, parent) {
  //   const { locale } = await params;
  //   let page;
  //   try {
  //     page = await fetchAboutPage(locale);
  //   } catch (error) {
  //     console.error(error.message);
  //     // Return fallback metadata in case of validation or fetch errors
  //     return {};
  //   }
  //   // Access data from parent segment (i.e. layout)
  //   const p = await parent;
  //   // Destructure/Format the necessary properties
  //   const { metadata } = page;
  //   const { title, description, image } = metadata;
  //   const url = new URL("/contact/", process.env.NEXT_PUBLIC_WEBSITE).href;
  //   const imageUrl = image ? new URL(image.url, process.env.NEXT_PUBLIC_STRAPI).href : p.openGraph.images[0];
  //   return {
  //     title: title ? title : `Contact | ${p.openGraph.siteName}`,
  //     description: description ? description : p.description,
  //     openGraph: {
  //       ...p.openGraph,
  //       images: [imageUrl],
  //       url,
  //       type: "website",
  //     },
  //     alternates: {
  //       canonical: url,
  //     },
  //   };
}

export default async function Page({ params }) {
  const { locale } = await params;
  const [page, global] = await Promise.allSettled([fetchAboutPage(locale), fetchLayout(locale)]);

  if (page.status === "rejected") {
    return (
      <div className="mx-auto max-w-5xl p-4">
        <div className="text-red-600 text-center">
          Error: We encountered an issue while loading the &quot;Contact&quot; page.
        </div>
      </div>
    );
  }

  // Destructure the necessary properties
  const { about } = page.value;

  return (
    <>
      {/* Add JSON-LD to your page */}
      <div className="-mt-[69px]">
        <About data={about} locale={locale} />
      </div>
    </>
  );
}
