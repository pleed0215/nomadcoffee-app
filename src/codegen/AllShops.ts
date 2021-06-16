/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllShops
// ====================================================

export interface AllShops_seeCoffeeShops_user {
  __typename: "User";
  id: number;
  username: string;
  email: string;
  avatarURL: string | null;
}

export interface AllShops_seeCoffeeShops_categories {
  __typename: "Category";
  id: number;
  slug: string;
}

export interface AllShops_seeCoffeeShops_photos {
  __typename: "CoffeeShopPhoto";
  id: number;
  url: string | null;
}

export interface AllShops_seeCoffeeShops {
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
  user: AllShops_seeCoffeeShops_user | null;
  categories: (AllShops_seeCoffeeShops_categories | null)[] | null;
  photos: (AllShops_seeCoffeeShops_photos | null)[] | null;
  createdAt: any | null;
  updatedAt: any | null;
}

export interface AllShops {
  seeCoffeeShops: (AllShops_seeCoffeeShops | null)[] | null;
}

export interface AllShopsVariables {
  lastId?: number | null;
}
