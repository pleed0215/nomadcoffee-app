import React from "react";
import "react-native-gesture-handler";
import { useColorScheme } from "react-native";
import { AppearanceProvider } from "react-native-appearance";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { useState } from "react";

import { ApolloProvider } from "@apollo/client";

import { ThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from "./src/theme/theme";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_TOKEN_NAME } from "./src/constants";
import { makeLogin } from "./src/apollo/client";
import { apolloClient } from "./src/apollo/client";

import { LoggedOutNav } from "./src/navigation/logged.out";
import { NavigationContainer } from "@react-navigation/native";
import { persistor } from "./src/apollo/persistor";

export default function App() {
  const [loading, setLoading] = useState(true);
  const color = useColorScheme();

  const preload = async () => {
    const images = [require("./assets/intro.jpg")];
    const fontsToLoad = [
      Ionicons.font,
      {
        DoHyeon: require("./assets/DoHyeon-Regular.ttf"),
        LuckiestGuy: require("./assets/LuckiestGuy-Regular.ttf"),
      },
    ];

    const cacheImages = images.map((image) =>
      Asset.fromModule(image).downloadAsync()
    );
    const token = await AsyncStorage.getItem(AUTH_TOKEN_NAME);

    const cacheFonts = fontsToLoad.map((font) => Font.loadAsync(font));

    await persistor.restore();
    if (token) {
      makeLogin(token);
    }

    await Promise.all<any>([...cacheImages, ...cacheFonts]);
  };

  if (loading) {
    return (
      <AppLoading
        onError={console.warn}
        onFinish={() => setLoading(false)}
        startAsync={preload}
      />
    );
  }

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={color === "dark" ? darkTheme : lightTheme}>
        <AppearanceProvider>
          <NavigationContainer>
            <LoggedOutNav />
          </NavigationContainer>
        </AppearanceProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}
