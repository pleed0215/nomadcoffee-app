import React from "react";
import { View } from "react-native";
import { Postcode } from "@actbase/react-daum-postcode";
import { Dimensions } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { CafeInfoNavScreenList } from "../../../navigation/upload";

export const AddressScreen: React.FC<
  StackScreenProps<CafeInfoNavScreenList, "Address">
> = ({ route, navigation }) => {
  const screen = Dimensions.get("screen");
  const { addressDispatcher } = route.params;

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Postcode
        style={{ flex: 1, width: screen.width }}
        onSelected={(data) => {
          addressDispatcher(data.roadAddress);
          navigation.goBack();
        }}
        onError={(error) => alert(error)}
        jsOptions={{ focusInput: true }}
      />
    </View>
  );
};
