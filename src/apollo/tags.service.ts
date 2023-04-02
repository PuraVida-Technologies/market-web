import { IPagination, ITag } from '@/types/IPost';
import { gql } from '@apollo/client';

export interface GetMarketplaceTagsResponse {
  getMarketplaceTags: {
    data: ITag[];
    pagination: IPagination;
  };
}

export const getMarketplaceTagsQuery = gql`
  query {
    getMarketplaceTags(getMarketPlaceTagsInput: { limit: 1000 }) {
      data {
        name
        icon
        _id
        status
        slug
      }
      pagination {
        total
        numberOfPages
        count
        limit
        page
      }
    }
  }
`;
