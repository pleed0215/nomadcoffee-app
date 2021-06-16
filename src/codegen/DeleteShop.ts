/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteShop
// ====================================================

export interface DeleteShop_deleteCoffeeShop {
  __typename: "CommonResponse";
  ok: boolean;
  error: string | null;
}

export interface DeleteShop {
  deleteCoffeeShop: DeleteShop_deleteCoffeeShop;
}

export interface DeleteShopVariables {
  id: number;
}
