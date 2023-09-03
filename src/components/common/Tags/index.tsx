import { Button } from "antd";
import {
  ArrayParam,
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "use-query-params";

import { useQuery } from "@apollo/client";
import {
  GetMarketplaceTagsResponse,
  getMarketplaceTagsQuery,
} from "@/apollo/tags.service";

export function Tags() {
  const [query, setQuery] = useQueryParams({
    text: withDefault(StringParam, null),
    page: withDefault(NumberParam, 1),
    tags: withDefault(ArrayParam, []),
    selectedPostId: StringParam,
  });
  const { data: tags } = useQuery<GetMarketplaceTagsResponse>(
    getMarketplaceTagsQuery
  );
  function tagsHandler(clickedTagSlug: string) {
    const isFound = query.tags?.includes(clickedTagSlug as never);

    if (isFound) {
      setQuery(
        {
          tags: query.tags?.filter((slug) => slug !== clickedTagSlug),
        },
        "replace"
      );
    } else {
      setQuery({ tags: [...query?.tags, clickedTagSlug] }, "replace");
    }
  }

  return (
    <>
      {tags?.getMarketplaceTags?.data.length ? (
        <nav className="flex flex-col flex-wrap h-10 justify-center items-center w-full overflow-x-scroll scrollbar-hide gap-2.5 rounded shadow p-1">
          <Button
            type={query.tags.length ? "default" : "primary"}
            onClick={() =>
              setQuery({ tags: null as unknown as string[] }, "replace")
            }
            className="max-w-min"
          >
            All
          </Button>
          {tags?.getMarketplaceTags?.data?.map((tag) => (
            <Button
              className="capitalize"
              type={
                query.tags?.includes(tag.slug as never) ? "primary" : "default"
              }
              key={tag._id}
              onClick={() => tagsHandler(tag.slug)}
            >
              {tag.name}
            </Button>
          ))}
        </nav>
      ) : null}
    </>
  );
};

