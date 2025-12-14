import Pagination from "./Pagination";
import PostEntry from "./PostEntry";
import { SearchInput } from "./SearchInput";

export default async function PostList({ postList, pagination, locale, tButton }) {
  return (
    <>
      <div className="mb-3">
        <SearchInput />
      </div>
      <div className="space-y-6">
        {postList.map((entry) => (
          <PostEntry
            key={entry.id}
            title={entry.title}
            excerpt={entry.excerpt}
            slug={entry.slug}
            createdAt={entry.createdAt}
            locale={locale}
            featuredImage={entry.featuredImage}
            tButton={tButton}
          />
        ))}
      </div>
      <div className="flex justify-center mt-5">
        <Pagination paginationData={pagination} />
      </div>
    </>
  );
}
