import React, { useCallback, useLayoutEffect } from "react";
import {
  TouchableOpacity,
  TextInput,
  LogBox,
  StyleProp,
  TextStyle,
  Dimensions,
} from "react-native";
import { useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { CafeInfoNavScreenList } from "../../../navigation/upload";
import { useEffect } from "react";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { GOOGLE_API } from "@env";
import styled, { DefaultTheme, useTheme } from "styled-components/native";
import { UploadCategory } from "../../../components/upload/UploadCategory";
import { useRef } from "react";
import { Text } from "react-native";
import { DismissKeyboard } from "../../../components/DismissKeyboard";

const Container = styled.ScrollView`
  flex: 1;
  width: 100%;
  padding: 10px;
  background-color: ${(props) => props.theme.background.primary};
`;
const Title = styled.Text`
  font-family: "DoHyeon";
  font-size: 24px;
  color: ${(props) => props.theme.color.primary};
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Label = styled.Text`
  font-family: "DoHyeon";
  font-size: 16px;
  color: ${(props) => props.theme.color.primary};
  text-align: left;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const CategoryContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`;

const Map = styled.View`
  margin-top: 10px;
  width: 100%;
  height: 300px;
  border: 1px solid ${(props) => props.theme.color.border};
  overflow: hidden;
`;

const inputStyle = (theme: DefaultTheme) => {
  const style: StyleProp<TextStyle> = {
    fontFamily: "DoHyeon",
    fontSize: 18,
    color: theme.color.primary,
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: theme.color.border,
    borderRadius: 5,
    marginBottom: 5,
  };
  return style;
};
export const CafeInfoScreen: React.FC<
  StackScreenProps<CafeInfoNavScreenList, "InfoInput">
> = ({ navigation }) => {
  const theme = useTheme();
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<Array<string>>([]);
  const [location, setLocation] =
    useState<Location.LocationGeocodedLocation | null>(null);
  const categoryRef = useRef<TextInput>(null);
  const [isValid, setIsValid] = useState(false);
  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
  ]);
  const screenWidth = Dimensions.get("screen").width;

  const onAddCategory = () => {
    setCategories([...categories, category]);
    setCategory("");
    if (categoryRef.current) {
      categoryRef.current.focus();
    }
  };

  const onRemoveCategory = (slug: string) => {
    const found = categories.findIndex((category) => category === slug);

    if (found > -1) {
      categories.splice(found, 1);
      setCategories([...categories]);
    }
  };

  const onPressNext = useCallback(() => {
    if (isValid) {
      navigation.dangerouslyGetParent()?.navigate("Photo", {
        info: {
          name,
          address,
          categories,
          lat: location?.latitude,
          lng: location?.longitude,
        },
      });
    }
  }, [isValid]);

  useEffect(() => {
    if (name !== "" && categories.length > 0 && location) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [isValid, name, categories, location]);

  useLayoutEffect(() => {
    if (isValid) {
      navigation.dangerouslyGetParent()?.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={onPressNext}>
            <Text
              style={{
                color: theme.color.secondary,
                textAlign: "center",
                fontFamily: "DoHyeon",
                marginTop: 10,
                fontSize: 16,
                marginRight: 10,
              }}
            >
              다음 단계로 &gt;&gt;
            </Text>
          </TouchableOpacity>
        ),
      });
    } else {
      navigation.dangerouslyGetParent()?.setOptions({
        headerRight: () => <></>,
      });
    }
  }, [isValid]);

  useEffect(() => {
    Location.setGoogleApiKey(GOOGLE_API);
  }, []);
  useEffect(() => {
    if (address !== "") {
      const fetchLocation = async () => {
        const result = await Location.geocodeAsync(address, {
          useGoogleMaps: true,
        });
        if (result.length > 0) {
          setLocation(result[0]);
        }
      };
      fetchLocation();
    }
  }, [address]);
  return (
    <DismissKeyboard>
      <Container>
        <Title>정보를 입력해주세요</Title>
        <Label>1. 카페 이름</Label>
        <TextInput
          style={inputStyle(theme)}
          onChangeText={(text) => setName(text)}
          keyboardType="default"
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus
          placeholder="이름 입력"
        />
        <Label>2. 카테고리</Label>
        <TextInput
          style={inputStyle(theme)}
          onChangeText={(text) => setCategory(text)}
          value={category}
          keyboardType="default"
          autoCapitalize="none"
          autoCorrect={false}
          onSubmitEditing={onAddCategory}
          blurOnSubmit
          placeholder="여러 개 입력 가능"
          ref={categoryRef}
        />
        <CategoryContainer>
          {categories.length > 0 &&
            categories.map((category) => (
              <UploadCategory
                key={`Category:${category}`}
                slug={category}
                onRemove={onRemoveCategory}
              />
            ))}
        </CategoryContainer>

        <Label>3. 주소 입력</Label>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Address", { addressDispatcher: setAddress })
          }
        >
          <TextInput
            style={inputStyle(theme)}
            value={address}
            editable={false}
            pointerEvents="none"
            placeholder="입력하려면 터치"
          />
        </TouchableOpacity>
        {location && (
          <Map>
            <MapView
              style={{
                width: screenWidth - 22,
                height: 298,
              }}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}
            >
              <Marker
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
                title={name}
                description={address}
              />
            </MapView>
          </Map>
        )}
        {isValid && (
          <TouchableOpacity onPress={onPressNext}>
            <Text
              style={{
                color: theme.color.primary,
                textAlign: "center",
                fontFamily: "DoHyeon",
                marginTop: 10,
                fontSize: 24,
              }}
            >
              다음 단계로 &gt;&gt;
            </Text>
          </TouchableOpacity>
        )}
        {!isValid && (
          <Text
            style={{
              color: "orange",
              textAlign: "center",
              fontFamily: "DoHyeon",
              marginTop: 10,
              fontSize: 16,
            }}
          >
            카페이름, 카테고리, 주소를 올바로 입력해셔야 다음 단계로 넘어갑니다.
          </Text>
        )}
      </Container>
    </DismissKeyboard>
  );
};
