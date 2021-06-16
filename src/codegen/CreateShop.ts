/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateShop
// ====================================================

export interface CreateShop_createCoffeeShop {
  __typename: "CommonResponse";
  ok: boolean;
  error: string | null;
}

export interface CreateShop {
  createCoffeeShop: CreateShop_createCoffeeShop;
}

export interface CreateShopVariables {
  name: string;
  categories: (string | null)[];
  address: string;
  lat: number;
  lng: number;
  photos?: (any | null)[] | null;
}
