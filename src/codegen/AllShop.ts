/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: AllShop
// ====================================================

export interface AllShop_user {
  __typename: "User";
  id: number;
  username: string;
  email: string;
  avatarURL: string | null;
}

export interface AllShop_categories {
  __typename: "Category";
  id: number;
  slug: string;
}

export interface AllShop_photos {
  __typename: "CoffeeShopPhoto";
  id: number;
  url: string | null;
}

export interface AllShop {
  __typename: "CoffeeShop";
  id: number;
  name: string;
  lat: string | null;
  lng: string | null;
  address: string | null;
  firstPhotoUrl: string | null;
  /**
   * Is my shop?
   */
  isMine: boolean | null;
  user: AllShop_user | null;
  categories: (AllShop_categories | null)[] | null;
  photos: (AllShop_photos | null)[] | null;
  createdAt: any | null;
  updatedAt: any | null;
}
