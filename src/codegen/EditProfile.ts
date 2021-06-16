/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EditProfile
// ====================================================

export interface EditProfile_editProfile {
  __typename: "CommonResponse";
  ok: boolean;
  error: string | null;
}

export interface EditProfile {
  editProfile: EditProfile_editProfile;
}

export interface EditProfileVariables {
  id: number;
  username?: string | null;
  email?: string | null;
  password?: string | null;
  name?: string | null;
  location?: string | null;
  githubUsername?: string | null;
}
