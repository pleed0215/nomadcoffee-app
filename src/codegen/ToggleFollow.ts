/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ToggleFollow
// ====================================================

export interface ToggleFollow_toggleFollow {
  __typename: "FollowResponse";
  ok: boolean;
  error: string | null;
  message: string | null;
  /**
   * Return boolean according to follow or unfollow
   */
  followed: boolean | null;
}

export interface ToggleFollow {
  toggleFollow: ToggleFollow_toggleFollow;
}

export interface ToggleFollowVariables {
  userId: number;
}
