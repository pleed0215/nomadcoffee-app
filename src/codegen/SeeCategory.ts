/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SeeCategory
// ====================================================

export interface SeeCategory_seeCategory_shops_user {
  __typename: "User";
  id: number;
  username: string;
  email: string;
  avatarURL: string | null;
}

export interface SeeCategory_seeCategory_shops_categories {
  __typename: "Category";
  id: number;
  slug: string;
}

export interface SeeCategory_seeCategory_shops_photos {
  __typename: "CoffeeShopPhoto";
  id: number;
  url: string | null;
}

export interface SeeCategory_seeCategory_shops {
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
  user: SeeCategory_seeCategory_shops_user | null;
  categories: (SeeCategory_seeCategory_shops_categories | null)[] | null;
  photos: (SeeCategory_seeCategory_shops_photos | null)[] | null;
  createdAt: any | null;
  updatedAt: any | null;
}

export interface SeeCategory_seeCategory {
  __typename: "Category";
  id: number;
  name: string;
  slug: string;
  totalShops: number | null;
  /**
   * Cursor based 페이지네이션. lastId가 주어지면 lastId 다음부터 PAGE_SIZE만큼 paging.
   */
  shops: (SeeCategory_seeCategory_shops | null)[] | null;
}

export interface SeeCategory {
  seeCategory: SeeCategory_seeCategory | null;
}

export interface SeeCategoryVariables {
  slug: string;
  lastId?: number | null;
}
