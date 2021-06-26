import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useEffect } from "react";
import { Dimensions } from "react-native";
import { View, Text, Image, ScrollView } from "react-native";
import MapView, { Marker, LatLng } from "react-native-maps";

import styled, { useTheme } from "styled-components/native";
import { QUERY_SEE_CAFE } from "../../apollo/queries";
import { SeeCafe, SeeCafeVariables } from "../../codegen/SeeCafe";
import { ScreenLayout } from "../../components/ScreenLayout";
import { LoggedInStackScreenParam } from "../../navigation/navs";

const screenWidth = Dimensions.get("screen").width;

const LocationContainer = styled.View`
  width: 100%;
  margin-top: 10px;
`;

const LocationTitle = styled.Text`
  font-family: "DoHyeon";
  font-size: 24px;
  color: ${(props) => props.theme.color.primary};
`;
const Location = styled.Text`
  font-family: "DoHyeon";
  font-size: 18px;
  color: ${(props) => props.theme.color.primary};
`;

const Map = styled.View`
  margin-top: 10px;
  width: 100%;
  height: 300px;
  border: 1px solid ${(props) => props.theme.color.border};
`;

const PhotoContainer = styled.ScrollView`
  width: 100%;
  height: 200px;
`;

const PhotoTitle = styled.Text`
  font-family: "DoHyeon";
  font-size: 24px;
  color: ${(props) => props.theme.color.primary};
  margin-top: 10px;
  margin-bottom: 10px;
`;
const PhotoItemContainer = styled.TouchableOpacity`
  width: 200px;
  height: 200px;
`;

export const ShopScreen: React.FC<LoggedInStackScreenParam<"Shop">> = ({
  route,
  navigation,
}) => {
  const { id, name } = route.params;
  const theme = useTheme();
  const windowSize = Dimensions.get("window");
  const { data: shop, loading } = useQuery<SeeCafe, SeeCafeVariables>(
    QUERY_SEE_CAFE,
    {
      variables: { id },
      onCompleted: (data) => {
        if (data.seeCoffeeShop?.firstPhotoUrl) {
          setPhoto(data.seeCoffeeShop?.firstPhotoUrl);
        }
      },
    }
  );
  const [photo, setPhoto] = useState("");

  const onPressPhoto = (url: string) => () => {
    setPhoto(url);
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: name,
      headerTitleStyle: {
        color: theme.color.secondary,
        fontFamily: "DoHyeon",
        fontSize: 24,
        textAlign: "center",
      },
      headerTransparent: true,
      headerBackground: (_) => (
        <View
          style={{
            width: "100%",
            height: 100,
            backgroundColor: theme.background.secondary,
            opacity: 0.7,
          }}
        />
      ),
    });
  }, [name]);
  return (
    <ScreenLayout loading={loading}>
      <ScrollView
        style={{ flex: 1, width: "100%" }}
        showsVerticalScrollIndicator={false}
      >
        {photo !== "" && (
          <Image
            style={{ width: windowSize.width, height: windowSize.height / 2 }}
            source={{ uri: photo }}
            resizeMode="cover"
          />
        )}

        {shop?.seeCoffeeShop?.photos && shop?.seeCoffeeShop.photos.length > 0 && (
          <>
            <PhotoTitle>카페 사진</PhotoTitle>
            <PhotoContainer horizontal showsHorizontalScrollIndicator={false}>
              {shop.seeCoffeeShop.photos.map((photo, index) => (
                <PhotoItemContainer
                  key={`CafePhoto:${id}-${photo?.id}`}
                  style={{
                    marginRight:
                      index !== shop.seeCoffeeShop?.photos?.length! - 1 ? 5 : 0,
                  }}
                  onPress={onPressPhoto(photo?.url!)}
                >
                  <Image
                    style={{
                      width: windowSize.width / 2,
                      height: windowSize.width / 2,
                    }}
                    source={{ uri: photo?.url! }}
                    resizeMode="cover"
                  />
                </PhotoItemContainer>
              ))}
            </PhotoContainer>
          </>
        )}
        <LocationContainer>
          <LocationTitle>카페 위치</LocationTitle>
          <Location>주소: {shop?.seeCoffeeShop?.address}</Location>
        </LocationContainer>
        <Map>
          <MapView
            style={{
              width: screenWidth - 2,
              height: 298,
            }}
            initialRegion={{
              latitude: +shop?.seeCoffeeShop?.lat!,
              longitude: +shop?.seeCoffeeShop?.lng!,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          >
            <Marker
              coordinate={{
                latitude: +shop?.seeCoffeeShop?.lat!,
                longitude: +shop?.seeCoffeeShop?.lng!,
              }}
              title={shop?.seeCoffeeShop?.name}
              description={shop?.seeCoffeeShop?.address!}
            />
          </MapView>
        </Map>
      </ScrollView>
    </ScreenLayout>
  );
};
