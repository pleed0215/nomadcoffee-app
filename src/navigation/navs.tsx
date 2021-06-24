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
import { Platform, Text } from "react-native";
import { useTheme } from "styled-components/native";
import { HomeScreen } from "../screens/logged.in/home";
import { ProfileScreen } from "../screens/logged.in/profile";
import { SearchScreen } from "../screens/logged.in/search";
import { ShopScreen } from "../screens/logged.in/shop";
import { UserScreen } from "../screens/logged.in/user";
import { CategoryScreen } from "../screens/logged.in/category";
import { AuthScreen } from "../screens/logged.out/auth";

// logged in navs & types.
export type LoggedInNavScreenList = {
  Home: any;
  Search: any;
  Profile: any;
  Shop: { id: number; name: string };
  User: { id: number };
  Category: { slug: string };
  Auth: any;
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
const StackNav = createStackNavigator<LoggedInNavScreenList>();
type LoggedInStackFactoryProp = {
  screenName: keyof LoggedInNavScreenList;
};

const RenderHomeTitle = () => {
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
      NOMAD COFFEE
    </Text>
  );
};

const RenderDownBackIcon: React.FC<{ color: string }> = ({ color }) => (
  <Ionicons
    name={Platform.OS === "ios" ? "ios-chevron-down" : "md-chevron-down"}
    color={color}
    size={32}
    style={{ marginLeft: 10 }}
  />
);

export const LoggedInStackFactory: React.FC<LoggedInStackFactoryProp> = ({
  screenName,
}) => {
  const theme = useTheme();

  const downArrowScreenOptions = {
    headerStyle: {
      backgroundColor: theme.background.secondary,
      shadowColor: "transparent",
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 0,
    },
    headerTitle: "",
    headerBackTitleVisible: false,
    headerBackImage: () => (
      <Ionicons
        name={Platform.OS === "ios" ? "ios-chevron-down" : "md-chevron-down"}
        color={theme.color.secondary}
        size={32}
        style={{ marginLeft: 10 }}
      />
    ),
  };

  return (
    <StackNav.Navigator mode="modal">
      {screenName === "Home" && (
        <StackNav.Screen
          component={HomeScreen}
          name="Home"
          options={{
            headerTitle: RenderHomeTitle,
            headerBackTitleVisible: false,
            headerLeft: () => <></>,
            headerStyle: { backgroundColor: theme.background.secondary },
          }}
        />
      )}
      {screenName === "Search" && (
        <StackNav.Screen component={SearchScreen} name="Search" />
      )}
      {screenName === "Profile" && (
        <StackNav.Screen
          component={ProfileScreen}
          name="Profile"
          options={{
            headerShown: false,
          }}
        />
      )}
      {screenName === "Auth" && (
        <StackNav.Screen
          component={AuthScreen}
          name="Auth"
          initialParams={{ isCreating: false }}
          options={{
            headerShown: false,
          }}
        />
      )}
      <StackNav.Screen
        component={ShopScreen}
        name="Shop"
        options={downArrowScreenOptions}
      />
      <StackNav.Screen
        component={UserScreen}
        name="User"
        options={{
          headerStyle: {
            backgroundColor: theme.background.secondary,
            shadowColor: "transparent",
            shadowOffset: { width: 0, height: 0 },
            shadowRadius: 0,
          },
          headerTitle: "",
          headerBackTitleVisible: false,
          headerBackImage: () => (
            <RenderDownBackIcon color={theme.color.secondary} />
          ),
        }}
      />
      <StackNav.Screen
        component={CategoryScreen}
        name="Category"
        options={{
          headerBackTitleVisible: false,
          headerBackImage: () => (
            <RenderDownBackIcon color={theme.color.secondary} />
          ),
        }}
      />
    </StackNav.Navigator>
  );
};
