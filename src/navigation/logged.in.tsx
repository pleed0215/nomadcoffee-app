import React from "react";

import { Ionicons } from "@expo/vector-icons";
import { LoggedInNavigator } from "./navs";
import { LoggedInStackFactory } from "./factory.nav";
import { useTheme } from "styled-components/native";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../apollo/client";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { UploadNav } from "./upload";

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
      {isLoggedIn && (
        <LoggedInNavigator.Screen
          name="Upload"
          component={View}
          listeners={({ navigation }) => {
            return {
              tabPress: (e) => {
                e.preventDefault();
                navigation.navigate("UploadNav");
              },
            };
          }}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "camera" : "camera-outline"}
                color={color}
                size={focused ? size + 4 : size}
              />
            ),
          }}
        />
      )}
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

// LoggedInWrapperNavigation
type LoggedInWrapperNavScreenList = {
  Home: any;
  UploadNav: any;
};
const LoggedInWrapperNavigation =
  createStackNavigator<LoggedInWrapperNavScreenList>();

export const LoggedInWrapperNav = () => {
  return (
    <LoggedInWrapperNavigation.Navigator
      mode="modal"
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <LoggedInWrapperNavigation.Screen name="Home" component={LoggedInNav} />
      <LoggedInWrapperNavigation.Screen
        name="UploadNav"
        component={UploadNav}
      />
    </LoggedInWrapperNavigation.Navigator>
  );
};
