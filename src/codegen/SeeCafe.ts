/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SeeCafe
// ====================================================

export interface SeeCafe_seeCoffeeShop_user {
  __typename: "User";
  id: number;
  username: string;
  email: string;
  avatarURL: string | null;
}

export interface SeeCafe_seeCoffeeShop_categories {
  __typename: "Category";
  id: number;
  slug: string;
}

export interface SeeCafe_seeCoffeeShop_photos {
  __typename: "CoffeeShopPhoto";
  id: number;
  url: string | null;
}

export interface SeeCafe_seeCoffeeShop {
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
  user: SeeCafe_seeCoffeeShop_user | null;
  categories: (SeeCafe_seeCoffeeShop_categories | null)[] | null;
  photos: (SeeCafe_seeCoffeeShop_photos | null)[] | null;
  createdAt: any | null;
  updatedAt: any | null;
}

export interface SeeCafe {
  seeCoffeeShop: SeeCafe_seeCoffeeShop | null;
}

export interface SeeCafeVariables {
  id: number;
}
