import React from 'react'
import { Dimensions, ActivityIndicator } from "react-native";
import styled from "styled-components/native";

const { width } = Dimensions.get("screen");

const ModalContainer = styled.View`
  width: ${width}px;
  height: 100%;
  flex: 1;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(10, 10, 10, 0.8);
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const LoaderBox = styled.View`
  width: ${width / 2}px;
  height: ${width / 2}px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.background.primary};
  align-items: center;
  justify-content: center;
`;

const LoaderText = styled.Text`
  text-align: center;
  font-size: 20px;
  font-family: "DoHyeon";
  color: ${(props) => props.theme.color.primary};
  margin-top: 10px;
`;

export const ModalLoader: React.FC<{ message: string }> = ({ message }) => (
  <ModalContainer>
    <LoaderBox>
      <ActivityIndicator />
      <LoaderText>{message}</LoaderText>
    </LoaderBox>
  </ModalContainer>
);
