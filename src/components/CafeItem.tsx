import React, { useEffect, useState, Fragment } from "react";
import styled from "styled-components/native";

import { Avatar } from "./Avatar";
import { AllShop } from "../codegen/AllShop";
import { CategoryItem } from "./CategoryItem";
import { Dimensions, Image, TouchableOpacity } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { LoggedInNavScreenList } from "../navigation/navs";
import { Carousel } from "./Carousel";

const screen = Dimensions.get("screen");

interface CafeItemProps {
  shop: AllShop;
}

const PhotoItemWrapper = styled.View`
  justify-content: space-between;
  width: ${screen.width}px;
  border: 1px solid ${(props) => props.theme.color.border};
  margin-bottom: 10px;
`;

const Photo = styled.Image``;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  height: 50px;
  align-items: center;
  padding: 4px 8px;
  background-color: ${(props) => props.theme.background.primary};
  color: ${(props) => props.theme.background.primary};
`;

const HeaderTitle = styled.Text`
  font-size: 18px;
  font-family: "DoHyeon";
  color: ${(props) => props.theme.color.primary};
`;
const Body = styled.View``;
const Categories = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const AvatarContainer = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const UsernameText = styled.Text`
  font-family: "DoHyeon";
  font-size: 15px;
  color: ${(props) => props.theme.color.link};
  margin-left: 3px;
`;

export const CafeItem: React.FC<CafeItemProps> = ({ shop }) => {
  const [images, setImages] = useState<string[]>([]);

  const navigator = useNavigation<NavigationProp<LoggedInNavScreenList>>();
  useEffect(() => {
    if (shop.photos) {
      setImages(shop?.photos?.map((photo) => photo?.url!));
    }
  }, [shop]);

  const onPressShop = () => {
    navigator.navigate("Shop", { id: shop.id, name: shop.name });
  };
  const onPressUser = () => {
    if (shop.user?.id) {
      navigator.navigate("User", { id: shop.user?.id });
    }
  };

  return (
    <PhotoItemWrapper>
      <Header>
        <TouchableOpacity onPress={onPressShop}>
          <HeaderTitle>{shop.name}</HeaderTitle>
        </TouchableOpacity>
        <AvatarContainer onPress={onPressUser}>
          <Avatar uri={shop.user?.avatarURL} color="gray" size={30} />
          <UsernameText>{shop.user?.username}</UsernameText>
        </AvatarContainer>
      </Header>
      <Body>
        <Carousel images={images} />

        <Categories>
          {shop.categories?.slice(0, 4).map((category, index) => (
            <CategoryItem
              key={`Shop:${shop.id}-${category?.slug!}`}
              slug={category?.slug!}
              last={index % 4 === 3}
            />
          ))}
        </Categories>
      </Body>
    </PhotoItemWrapper>
  );
};
