import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { LoggedInNavScreenList } from "../../navigation/navs";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { PartShop } from "../../codegen/PartShop";

const width = Dimensions.get("window").width;
const cafeWidth = (width - 2 - 10 - 20 - 40) / 3;

type CafeItemProp = {
  shop: PartShop;
  navigation: StackNavigationProp<LoggedInNavScreenList, "Search">;
};

const Container = styled.TouchableOpacity`
  width: ${cafeWidth + 2}px;
  height: ${cafeWidth + 42}px;
  border: 1px solid ${(props) => props.theme.color.border};
  margin-right: 10px;
  margin-bottom: 10px;
  overflow: hidden;
`;

const Photo = styled.Image`
  width: ${cafeWidth}px;
  height: ${cafeWidth}px;
`;
const CafeName = styled.Text`
  font-family: "DoHyeon";
  font-size: 18px;
  text-align: center;
  color: ${(props) => props.theme.color.primary};
`;

export const ShopItem: React.FC<CafeItemProp> = ({ shop, navigation }) => {
  const onPress = () => {
    navigation.navigate("Shop", { id: shop.id, name: shop.name });
  };
  return (
    <Container onPress={onPress}>
      <Photo source={{ uri: shop.firstPhotoUrl! }} />
      <CafeName>{shop.name}</CafeName>
    </Container>
  );
};
