/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveCategory
// ====================================================

export interface RemoveCategory_removeCategoryFromShop {
  __typename: "MutationResponse";
  ok: boolean;
  error: string | null;
}

export interface RemoveCategory {
  removeCategoryFromShop: RemoveCategory_removeCategoryFromShop;
}

export interface RemoveCategoryVariables {
  id: number;
  slug: string;
}
