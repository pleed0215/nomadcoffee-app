/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchCategory
// ====================================================

export interface SearchCategory_searchCategoriesByTerm_shops {
  __typename: "CoffeeShop";
  id: number;
  name: string;
  firstPhotoUrl: string | null;
  /**
   * Is my shop?
   */
  isMine: boolean | null;
}

export interface SearchCategory_searchCategoriesByTerm {
  __typename: "Category";
  id: number;
  name: string;
  slug: string;
  totalShops: number | null;
  /**
   * Cursor based 페이지네이션. lastId가 주어지면 lastId 다음부터 PAGE_SIZE만큼 paging.
   */
  shops: (SearchCategory_searchCategoriesByTerm_shops | null)[] | null;
}

export interface SearchCategory {
  searchCategoriesByTerm: (SearchCategory_searchCategoriesByTerm | null)[] | null;
}

export interface SearchCategoryVariables {
  term: string;
}
