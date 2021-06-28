import React from "react";
import { Dimensions } from "react-native";
import styled, { css, useTheme } from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

const window = Dimensions.get("window");

type CategoryItemProps = {
  slug: string;
  last?: boolean;
  onRemove: (slug: string) => void;
};

const CategoryContainer = styled.View<{ last?: boolean }>`
  width: ${(window.width - 40) / 4}px;
  height: 30px;
  padding-top: 3px;
  padding-bottom: 3px;
  padding-right: 5px;
  padding-left: 5px;
  background-color: ${(props) => props.theme.background.secondary};
  font-size: 14px;
  border-radius: 10px;
  overflow: hidden;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-top: 5px;
  margin-bottom: 5px;
  ${(props) =>
    !props.last &&
    css`
      margin-right: 5px;
    `};
`;

const TextWrapper = styled.View`
  width: 60px;
  overflow: hidden;
`;
const CategoryText = styled.Text`
  font-family: "DoHyeon";
  margin-right: 5px;
  font-size: 14px;
  color: ${(props) => props.theme.color.secondary};
  align-items: center;
  justify-content: center;
`;

const RemoveButton = styled.TouchableOpacity`
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.color.secondary};
`;

export const UploadCategory: React.FC<CategoryItemProps> = ({
  slug,
  last,
  onRemove,
}) => {
  const {
    color: { primary },
  } = useTheme();
  const onPress = () => {
    onRemove(slug);
  };
  return (
    <CategoryContainer last={last}>
      <TextWrapper>
        <CategoryText numberOfLines={1}>{slug}</CategoryText>
      </TextWrapper>
      <RemoveButton onPress={onPress}>
        <Ionicons name="remove" color={primary} size={16} />
      </RemoveButton>
    </CategoryContainer>
  );
};
