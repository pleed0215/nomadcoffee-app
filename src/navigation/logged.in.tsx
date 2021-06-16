import React from "react";

import { Ionicons } from "@expo/vector-icons";
import { LoggedInNavigator, LoggedInStackFactory } from "./navs";
import { useTheme } from "styled-components/native";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../apollo/client";

export const LoggedInNav: React.FC = () => {
  const theme = useTheme();
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return (
    <LoggedInNavigator.Navigator
      tabBarOptions={{
        showLabel: false,
        activeTintColor: theme.color.secondary,
        inactiveTintColor: "rgb(100,100,100)",
        style: {
          backgroundColor: theme.background.secondary,
        },
      }}
    >
      <LoggedInNavigator.Screen
        name="Home"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={focused ? 32 : 28}
              color={color}
            />
          ),
        }}
      >
        {() => <LoggedInStackFactory screenName="Home" />}
      </LoggedInNavigator.Screen>
      <LoggedInNavigator.Screen
        name="Search"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              size={focused ? 32 : 28}
              color={color}
            />
          ),
        }}
      >
        {() => <LoggedInStackFactory screenName="Search" />}
      </LoggedInNavigator.Screen>
      <LoggedInNavigator.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={focused ? 32 : 28}
              color={color}
            />
          ),
        }}
      >
        {() => (
          <LoggedInStackFactory screenName={isLoggedIn ? "Profile" : "Auth"} />
        )}
      </LoggedInNavigator.Screen>
    </LoggedInNavigator.Navigator>
  );
};
