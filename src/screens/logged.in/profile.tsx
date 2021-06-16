import React from "react";

import { FlatList, Dimensions, ListRenderItem } from "react-native";
import styled, { useTheme } from "styled-components/native";
import { makeLogout } from "../../apollo/client";
import { ScreenLayout } from "../../components/ScreenLayout";
import { useMe } from "../../hooks/useMe";
import { LoggedInNavScreenParam } from "../../navigation/navs";
import { Avatar } from "../../components/Avatar";
import { useState } from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useQuery } from "@apollo/client";
import { MyShops, MyShopsVariables } from "../../codegen/MyShops";
import { QUERY_USERS_SHOPS } from "../../apollo/queries";
import { AllShop } from "../../codegen/AllShop";
import { EditPassword } from "../../components/EditPassword";
import { ProfileEdit } from "../../components/ProfileEdit";
import { Ionicons } from "@expo/vector-icons";

const width = Dimensions.get("window").width;
const photoWidth = (width - 30) / 2;

const Container = styled.View`
  flex: 1;
  width: 100%;
`;

const TopBox = styled.View`
  width: 100%;
  height: 100px;
  background-color: ${(props) => props.theme.background.secondary};
  position: relative;
  align-items: center;
`;
const UsernameText = styled.Text`
  font-family: "DoHyeon";
  font-size: 28px;
  text-align: center;
  position: absolute;
  top: 0px;
  color: ${(props) => props.theme.color.secondary};
`;

const ProfileContainer = styled.View`
  position: absolute;
  width: 120px;
  height: 120px;
  border-radius: 40px;
  bottom: -60px;
`;

const FollowerContainer = styled.View`
  margin-top: 70px;
  width: 50%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  align-self: center;
  margin-bottom: 10px;
`;

const FollowerText = styled.Text`
  font-family: "DoHyeon";
  font-size: 20px;
  text-align: center;
  color: ${(props) => props.theme.color.primary};
`;

const Cafes = styled.View`
  width: 100%;
  margin-top: 10px;
`;

const CafeNums = styled.Text`
  font-size: 24px;
  font-family: "DoHyeon";
  color: ${(props) => props.theme.color.primary};
  text-align: center;
`;

const CafeContainer = styled.View`
  width: 100%;
  align-self: center;
  padding-top: 10px;
`;

const CafeItem = styled.View`
  width: ${photoWidth}px;
  height: ${photoWidth + 30}px;
  border: 1px solid ${(props) => props.theme.color.border};
  margin-left: 10px;
  margin-bottom: 10px;
`;

const CafeFirstPhoto = styled.Image`
  width: ${photoWidth - 2}px;
  height: ${photoWidth - 2}px;
`;
const CafeNameContainer = styled.View`
  width: 100%;
  height: 30px;
  justify-content: center;
  border-top-color: ${(props) => props.theme.color.border};
  border-top-width: 1px;
`;
const CafeName = styled.Text`
  text-align: center;
  font-family: "DoHyeon";
  font-size: 20px;
  color: ${(props) => props.theme.color.primary};
`;

const TabContainer = styled.View`
  border-bottom-color: ${(props) => props.theme.color.primary};
  border-bottom-width: 1px;

  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 50px;
`;
const TabButton = styled.View<{ selected?: boolean }>`
  width: ${(width - 36) / 3}px;
  border: 1px solid ${(props) => props.theme.color.border};
  height: 50px;
  background-color: ${(props) =>
    props.selected
      ? props.theme.background.secondary
      : props.theme.background.primary};
  justify-content: center;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;
const TabText = styled.Text<{ selected?: boolean }>`
  font-family: "DoHyeon";
  font-size: 18px;
  text-align: center;
  color: ${(props) =>
    props.selected ? props.theme.color.secondary : props.theme.color.primary};
`;
const LogoutButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  position: absolute;
  right: 20px;
  bottom: 10px;
`;
const LogoutText = styled.Text`
  color: ${(props) => props.theme.color.secondary};
  font-size: 16px;
  font-family: "DoHyeon";
`;

const RenderCafeItem: ListRenderItem<AllShop> = ({ item }) => (
  <CafeItem>
    <CafeFirstPhoto
      width={photoWidth}
      height={photoWidth}
      source={{ uri: item.firstPhotoUrl! }}
    />
    <CafeNameContainer style={{}}>
      <CafeName>{item.name}</CafeName>
    </CafeNameContainer>
  </CafeItem>
);

export const ProfileScreen: React.FC<LoggedInNavScreenParam<"Profile">> =
  () => {
    const { data: me, loading } = useMe();
    const theme = useTheme();
    const { data: shops, loading: shopsLoading } = useQuery<
      MyShops,
      MyShopsVariables
    >(QUERY_USERS_SHOPS, {
      variables: { id: me?.me?.id! },
      skip: !me || loading,
    });
    type TypeOfTab = "profile" | "password" | "shops";
    const [tab, setTab] = useState<TypeOfTab>("profile");

    const onPressTab = (tab: TypeOfTab) => () => {
      setTab(tab);
    };
    const onPressLogout = () => {
      makeLogout();
    };
    return (
      <ScreenLayout loading={loading || shopsLoading}>
        <Container>
          {me && me.me && (
            <>
              <TopBox>
                <UsernameText>{me?.me.username}</UsernameText>
                <ProfileContainer>
                  <Avatar color="gray" uri={me?.me.avatarURL} size={120} />
                </ProfileContainer>
                <LogoutButton onPress={onPressLogout}>
                  <Ionicons
                    name="log-out"
                    color={theme.color.secondary}
                    size={18}
                    style={{ marginRight: 4 }}
                  />
                  <LogoutText>로그아웃</LogoutText>
                </LogoutButton>
              </TopBox>
              <FollowerContainer>
                <FollowerText>팔로워: {me?.me.totalFollowers}</FollowerText>
                <FollowerText>팔로잉: {me?.me.totalFollowings}</FollowerText>
              </FollowerContainer>
            </>
          )}
          <TabContainer>
            <TabButton selected={tab === "profile"}>
              <TouchableWithoutFeedback onPress={onPressTab("profile")}>
                <TabText selected={tab === "profile"}>프로필</TabText>
              </TouchableWithoutFeedback>
            </TabButton>
            <TabButton selected={tab === "password"}>
              <TouchableWithoutFeedback onPress={onPressTab("password")}>
                <TabText selected={tab === "password"}>암호 변경</TabText>
              </TouchableWithoutFeedback>
            </TabButton>
            <TabButton selected={tab === "shops"}>
              <TouchableWithoutFeedback onPress={onPressTab("shops")}>
                <TabText selected={tab === "shops"}>보유 카페</TabText>
              </TouchableWithoutFeedback>
            </TabButton>
          </TabContainer>
          {tab === "shops" &&
            shops?.searchShopsByUserId &&
            shops?.searchShopsByUserId?.length > 0 && (
              <Cafes>
                <CafeNums>
                  보유 카페: {shops?.searchShopsByUserId?.length}개
                </CafeNums>
                <CafeContainer>
                  <FlatList
                    data={shops.searchShopsByUserId as AllShop[]}
                    keyExtractor={(item: AllShop) => `Cafe:${item.id}`}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    renderItem={RenderCafeItem}
                  />
                </CafeContainer>
              </Cafes>
            )}
          {tab === "password" && me?.me && <EditPassword me={me?.me} />}
          {tab === "profile" && me?.me && <ProfileEdit me={me.me} />}
        </Container>
      </ScreenLayout>
    );
  };
