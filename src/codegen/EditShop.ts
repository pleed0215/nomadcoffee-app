/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EditShop
// ====================================================

export interface EditShop_editCoffeeShop {
  __typename: "MutationResponse";
  ok: boolean;
  error: string | null;
}

export interface EditShop {
  editCoffeeShop: EditShop_editCoffeeShop;
}

export interface EditShopVariables {
  id: number;
  name?: string | null;
  address?: string | null;
  lat?: number | null;
  lng?: number | null;
  photos?: (any | null)[] | null;
}
