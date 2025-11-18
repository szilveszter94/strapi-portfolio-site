import PostEntry from "./PostEntry";

export default async function PostList({ postList, locale, tButton }) {
  return (
    <div className="space-y-6">
      {postList.map((entry) => (
        <PostEntry
          key={entry.id}
          title={entry.title}
          excerpt={entry.excerpt}
          slug={entry.slug}
          createdAt={entry.createdAt}
          locale={locale}
          tButton={tButton}
        />
      ))}
    </div>
  );
}