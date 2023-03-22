import { IPagination, IPost } from '@/types/IPost';
import { gql } from '@apollo/client';

export interface FilterMarketplacePostsInput {
  latitude?: number;
  limit?: number;
  longitude?: number;
  maxDistance?: number;
  minDistance?: number;
  order?: string;
  page?: number;
  sortBy?: string;
  tagsSlugs?: string[];
  text?: string;
}

export interface GeFilterMarketplacePostsVariables {
  filterPostsInput: FilterMarketplacePostsInput;
}

export interface GetMarketplacePostsResponse {
  filterMarketplacePosts: {
    data: IPost[];
    pagination: IPagination;
  };
}

export const getMarketplacePostsQuery = gql`
  # Write your query or mutation here
  query GeFilterMarketplacePosts(
    $filterPostsInput: FilterMarketplacePostsInput!
  ) {
    filterMarketplacePosts(filterPostsInput: $filterPostsInput) {
      data {
        _id
        name
        description
        mainImageUrl
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
