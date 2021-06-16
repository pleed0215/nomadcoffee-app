import { gql, useApolloClient, useMutation } from "@apollo/client";
import React, { useState } from "react";
import styled from "styled-components/native";
import { ToggleFollow, ToggleFollowVariables } from "../codegen/ToggleFollow";
import { ActivityIndicator } from "react-native";

interface ToggleFollowPros {
  isFollowing: boolean;
  userId: number;
  authId: number;
}

export const MUTATION_TOGGLE_FOLLOW = gql`
  mutation ToggleFollow($userId: Int!) {
    toggleFollow(userId: $userId) {
      ok
      error
      message
      followed
    }
  }
`;

const SButton = styled.TouchableOpacity`
  width: 100px;
  height: 40px;
  align-self: center;
  justify-content: center;
  background-color: ${(props) => props.theme.background.secondary};
  border-radius: 4px;
`;

const Text = styled.Text`
  color: ${(props) => props.theme.color.secondary};
  font-weight: 600;
  font-family: "DoHyeon";
  text-align: center;
  font-size: 18px;
`;

export const ToggleFollows: React.FC<ToggleFollowPros> = ({
  isFollowing,
  authId,
  userId,
}) => {
  const [loading, setLoading] = useState(false);
  const [following, setFollowing] = useState(isFollowing);

  const [toggleFollow] = useMutation<ToggleFollow, ToggleFollowVariables>(
    MUTATION_TOGGLE_FOLLOW
  );

  const onClick = () => {
    setLoading(true);
    toggleFollow({
      variables: {
        userId,
      },
      update: (cache, result) => {
        setLoading(false);
        setFollowing((prev) => !prev);
        if (result.data?.toggleFollow.ok) {
          cache.modify({
            id: `User:${authId}`,
            fields: {
              totalFollowings(prev) {
                return following ? prev - 1 : prev + 1;
              },
            },
          });
          cache.modify({
            id: `User:${userId}`,
            fields: {
              totalFollowers(prev) {
                return following ? prev - 1 : prev + 1;
              },
              isFollowing(prev) {
                return !prev;
              },
            },
          });
        }
      },
    });
  };
  return (
    <SButton onPress={onClick}>
      {loading ? (
        <ActivityIndicator color="white" size="small" />
      ) : (
        <Text>{following ? "언팔로우" : "팔로우"}</Text>
      )}
    </SButton>
  );
};
