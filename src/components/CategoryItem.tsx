import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { Dimensions } from "react-native";
import styled, { css } from "styled-components/native";
import { LoggedInNavScreenList } from "../navigation/navs";

const window = Dimensions.get("window");

type CategoryItemProps = {
  slug: string;
  last?: boolean;
};

const CategoryContainer = styled.TouchableOpacity<{ last?: boolean }>`
  width: ${(window.width - 20) / 4}px;
  height: 30px;
  padding: 3px 5px;
  background-color: ${(props) => props.theme.background.secondary};
  font-size: 14px;
  border-radius: 10px;
  overflow: hidden;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  margin-top: 5px;
  margin-bottom: 5px;
  ${(props) =>
    !props.last &&
    css`
      margin-right: 5px;
    `};
`;

const CategoryText = styled.Text`
  font-family: "DoHyeon";
  margin-right: 5px;
  font-size: 16px;
  color: ${(props) => props.theme.color.secondary};
`;

export const CategoryItem: React.FC<CategoryItemProps> = ({ slug, last }) => {
  const navigator = useNavigation<NavigationProp<LoggedInNavScreenList>>();

  const onPressCategory = (slug: string) => () => {
    navigator.navigate("Category", { slug });
  };
  return (
    <CategoryContainer last={last} onPress={onPressCategory(slug)}>
      <CategoryText>{slug}</CategoryText>
    </CategoryContainer>
  );
};
