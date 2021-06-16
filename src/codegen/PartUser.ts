/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PartUser
// ====================================================

export interface PartUser {
  __typename: "User";
  id: number;
  username: string;
  email: string;
  name: string | null;
  avatarURL: string | null;
  location: string | null;
  githubUsername: string | null;
  /**
   * Total number of user followed
   */
  totalFollowers: number | null;
  /**
   * Total number of user following
   */
  totalFollowings: number | null;
}
