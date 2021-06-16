/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: AllCategory
// ====================================================

export interface AllCategory_shops_user {
  __typename: "User";
  id: number;
  username: string;
  email: string;
  avatarURL: string | null;
}

export interface AllCategory_shops_categories {
  __typename: "Category";
  id: number;
  slug: string;
}

export interface AllCategory_shops_photos {
  __typename: "CoffeeShopPhoto";
  id: number;
  url: string | null;
}

export interface AllCategory_shops {
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
  user: AllCategory_shops_user | null;
  categories: (AllCategory_shops_categories | null)[] | null;
  photos: (AllCategory_shops_photos | null)[] | null;
  createdAt: any | null;
  updatedAt: any | null;
}

export interface AllCategory {
  __typename: "Category";
  id: number;
  name: string;
  slug: string;
  totalShops: number | null;
  /**
   * Cursor based 페이지네이션. lastId가 주어지면 lastId 다음부터 PAGE_SIZE만큼 paging.
   */
  shops: (AllCategory_shops | null)[] | null;
}
