import {
  GeFilterMarketplacePostsVariables,
  GetMarketPlacePostResponse,
  GetMarketPlacePostVariables,
  GetMarketplacePostsResponse,
  POSTS_LIMIT,
  getMarketPlacePostQuery,
  getMarketplacePostsQuery,
} from "@/apollo/posts.service";

import CustomPagination from "@/components/common/CustomPagination";
import Header from "@/components/common/Header";
import Tags from "@/components/common/Tags";
import PostCard from "@/components/posts/PostCard";
import PostModal from "@/components/posts/PostModal";
import { IPost } from "@/types/IPost";
import { useQuery } from "@apollo/client";
import { Button, Empty, Spin } from "antd";
import {
  ArrayParam,
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "use-query-params";

export default function HomePage() {
  const [query, setQuery] = useQueryParams({
    text: withDefault(StringParam, null),
    page: withDefault(NumberParam, 1),
    tags: withDefault(ArrayParam, []),
    selectedPostId: StringParam,
  });

  const { data: posts, loading: postsLoading } = useQuery<
    GetMarketplacePostsResponse,
    GeFilterMarketplacePostsVariables
  >(getMarketplacePostsQuery, {
    variables: {
      filterPostsInput: {
        limit: POSTS_LIMIT,
        tagsSlugs: query.tags as string[],
        page: query.page,
        text: query.text as string,
      },
    },
  });

  const { data: selectedPost, loading: loadingSelectedPost } = useQuery<
    GetMarketPlacePostResponse,
    GetMarketPlacePostVariables
  >(getMarketPlacePostQuery, {
    variables: { postId: query.selectedPostId as string },
    skip: !query.selectedPostId,
  });

  return (
    <>
      <main className="flex flex-col gap-2 md:gap-6">
        <Header postsLoading={postsLoading} />
        <section className="container flex flex-col gap-4 md:gap-6">
          {/* Tags */}
          <Tags />
          <main className="py-3 flex flex-col gap-4 items-center min-h-[70vh]">
            <section className="flex justify-between w-full md:justify-start gap">
              <h2 className="font-medium text-xl">Latest Posts</h2>
            </section>
            {/*//! Post */}
            {postsLoading && (
              <section className="h-full flex-auto grid place-content-center">
                <Spin size="large" />
              </section>
            )}
            {!postsLoading && !posts?.filterMarketplacePosts?.data?.length ? (
              <section className="h-full flex-auto grid place-content-center">
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={
                    <section className="grid place-content-center gap-y-6">
                      <span className="font-medium">No Data</span>
                      <Button
                        type="primary"
                        size="large"
                        onClick={() => setQuery({ text: null }, "replace")}
                      >
                        Clear Filters
                      </Button>
                    </section>
                  }
                />
              </section>
            ) : null}
            <ul className="list-none grid grid-cols-1 w-full rounded-md gap-3 md:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:self-stretch ">
              {posts?.filterMarketplacePosts?.data.map((post) => (
                <PostCard
                  post={post}
                  key={post._id}
                  onClick={() => setQuery({ selectedPostId: post._id })}
                />
              ))}
            </ul>
          </main>
          <CustomPagination
            defaultCurrent={query.page}
            onChange={(page) => setQuery({ page })}
            current={query.page}
            pageSize={POSTS_LIMIT}
            total={posts?.filterMarketplacePosts?.pagination?.total}
            responsive
          />
        </section>
      </main>
      <PostModal
        open={!!query.selectedPostId}
        post={selectedPost?.getMarketPlacePost as IPost}
        onCancel={() => setQuery({ selectedPostId: null })}
        loadingPost={loadingSelectedPost}
      />
    </>
  );
}
