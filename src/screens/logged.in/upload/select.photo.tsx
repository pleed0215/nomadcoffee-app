import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from "react-native";
import * as MediaLibrary from "expo-media-library";

import { PhotoNavScreenList } from "../../../navigation/navs";
import styled, { useTheme } from "styled-components/native";
import { useIsFocused } from "@react-navigation/core";
import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ListRenderItem } from "react-native";
import { Dimensions } from "react-native";
import { useMutation } from "@apollo/client";
import { CreateShop, CreateShopVariables } from "../../../codegen/CreateShop";
import { MUTATION_CREATE_SHOP, QUERY_SHOPS } from "../../../apollo/queries";
import { ReactNativeFile } from "apollo-upload-client";
import { Camera } from "expo-camera";
import { ModalLoader } from "../../../components/upload/ModalLoader";

const { width, height } = Dimensions.get("screen");
const imageWidth = Math.floor((width - 3) / 4);

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.background.primary};
  position: relative;
`;

const Top = styled.View`
  flex: 1;
`;
const Bottom = styled.View`
  flex: 1;
`;

interface RenderAssetProp {
  index: number;
  onToggle: (uri: string) => void;
  selected: boolean;
  uri: string;
}

const ImageContainer = styled.TouchableOpacity`
  position: relative;
`;

const Icon = styled(Ionicons)`
  color: ${(props) => props.theme.color.link};
`;

const RenderItem: React.FC<RenderAssetProp> = ({
  uri,
  index,
  onToggle,
  selected,
}) => {
  const onPress = () => {
    onToggle(uri);
  };

  return (
    <ImageContainer onPress={onPress}>
      <Image
        source={{ uri }}
        style={{
          width: imageWidth,
          height: imageWidth,
          ...(index % 4 !== 3 && { marginRight: 1 }),
        }}
      />

      {selected && (
        <View
          style={{
            width: 19,
            height: 19,
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            right: 5,
            bottom: 5,
            borderRadius: 9.5,
            borderColor: "white",
            backgroundColor: "white",
          }}
        >
          <Icon name="checkmark-circle" size={19} style={{ right: -1 }} />
        </View>
      )}
    </ImageContainer>
  );
};

export const SelectPhotoScreen: React.FC<
  StackScreenProps<PhotoNavScreenList, "SelectPhoto">
> = ({ navigation, route }) => {
  const { info } = route.params;
  const theme = useTheme();
  const [ok, setOk] = useState(false);
  const [photos, setPhotos] = useState<MediaLibrary.Asset[]>([]);
  const [choosen, setChoosen] = useState<Array<string>>([]);
  const [lastPhotoId, setLastPhotoId] = useState<string>("");
  const [hasNext, setHasNext] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [createShop] = useMutation<CreateShop, CreateShopVariables>(
    MUTATION_CREATE_SHOP,
    {
      onCompleted: (data) => {
        setUploading(false);
        if (data.createCoffeeShop.ok) {
          alert("카페가 만들어졌습니다.");
          navigation.dangerouslyGetParent()?.navigate("Home");
        }
      },
      refetchQueries: [
        {
          query: QUERY_SHOPS,
          variables: {
            lastId: 0,
          },
        },
      ],
    }
  );

  const getPhotos = async () => {
    setRefreshing(true);
    const { assets, endCursor, hasNextPage } =
      await MediaLibrary.getAssetsAsync({
        first: photos.length > 0 ? photos.length : 20,
      });
    setPhotos(assets);
    setLastPhotoId(endCursor);
    setHasNext(hasNextPage);
    setRefreshing(false);
  };
  const onPressUpload = () => {
    if (choosen.length > 0) {
      setUploading(true);
      const files: Array<ReactNativeFile> = choosen.map(
        (photo, index) =>
          new ReactNativeFile({
            uri: photo,
            name: `${info.name}-${index}.jpg`,
            type: "image/jpeg",
          })
      );
      createShop({
        variables: {
          ...info,
          photos: files,
        },
      });
    }
  };

  const getPermissions = async () => {
    const { canAskAgain, granted } = await MediaLibrary.getPermissionsAsync();
    const permissions = await Camera.getPermissionsAsync();
    if (!granted && canAskAgain) {
      const permission = await MediaLibrary.requestPermissionsAsync();

      if (permission.granted) {
        setOk(true);
        getPhotos();
      }
    } else if (granted) {
      setOk(true);
      getPhotos();
    }
  };

  const fetchMorePhoto = async () => {
    if (hasNext) {
      const { assets, endCursor, hasNextPage } =
        await MediaLibrary.getAssetsAsync({ first: 20, after: lastPhotoId });

      setPhotos((prev) => [...prev, ...assets]);
      setLastPhotoId(endCursor);
      setHasNext(hasNextPage);
    }
  };

  const selected = (uri: string) => choosen.some((c) => c === uri);
  const toggleChoosen = (uri: string) => {
    if (selected(uri)) {
      setChoosen(choosen.filter((c) => c !== uri));
    } else {
      if (choosen.length >= 5) {
        alert("최대 5장까지 가능합니다.");
      } else {
        setChoosen((prev) => [uri, ...prev]);
      }
    }
  };
  const isFocused = useIsFocused();
  const renderPhoto: ListRenderItem<MediaLibrary.Asset> = ({ item, index }) => {
    return (
      <RenderItem
        selected={selected(item.uri)}
        onToggle={toggleChoosen}
        index={index}
        uri={item.uri}
      />
    );
  };

  useEffect(() => {
    getPermissions();
  }, []);

  useLayoutEffect(() => {
    navigation.dangerouslyGetParent()?.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={onPressUpload}>
          <Text
            style={{
              color: choosen.length > 0 ? theme.color.link : "gray",
              marginRight: 15,
              fontWeight: "600",
              fontSize: 16,
            }}
          >
            올리기
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [choosen]);

  useEffect(() => {
    if (navigation.isFocused() && ok) {
      getPhotos();
    }
  }, [navigation.isFocused(), ok]);

  return (
    <Container>
      {isFocused && <StatusBar hidden />}
      {uploading && <ModalLoader message="업로딩 중..." />}
      <Top>
        {choosen.length > 0 && (
          <Image source={{ uri: choosen[0] }} style={{ flex: 1 }} />
        )}
      </Top>
      <Bottom>
        <FlatList
          onRefresh={getPhotos}
          refreshing={refreshing}
          data={photos}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderPhoto}
          onEndReached={fetchMorePhoto}
          numColumns={4}
        />
      </Bottom>
    </Container>
  );
};
