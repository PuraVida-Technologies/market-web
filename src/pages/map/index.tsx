import {
    GeFilterMarketplacePostsVariables,
    GetMarketPlacePostResponse,
    GetMarketPlacePostVariables,
    GetMarketplacePostsResponse,
    POSTS_LIMIT,
    getMarketPlacePostQuery,
    getMarketplacePostsQuery,
  } from '@/apollo/posts.service';
  
  import { Header } from '@/components/common/Header';
  import { Tags } from '@/components/common/Tags';
  import { useQuery } from '@apollo/client';
  import { Spin } from 'antd';
  import {
    ArrayParam,
    NumberParam,
    StringParam,
    useQueryParams,
    withDefault,
  } from 'use-query-params';
  
  export default function MapPage() {
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
              {/*//! Post */}
              {postsLoading && (
                <section className="h-full flex-auto grid place-content-center">
                  <Spin size="large" />
                </section>
              )}

              {/* adding map */}

            </main>
          </section>
        </main>
      </>
    );
  }
  