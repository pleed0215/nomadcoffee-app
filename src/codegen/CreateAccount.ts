/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateAccount
// ====================================================

export interface CreateAccount_createAccount {
  __typename: "CommonResponse";
  ok: boolean;
  error: string | null;
}

export interface CreateAccount {
  createAccount: CreateAccount_createAccount;
}

export interface CreateAccountVariables {
  username: string;
  email: string;
  name?: string | null;
  password: string;
  location?: string | null;
  githubUsername?: string | null;
}
