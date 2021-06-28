import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import {
  LoggedInStackFactoryProp,
  RenderHomeTitle,
  StackNav,
  RenderDownBackIcon,
} from "./navs";
import { Platform } from "react-native";
import { HomeScreen } from "../screens/logged.in/home";
import { SearchScreen } from "../screens/logged.in/search";
import { ProfileScreen } from "../screens/logged.in/profile";
import { AuthScreen } from "../screens/logged.out/auth";
import { ShopScreen } from "../screens/logged.in/shop";
import { UserScreen } from "../screens/logged.in/user";
import { CategoryScreen } from "../screens/logged.in/category";

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
