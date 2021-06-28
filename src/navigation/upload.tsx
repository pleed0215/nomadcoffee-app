import { useNavigation } from "@react-navigation/native";
import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";
import React from "react";
import { Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";
import { AddressScreen } from "../screens/logged.in/upload/address";
import { CafeInfoScreen } from "../screens/logged.in/upload/cafe.info";
import { SelectPhotoScreen } from "../screens/logged.in/upload/select.photo";
import { TakePhotoScreen } from "../screens/logged.in/upload/take.photo";

import {
  PhotoNavigation,
  RenderDownBackIcon,
  UploadNavigation,
  UploadNavScreenList,
} from "./navs";

export type CafeInfoNavScreenList = {
  InfoInput: any;
  Address: {
    addressDispatcher: React.Dispatch<React.SetStateAction<string>>;
  };
};

const CafeInfoNavigation = createStackNavigator<CafeInfoNavScreenList>();

const CafeInfoNav = () => {
  return (
    <CafeInfoNavigation.Navigator
      mode="modal"
      initialRouteName="InfoInput"
      screenOptions={{ headerShown: false }}
    >
      <CafeInfoNavigation.Screen name="InfoInput" component={CafeInfoScreen} />
      <CafeInfoNavigation.Screen name="Address" component={AddressScreen} />
    </CafeInfoNavigation.Navigator>
  );
};

const PhotoNav: React.FC<StackScreenProps<UploadNavScreenList, "Photo">> = ({
  route,
}) => {
  const theme = useTheme();
  const { info } = route.params;
  return (
    <PhotoNavigation.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: theme.background.primary,
        },
        indicatorStyle: {
          borderBottomColor: theme.color.link,
          borderBottomWidth: 2,
        },
        labelStyle: {
          fontFamily: "DoHyeon",
          fontSize: 18,
          color: theme.color.primary,
        },
      }}
    >
      <PhotoNavigation.Screen
        name="SelectPhoto"
        component={SelectPhotoScreen}
        options={{
          tabBarLabel: "사진 선택",
        }}
        initialParams={{ info }}
      />
      <PhotoNavigation.Screen
        name="TakePhoto"
        component={TakePhotoScreen}
        options={{ tabBarLabel: "사진 찍기" }}
        initialParams={{ info }}
      />
    </PhotoNavigation.Navigator>
  );
};

export const UploadNav = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const onPressBack = () => {
    navigation.navigate("CafeInfo");
  };
  return (
    <UploadNavigation.Navigator
      screenOptions={{
        headerBackImage: () => (
          <RenderDownBackIcon color={theme.color.secondary} />
        ),
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: theme.background.secondary,
        },
        headerTitleStyle: {
          color: theme.color.secondary,
          fontSize: 24,
          fontFamily: "DoHyeon",
        },
      }}
    >
      <UploadNavigation.Screen
        name="CafeInfo"
        component={CafeInfoNav}
        options={{ title: "카페 만들기" }}
      />
      <UploadNavigation.Screen
        name="Photo"
        component={PhotoNav}
        options={{
          headerTitle: "사진",
          headerBackImage: () => (
            <TouchableOpacity onPress={onPressBack}>
              <Text
                style={{
                  fontFamily: "DoHyeon",
                  fontSize: 20,
                  color: theme.color.secondary,
                  marginLeft: 10,
                }}
              >
                <Ionicons
                  name="arrow-back"
                  color={theme.color.secondary}
                  size={24}
                  style={{ marginRight: 10 }}
                />
                뒤로
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
    </UploadNavigation.Navigator>
  );
};
