/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MyShops
// ====================================================

export interface MyShops_searchShopsByUserId_user {
  __typename: "User";
  id: number;
  username: string;
  email: string;
  avatarURL: string | null;
}

export interface MyShops_searchShopsByUserId_categories {
  __typename: "Category";
  id: number;
  slug: string;
}

export interface MyShops_searchShopsByUserId_photos {
  __typename: "CoffeeShopPhoto";
  id: number;
  url: string | null;
}

export interface MyShops_searchShopsByUserId {
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
  user: MyShops_searchShopsByUserId_user | null;
  categories: (MyShops_searchShopsByUserId_categories | null)[] | null;
  photos: (MyShops_searchShopsByUserId_photos | null)[] | null;
  createdAt: any | null;
  updatedAt: any | null;
}

export interface MyShops {
  searchShopsByUserId: (MyShops_searchShopsByUserId | null)[] | null;
}

export interface MyShopsVariables {
  id: number;
}
