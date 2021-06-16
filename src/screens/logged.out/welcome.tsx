import { NavigationProp, useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Dimensions,
  ImageBackground,
  Text,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";
import { LoggedOutNavScreenList } from "../../navigation/navs";

const halfWidth = Dimensions.get("screen").width / 2;

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const AuthButton = styled.TouchableOpacity`
  width: ${halfWidth}px;
  height: 50px;
  background-color: ${(props) => props.theme.background.secondary};
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;
const HomeButton = styled.TouchableOpacity`
  width: ${halfWidth}px;
  height: 50px;
  color: ${(props) => props.theme.color.primary};
  background-color: ${(props) => props.theme.background.primary};
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
  font-family: "DoHyeon";
  border-radius: 5px;
`;
const AuthText = styled.Text`
  font-family: "DoHyeon";
  font-size: 20px;
  color: ${(props) => props.theme.color.secondary};
`;
const HomeText = styled.Text`
  font-family: "DoHyeon";
  font-size: 20px;
  color: ${(props) => props.theme.color.primary};
`;
const JoinText = styled.Text`
  font-family: "DoHyeon";
  font-size: 20px;
  color: ${(props) => props.theme.color.secondary};
  margin-top: 5px;
  font-weight: 600;
`;

export const WelcomeScreen = () => {
  const navigation = useNavigation<NavigationProp<LoggedOutNavScreenList>>();
  const onPressLogin = () => {
    navigation.navigate("Auth", { isCreating: false });
  };
  const onPressHome = () => {
    navigation.navigate("Home");
  };
  const onPressJoin = () => {
    navigation.navigate("Auth", { isCreating: true });
  };
  return (
    <Container>
      <StatusBar style="auto" />
      <ImageBackground
        style={{ flex: 1, width: "100%" }}
        source={require("../../../assets/intro.jpg")}
      >
        <BlurView
          style={{
            flex: 1,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
          intensity={70}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "LuckiestGuy",
              fontSize: 32,
              marginBottom: 50,
            }}
          >
            NOMAD COFFEE
          </Text>
          <AuthButton onPress={onPressLogin}>
            <AuthText>로그인</AuthText>
          </AuthButton>
          <HomeButton onPress={onPressHome}>
            <HomeText>둘러보기</HomeText>
          </HomeButton>
          <TouchableOpacity onPress={onPressJoin}>
            <JoinText>가입하기</JoinText>
          </TouchableOpacity>
        </BlurView>
      </ImageBackground>
    </Container>
  );
};
