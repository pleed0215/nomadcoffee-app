import React from "react";

import { LoggedOutNavigator } from "./navs";
import { WelcomeScreen } from "../screens/logged.out/welcome";
import { LoggedInWrapperNav } from "./logged.in";
import { AuthScreen } from "../screens/logged.out/auth";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../apollo/client";

export const LoggedOutNav = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <LoggedOutNavigator.Navigator
      initialRouteName={isLoggedIn ? "Home" : "Welcome"}
    >
      <LoggedOutNavigator.Screen
        component={WelcomeScreen}
        name="Welcome"
        options={{ headerShown: false }}
      />
      <LoggedOutNavigator.Screen
        component={AuthScreen}
        name="Auth"
        options={{ headerShown: false }}
      />
      <LoggedOutNavigator.Screen
        component={LoggedInWrapperNav}
        name="Home"
        options={{ headerShown: false }}
      />
    </LoggedOutNavigator.Navigator>
  );
};
