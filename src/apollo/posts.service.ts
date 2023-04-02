import { IPagination, IPost } from '@/types/IPost';
import { gql } from '@apollo/client';
export const POSTS_LIMIT = 12;
//#region Get Marketplace posts
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
  query GeFilterMarketplacePosts(
    $filterPostsInput: FilterMarketplacePostsInput!
  ) {
    filterMarketplacePosts(filterPostsInput: $filterPostsInput) {
      data {
        _id
        name
        description
        mainImageUrl
        imagesUrls
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
//#endregion

//#region Get Marketplace post
export interface GetMarketPlacePostVariables {
  postId: string;
}

export interface GetMarketPlacePostResponse {
  getMarketPlacePost: IPost;
}

export const getMarketPlacePostQuery = gql`
  query GetMarketPlacePost($postId: String!) {
    getMarketPlacePost(id: $postId) {
      _id
      address
      createdAt
      description
      imagesUrls
      location {
        coordinates
      }
      mainImageUrl
      name
      openHours
      owner {
        email
        phoneNumber
      }
      rating
      slug
      status
      tags {
        name
        icon
        slug
        status
        _id
      }
      userId
    }
  }
`;
//#endregion
