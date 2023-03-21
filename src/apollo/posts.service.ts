import { IPagination, IPost } from '@/types/IPost';
import { gql } from '@apollo/client';

export interface GetMarketplacePostsQueryParams {
  text?: string;
  tagsSlugs?: string[];
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: string;
}

export interface GetMarketplacePostsResponse {
  filterMarketplacePosts: {
    data: IPost[];
    pagination: IPagination;
  };
}

export const getMarketplacePostsQuery = (
  queryParams: GetMarketplacePostsQueryParams
) => {
  return gql`
    query {
      filterMarketplacePosts(filterPostsInput: 
        { 
          ${
            queryParams.tagsSlugs?.length
              ? `tagsSlugs: ${JSON.stringify(queryParams.tagsSlugs)}`
              : ''
          } 
          ${queryParams.text ? `text:"${queryParams.text}"` : ''}
          ${queryParams.page ? `page:${queryParams.page}` : ''}
          ${queryParams.limit ? `limit:${queryParams.limit}` : ''}
          ${queryParams.order ? `.order:${queryParams.order}` : ''}
          ${queryParams.sortBy ? `.sortBy:${queryParams.sortBy}` : ''}
        }
      ) {
        data {
          _id
          name
          description
          mainImageUrl
          address
          rating
          openHours
          location {
            coordinates
          }
        }
        pagination {
          page
          total
          numberOfPages
          count
          limit
        }
      }
    }
  `;
};
