import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { View } from "react-native";
import styled, { css } from "styled-components/native";
import { AllUser } from "../../codegen/AllUser";
import { LoggedInNavScreenList } from "../../navigation/navs";
import { ToggleFollows } from "../ToggleFollow";
import { Avatar } from "../Avatar";

type UserItemProp = {
  user: AllUser;
  navigation: StackNavigationProp<LoggedInNavScreenList, "Search">;
  authId?: number;
  last?: boolean;
};
const UserItemContainer = styled.TouchableOpacity<{ last?: boolean }>`
  width: 100%;
  ${(props) =>
    !props.last &&
    css`
      margin-bottom: 20px;
    `};
  flex-direction: row;
  justify-content: space-between;
`;
const UserInfoBox = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;
const ProfileBox = styled.View`
  justify-content: center;
`;
const Username = styled.Text`
  color: ${(props) => props.theme.color.primary};
  font-size: 18px;
  font-family: "DoHyeon";
`;
const Email = styled.Text`
  color: ${(props) => props.theme.color.primary};
  font-size: 16px;
  font-family: "DoHyeon";
`;
export const UserItem: React.FC<UserItemProp> = ({
  authId,
  user,
  navigation,
  last,
}) => {
  const onPress = () => {
    navigation.navigate("User", { id: user.id });
  };

  return (
    <UserItemContainer onPress={onPress} last={last}>
      <UserInfoBox>
        <Avatar uri={user.avatarURL} size={30} color="white" />
        <ProfileBox>
          <Username>{user.username}</Username>
          <Email>{user.email}</Email>
        </ProfileBox>
      </UserInfoBox>
      {authId && authId !== user.id ? (
        <ToggleFollows
          authId={authId}
          userId={user.id}
          isFollowing={user.isFollowing!}
        />
      ) : (
        <View />
      )}
    </UserItemContainer>
  );
};
