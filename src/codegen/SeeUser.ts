/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SeeUser
// ====================================================

export interface SeeUser_seeUser {
  __typename: "User";
  id: number;
  username: string;
  email: string;
  name: string | null;
  avatarURL: string | null;
  githubUsername: string | null;
  /**
   * Total number of user followed
   */
  totalFollowers: number | null;
  /**
   * Total number of user following
   */
  totalFollowings: number | null;
  /**
   * Are you following me?
   */
  isFollowed: boolean | null;
  /**
   * Am I following you?
   */
  isFollowing: boolean | null;
  /**
   * Are you logged in user?
   */
  isMe: boolean | null;
  location: string | null;
}

export interface SeeUser {
  seeUser: SeeUser_seeUser | null;
}

export interface SeeUserVariables {
  id: number;
}
