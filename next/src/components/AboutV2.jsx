import SectionHeader from "./SectionHeader";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import ShapeDivider from "./ShapeDivider";
import BtnSecondary from "./BtnSecondary";
import { useTranslations } from "next-intl";

export default function AboutV2({ data, locale }) {
  // Destructure/Format the necessary properties
  const tButton = useTranslations("buttons");
  const { headline, supportiveText, content, image } = data;
  const imageUrl = new URL(image.url, process.env.NEXT_PUBLIC_STRAPI).href;

  return (
    <section className="bg-white py-24 relative">
      <ShapeDivider className="fill-neutral-50" />
      <div className="relative mx-auto max-w-5xl px-4">
        <SectionHeader headline={headline} supportiveText={supportiveText} />

        {/* HEADER IMAGE */}
        <div className="relative w-full h-64 rounded-2xl overflow-hidden border border-neutral-200 mb-8">
          <Image
            src={imageUrl}
            alt={image.alternativeText ?? ""}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* TEXT CONTENT */}
        <div className="bg-neutral-50 rounded-2xl border border-neutral-200 p-6 md:p-10 shadow-sm">
          <div
            className="prose prose-gray prose-lg max-w-none mx-auto text-center"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(marked.parse(content)),
            }}
          />
        </div>

        <div className="mt-2 md:mt-12 flex items-center justify-center gap-x-4">
          <BtnSecondary label={tButton("viewAbout")} url={`/${locale}/about/`} showIcon={true} />
        </div>
      </div>
    </section>
  );
}
