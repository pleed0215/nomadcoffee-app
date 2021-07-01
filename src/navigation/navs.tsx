import React from "react";
import { Ionicons } from "@expo/vector-icons";

import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Platform, Text } from "react-native";
import { useTheme } from "styled-components/native";

// logged in navs & types.
export type LoggedInNavScreenList = {
  Home: any;
  Search: any;
  Profile: any;
  Shop: { id: number; name: string };
  User: { id: number };
  Category: { slug: string };
  Auth: any;
  Upload: any;
};
export type LoggedInNavScreenParam<
  ScreenName extends keyof LoggedInNavScreenList
> = BottomTabScreenProps<LoggedInNavScreenList, ScreenName>;
export type LoggedInStackScreenParam<
  ScreenName extends keyof LoggedInNavScreenList
> = StackScreenProps<LoggedInNavScreenList, ScreenName>;
export const LoggedInNavigator =
  createBottomTabNavigator<LoggedInNavScreenList>();

// logged out navs & types.
export type LoggedOutNavScreenList = {
  Welcome: any;
  Auth: { isCreating: boolean };
  Home: any;
};

export type LoggedOutNavScreenParam<
  ScreenName extends keyof LoggedOutNavScreenList
> = StackScreenProps<LoggedOutNavScreenList, ScreenName>;

export const LoggedOutNavigator =
  createStackNavigator<LoggedOutNavScreenList>();

// stack nav factory
export const StackNav = createStackNavigator<LoggedInNavScreenList>();
export type LoggedInStackFactoryProp = {
  screenName: keyof LoggedInNavScreenList;
};

export const RenderHomeTitle = () => {
  const theme = useTheme();
  return (
    <Text
      style={{
        fontSize: 30,
        fontFamily: "LuckiestGuy",
        textAlign: "center",
        color: theme.color.secondary,
      }}
    >
      NOMAD COFFEE~!
    </Text>
  );
};

export const RenderDownBackIcon: React.FC<{ color: string }> = ({ color }) => (
  <Ionicons
    name={Platform.OS === "ios" ? "ios-chevron-down" : "md-chevron-down"}
    color={color}
    size={32}
    style={{ marginLeft: 10 }}
  />
);

// Upload Nav(Stack nav)
// Must be logged in.
// popped up on parent Nav.(LoggedIn)
// screen1 -> Write cafe names, location, categories
// screen2 -> Top Tab Nav, select photos or take photos(Can take multi photos).. Upload button on header right.
export type CafeInfo = {
  name: string;
  categories: Array<string>;
  address: string;
  lat: number;
  lng: number;
};
export type UploadNavScreenList = {
  CafeInfo: any;
  Photo: {
    info: CafeInfo;
  };
};
export const UploadNavigation = createStackNavigator<UploadNavScreenList>();

export type PhotoNavScreenList = {
  TakePhoto: {
    info: CafeInfo;
  };
  SelectPhoto: {
    info: CafeInfo;
  };
};
export const PhotoNavigation =
  createMaterialTopTabNavigator<PhotoNavScreenList>();
