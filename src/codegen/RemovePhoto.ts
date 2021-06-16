/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemovePhoto
// ====================================================

export interface RemovePhoto_removePhotoFromShop {
  __typename: "MutationResponse";
  ok: boolean;
  error: string | null;
}

export interface RemovePhoto {
  removePhotoFromShop: RemovePhoto_removePhotoFromShop;
}

export interface RemovePhotoVariables {
  id: number;
  photoId: number;
}
