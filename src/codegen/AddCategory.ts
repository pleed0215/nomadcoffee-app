/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddCategory
// ====================================================

export interface AddCategory_addCategoriesToShop {
  __typename: "MutationResponse";
  ok: boolean;
  error: string | null;
}

export interface AddCategory {
  addCategoriesToShop: AddCategory_addCategoriesToShop;
}

export interface AddCategoryVariables {
  id: number;
  categories: (string | null)[];
}
