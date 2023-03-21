import {
  GetMarketplacePostsResponse,
  getMarketplacePostsQuery,
} from '@/apollo/posts.service';
import {
  GetMarketplaceTagsResponse,
  getMarketplaceTagsQuery,
} from '@/apollo/tags.service';
import CustomPagination from '@/components/common/CustomPagination';
import PostCard from '@/components/posts/PostCard';
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import { Button, Empty, Input, Spin } from 'antd';
import Image from 'next/image';
import {
  ArrayParam,
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from 'use-query-params';

export default function Home() {
  const [query, setQuery] = useQueryParams({
    text: withDefault(StringParam, null),
    page: withDefault(NumberParam, 1),
    tags: withDefault(ArrayParam, []),
  });

  const { data: posts, loading: postsLoading } =
    useQuery<GetMarketplacePostsResponse>(
      getMarketplacePostsQuery({
        tagsSlugs: query.tags as string[],
        page: query.page,
        limit: 12,
        text: query?.text as string,
      })
    );

  const { data: tags } = useQuery<GetMarketplaceTagsResponse>(
    getMarketplaceTagsQuery()
  );

  const tagsHandler = (clickedTagSlug: string) => {
    const isFound = query.tags?.includes(clickedTagSlug as never);
    if (isFound) {
      setQuery(
        {
          tags: query.tags?.filter((slug) => slug !== clickedTagSlug),
        },
        'replace'
      );
    } else {
      setQuery({ tags: [...query?.tags, clickedTagSlug] }, 'replace');
    }
  };

  return (
    <main className="flex flex-col gap-2 md:gap-6">
      <header className="border-b border-gray-light p-4 md:py-6">
        <section className="container flex justify-center items-center flex-wrap gap-3 md:justify-start md:flex-nowrap ">
          <section className="flex justify-center items-center w-full md:w-1/4 md:justify-start">
            <Image
              alt=""
              src={'/assets/Logo.svg'}
              width={40}
              height={40}
              className="object-contain object-center"
            />
            <h1 className="font-medium text-2xl">Puravida</h1>
          </section>
          <Input
            className="rounded-full md:max-w-md"
            size="large"
            prefix={<SearchOutlined />}
            placeholder="Restaurants"
            suffix={postsLoading && query.text ? <LoadingOutlined /> : null}
            onChange={(event) =>
              setQuery({ text: event.target.value.trim() || null })
            }
            value={query?.text as string}
          />
        </section>
      </header>
      <section className="container flex flex-col gap-4 md:gap-6">
        {tags?.getMarketplaceTags?.data.length ? (
          <nav className="flex flex-col flex-wrap h-10 justify-center items-center w-full overflow-x-scroll scrollbar-hide gap-2.5 rounded shadow p-1">
            <Button
              type={query.tags.length ? 'default' : 'primary'}
              onClick={() =>
                setQuery({ tags: null as unknown as string[] }, 'replace')
              }
              className="max-w-min"
            >
              All
            </Button>
            {tags?.getMarketplaceTags?.data?.map((tag) => (
              <Button
                className="capitalize"
                type={
                  query.tags?.includes(tag.slug as never)
                    ? 'primary'
                    : 'default'
                }
                key={tag._id}
                onClick={() => tagsHandler(tag.slug)}
              >
                {tag.name}
              </Button>
            ))}
          </nav>
        ) : null}
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
                      onClick={() => setQuery({ text: null }, 'replace')}
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
              <PostCard post={post} key={post._id} />
            ))}
          </ul>
        </main>
        <CustomPagination
          defaultCurrent={query.page}
          onChange={(page) => setQuery({ page })}
          current={query.page}
          pageSize={12}
          total={posts?.filterMarketplacePosts?.pagination?.total}
          responsive
        />
      </section>
    </main>
  );
}
