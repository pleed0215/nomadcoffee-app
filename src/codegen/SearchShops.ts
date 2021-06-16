/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchShops
// ====================================================

export interface SearchShops_searchShopsByTerm {
  __typename: "CoffeeShop";
  id: number;
  name: string;
  firstPhotoUrl: string | null;
  /**
   * Is my shop?
   */
  isMine: boolean | null;
}

export interface SearchShops {
  searchShopsByTerm: (SearchShops_searchShopsByTerm | null)[] | null;
}

export interface SearchShopsVariables {
  term: string;
}
