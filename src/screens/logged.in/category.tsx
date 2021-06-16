import React from "react";
import { View, Text } from "react-native";
import { LoggedInNavScreenParam } from "../../navigation/navs";

export const CategoryScreen: React.FC<LoggedInNavScreenParam<"Category">> = ({
  route,
}) => {
  const { slug } = route.params;
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Text>category: {slug}</Text>
    </View>
  );
};
