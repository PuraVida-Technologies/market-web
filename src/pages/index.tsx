import {
  GeFilterMarketplacePostsVariables,
  GetMarketPlacePostBySlugResponse,
  GetMarketPlacePostBySlugVariables,
  GetMarketplacePostsResponse,
  POSTS_LIMIT,
  getMarketPlacePostBySlugQuery,
  getMarketplacePostsQuery,
} from "@/apollo/posts.service";
import { NextSeo, DefaultSeoProps } from "next-seo";
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
    slug: StringParam,
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
    GetMarketPlacePostBySlugResponse,
    GetMarketPlacePostBySlugVariables
  >(getMarketPlacePostBySlugQuery, {
    variables: { slug: query.slug as string },
    skip: !query.slug,
  });

  const metaData: DefaultSeoProps = !query.slug
    ? {}
    : {
        openGraph: {
          url: `${process.env.NEXT_WEBSITE_URL}?slug=${selectedPost?.getMarketPlacePostBySlug?.slug}`,
          title: `Pura Vida | ${selectedPost?.getMarketPlacePostBySlug?.name}`,
          description: selectedPost?.getMarketPlacePostBySlug?.description,
          images: selectedPost?.getMarketPlacePostBySlug?.imagesUrls?.map(
            (url) => ({
              url: url,
              width: 800,
              height: 600,
              alt: selectedPost?.getMarketPlacePostBySlug?.name,
            })
          ),
        },
        canonical: `${process.env.NEXT_WEBSITE_URL}?slug=${selectedPost?.getMarketPlacePostBySlug?.slug}`,
      };

  return (
    <>
      <NextSeo {...metaData} />
      <main className="flex flex-col ">
        <Header postsLoading={postsLoading} />
        <section className="container flex flex-col gap-4 md:gap-6">
          <Tags />
        </section>
        <section className="container flex flex-col gap-4 md:gap-6">
          {/* Tags */}
          {/* <Tags /> */}
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
                        onClick={() => setQuery({ text: null }, "replace")}>
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
                  onClick={() => setQuery({ slug: post.slug })}
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
        open={!!query.slug}
        post={selectedPost?.getMarketPlacePostBySlug as IPost}
        onCancel={() => setQuery({ slug: null })}
        loadingPost={loadingSelectedPost}
      />
    </>
  );
}
