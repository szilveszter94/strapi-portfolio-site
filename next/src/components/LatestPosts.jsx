import SectionHeader from "./SectionHeader";
import PostList from "./PostList";
import BtnSecondary from "./BtnSecondary";
import ShapeDivider from "./ShapeDivider";
import { useTranslations } from "next-intl";

export default function LatestPosts({ data, posts, locale }) {
  // Destructure the necessary properties
  const { headline, supportiveText } = data;
  const tButton = useTranslations("buttons");
  const tErrors = useTranslations("errors.general");

  return (
    <section className="bg-neutral-50 py-24 relative">
      <ShapeDivider className="fill-white" />
      <div className="relative mx-auto max-w-5xl px-4">
        <SectionHeader headline={headline} supportiveText={supportiveText} />
        {posts.status === "rejected" ? (
          <div className="text-red-600 text-center">{tErrors("postsNotLoading")}</div>
        ) : posts.value.length > 0 ? (
          <PostList postList={posts.value} locale={locale} tButton={tButton} />
        ) : (
          <p className="text-center text-gray-500">{tErrors("noPostsAvailable")}</p>
        )}
        <div className="mt-6 md:mt-12 flex items-center justify-center gap-x-4">
          <BtnSecondary label={tButton("viewAllPosts")} url={`/${locale}/blog`} showIcon={true} />
        </div>
      </div>
    </section>
  );
}
