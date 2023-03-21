export interface ITag {
  _id: string;
  name: string;
  slug: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export enum POST_STATUS {
  APPROVED = 'approved',
  REJECTED = 'rejected',
  PENDING = 'pending',
}

export interface ILocation {
  type: string;
  coordinates: [number, number];
}

export interface IOwner {
  phoneNumber: string;
  isPhoneVerified?: boolean;
  email: string;
  isEmailVerified?: boolean;
  hidePhoneNumber?: boolean;
}

export interface IPost {
  _id: string;
  name: string;
  tags: ITag[];
  description: string;
  mainImageUrl: string;
  imagesUrls?: string[];
  address: string;
  userId: string;
  status: POST_STATUS;
  openHours?: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  rating: number;
  location?: ILocation;
  owner?: IOwner;
}

export interface IPagination {
  page: number;
  total: number;
  numberOfPages: number;
  count: number;
  limit: number;
}
