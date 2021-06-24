/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchUsers
// ====================================================

export interface SearchUsers_searchUsers_results {
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

export interface SearchUsers_searchUsers {
  __typename: "SearchUsersResponse";
  total: number;
  results: (SearchUsers_searchUsers_results | null)[] | null;
}

export interface SearchUsers {
  /**
   * lastId: cursor based pagination. lastId가 제공되면 lastId 다음 record부터 data fetching.
   */
  searchUsers: SearchUsers_searchUsers;
}

export interface SearchUsersVariables {
  term: string;
  lastId?: number | null;
}
