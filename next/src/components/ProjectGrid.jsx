import Pagination from "./Pagination";
import ProjectEntry from "./ProjectEntry";
import { SearchInput } from "./SearchInput";

export default function ProjectGrid({ projects, pagination, locale, buttonText }) {
  return (
    <>
      <div className="mb-3">
        <SearchInput />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {projects.map((entry, index) => {
          const imageUrl = entry.featuredImage
          ? new URL(entry.featuredImage.url, process.env.NEXT_PUBLIC_STRAPI).href
          : null;
          return (
            <ProjectEntry
              key={entry.id}
              featuredImageUrl={imageUrl}
              featuredImageAlternativeText={entry.featuredImage.alternativeText}
              title={entry.title}
              excerpt={entry.excerpt}
              slug={entry.slug}
              priority={index < 4} // Prioritize the first 4 project images
              locale={locale}
              buttonText={buttonText}
            />
          );
        })}
      </div>
      <div className="flex justify-center mt-5">
        <Pagination paginationData={pagination} />
      </div>
    </>
  );
}
