import SectionHeader from "./SectionHeader";
import ProjectCarousel from "./ProjectCarousel";
import BtnSecondary from "./BtnSecondary";
import ShapeDivider from "./ShapeDivider";
import { useTranslations } from "next-intl";

export default function FeaturedProjects({ data, projects, locale }) {
  // Destructure the necessary properties
  const { headline, supportiveText } = data;
  const tButton = useTranslations("buttons");
  const tErrors = useTranslations("errors.general");

  return (
    <section className="bg-neutral-50 py-24 relative overflow-hidden">
      <ShapeDivider className="fill-white" />
      <div className="relative mx-auto max-w-5xl px-4">
        <SectionHeader headline={headline} supportiveText={supportiveText} />
        {projects.status === "rejected" ? (
          <div className="text-red-600 text-center">{tErrors("projectsNotLoading")}</div>
        ) : projects.value.length > 0 ? (
          <ProjectCarousel projects={projects.value} baseUrl={process.env.NEXT_PUBLIC_STRAPI} locale={locale} buttonText={tButton("readMore")} />
        ) : (
          <p className="text-center text-gray-500">{tErrors("noProjectsAvailable")}</p>
        )}
        <div className="mt-6 md:mt-12 flex items-center justify-center gap-x-4">
          <BtnSecondary label={tButton("viewAllProjects")} url={`/${locale}/projects/`} showIcon={true} />
        </div>
      </div>
    </section>
  );
}
