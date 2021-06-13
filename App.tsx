import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Text,
  useColorScheme,
  Image,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { useState } from "react";
import { BlurView } from "expo-blur";

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

    const cacheFonts = fontsToLoad.map((font) => Font.loadAsync(font));

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
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ImageBackground
        style={{ flex: 1, width: "100%" }}
        source={require("./assets/intro.jpg")}
      >
        <BlurView
          style={{
            flex: 1,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "DoHyeon",
              fontSize: 24,
            }}
          >
            NOMAD COFFEE
          </Text>
        </BlurView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
