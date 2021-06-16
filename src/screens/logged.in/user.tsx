import { useQuery, useReactiveVar } from "@apollo/client";
import React from "react";

import styled from "styled-components/native";
import { isLoggedInVar } from "../../apollo/client";
import { QUERY_USERS_SHOPS, QUERY_USER } from "../../apollo/queries";
import { SeeUser, SeeUserVariables } from "../../codegen/SeeUser";
import { Avatar } from "../../components/Avatar";
import { ScreenLayout } from "../../components/ScreenLayout";
import { useMe } from "../../hooks/useMe";
import { LoggedInNavScreenParam } from "../../navigation/navs";
import { ToggleFollows } from "../../components/ToggleFollow";
import { MyShops, MyShopsVariables } from "../../codegen/MyShops";
import { Dimensions, FlatList, ListRenderItem } from "react-native";
import { AllShop } from "../../codegen/AllShop";

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

export const UserScreen: React.FC<LoggedInNavScreenParam<"User">> = ({
  route,
}) => {
  const { id } = route.params;
  const { data, loading } = useQuery<SeeUser, SeeUserVariables>(QUERY_USER, {
    variables: { id },
  });
  const { data: shops, loading: shopsLoading } = useQuery<
    MyShops,
    MyShopsVariables
  >(QUERY_USERS_SHOPS, { variables: { id } });
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data: me } = useMe();

  return (
    <ScreenLayout loading={loading || shopsLoading}>
      <Container>
        <TopBox>
          <UsernameText>{data?.seeUser?.username}</UsernameText>
          <ProfileContainer>
            <Avatar color="gray" uri={data?.seeUser?.avatarURL} size={120} />
          </ProfileContainer>
        </TopBox>
        <FollowerContainer>
          <FollowerText>팔로워: {data?.seeUser?.totalFollowers}</FollowerText>
          <FollowerText>팔로잉: {data?.seeUser?.totalFollowings}</FollowerText>
        </FollowerContainer>
        {isLoggedIn && data?.seeUser?.id !== me?.me?.id && (
          <ToggleFollows
            isFollowing={data?.seeUser?.isFollowing!}
            authId={me?.me?.id!}
            userId={data?.seeUser?.id!}
          />
        )}
        {shops?.searchShopsByUserId && shops?.searchShopsByUserId?.length > 0 && (
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
      </Container>
    </ScreenLayout>
  );
};
