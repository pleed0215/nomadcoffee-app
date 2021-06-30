import { Ionicons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Image, StatusBar, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Slider from "@react-native-community/slider";
import * as MediaLibrary from "expo-media-library";
import { useIsFocused } from "@react-navigation/core";
import { FlashButton } from "../../../components/FlashButton";
import { StackScreenProps } from "@react-navigation/stack";
import { PhotoNavScreenList } from "../../../navigation/navs";
import { useMutation } from "@apollo/client";
import { CreateShop, CreateShopVariables } from "../../../codegen/CreateShop";
import { MUTATION_CREATE_SHOP, QUERY_SHOPS } from "../../../apollo/queries";
import { ReactNativeFile } from "apollo-upload-client";
import { ModalLoader } from "../../../components/upload/ModalLoader";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.background.primary};
  position: relative;
`;

const Actions = styled.View`
  flex: 0.2;
  justify-content: center;
  background-color: ${(props) => props.theme.background.primary};
  align-items: center;
  padding: 3px 20px;
`;

const ActionsInner = styled.View`
  width: 100%;
  background-color: ${(props) => props.theme.background.primary};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TakePhoto = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  border-radius: 50px;
  border: 1px solid white;
  align-items: center;
  justify-content: center;
`;

const TakePhotoInner = styled.View`
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 45px;
  opacity: 0.9;
`;

const SliderContainer = styled.View`
  width: 100%;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;
const ThumbnailContainer = styled.View`
  background-color: gray;
  border-radius: 5px;
  width: 35px;
  height: 35px;
  border: 1px solid white;
`;

const ToggleCameraType = styled.TouchableOpacity``;
const InnerText = styled.Text`
  color: ${(props) => props.theme.color.primary};
  font-size: 25px;
`;

export const TakePhotoScreen: React.FC<
  StackScreenProps<PhotoNavScreenList, "TakePhoto">
> = ({ navigation, route }) => {
  const { info } = route.params;
  const [ok, setOk] = useState(false);
  const camera = useRef(null);
  const [flashMode, setFlashMode] = useState<
    keyof typeof Camera.Constants.FlashMode
  >(Camera.Constants.FlashMode.off);
  const [zoom, setZoom] = useState<number>(0);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [cameraReady, setCameraReady] = useState(false);
  const [firstPhoto, setFirstPhoto] = useState<string | null>();
  const [thumbnail, setThumbnail] = useState<string | null>();
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

  const toggleCameraType = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };
  const getPermission = async () => {
    const permissions = await Camera.getPermissionsAsync();
    if (permissions.granted) {
      setOk(true);
    } else if (!permissions.granted) {
      const request = await Camera.requestPermissionsAsync();
      if (request.granted) {
        setOk(true);
      }
    }
  };
  const onZoomValueChange = (zoom: number) => {
    setZoom(zoom);
  };

  const getFirstPhoto = async () => {
    const { assets } = await MediaLibrary.getAssetsAsync();
    setThumbnail(assets.length > 0 ? assets[0].uri : null);
  };

  const takePhoto = async () => {
    if (camera && cameraReady) {
      // @ts-ignore
      const result = await camera.current.takePictureAsync({
        quality: 1,
        exif: true,
      });
      setFirstPhoto(result.uri);
    }
  };

  const onUploadAndSave = () => {
    if (firstPhoto) {
      Alert.alert(
        "사진 업로드",
        "사진을 라이브러리에 저장하시고 업로드할까요?",
        [
          {
            text: "저장하고 업로드",
            onPress: async () => {
              await MediaLibrary.createAssetAsync(firstPhoto);
              //MediaLibrary.saveToLibraryAsync(firstPhoto);
              Alert.alert("저장완료", "사진을 저장했습니다");
            },
          },
          {
            text: "저장하지 않고 업로드",
            style: "destructive",
            onPress: () => {
              console.log("저장하지 않고 업로드");
            },
          },
        ]
      );
      const file = new ReactNativeFile({
        uri: firstPhoto,
        name: `${info.name}.jpg`,
        type: "image/jpeg",
      });
      const files: Array<ReactNativeFile> = [file];
      createShop({
        variables: {
          ...info,
          photos: files,
        },
      });
    }
  };

  useEffect(() => {
    getPermission();
    getFirstPhoto();
  }, []);
  const isFocused = useIsFocused();
  return (
    <Container>
      {isFocused && <StatusBar hidden />}
      {uploading && <ModalLoader message="업로딩 중..." />}
      {!firstPhoto || firstPhoto === "" ? (
        <>
          <Camera
            type={type}
            style={{ flex: 1 }}
            zoom={zoom}
            flashMode={flashMode}
            ref={camera}
            onCameraReady={() => setCameraReady(true)}
          >
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ position: "absolute", top: 50, left: 20 }}
            >
              <Ionicons name="close-circle" color="white" size={30} />
            </TouchableOpacity>
          </Camera>
          <Actions>
            <ActionsInner>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                {thumbnail ? (
                  <Image
                    source={{ uri: thumbnail }}
                    style={{
                      width: 35,
                      height: 35,
                      borderRadius: 5,
                      borderColor: "white",
                      borderWidth: 1,
                    }}
                  />
                ) : (
                  <ThumbnailContainer />
                )}
              </TouchableOpacity>
              <TakePhoto onPress={takePhoto}>
                <TakePhotoInner />
              </TakePhoto>
              <ToggleCameraType onPress={toggleCameraType}>
                <Ionicons name="camera-reverse" color="white" size={25} />
              </ToggleCameraType>
            </ActionsInner>
            <SliderContainer>
              <Slider
                style={{ width: 200, height: 40 }}
                minimumValue={0}
                maximumValue={0.3}
                step={0.005}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onValueChange={onZoomValueChange}
              />
              <FlashButton value={flashMode} setValue={setFlashMode} />
            </SliderContainer>
          </Actions>
        </>
      ) : (
        <>
          <Image source={{ uri: firstPhoto }} style={{ flex: 1 }} />
          <Actions>
            <ActionsInner style={{ paddingHorizontal: 40 }}>
              <TouchableOpacity
                onPress={() => {
                  setFirstPhoto(null);
                }}
              >
                <InnerText style={{ color: "red", fontSize: 18 }}>
                  다시 찍기
                </InnerText>
              </TouchableOpacity>
              <TouchableOpacity onPress={onUploadAndSave}>
                <InnerText style={{ color: "cyan", fontSize: 18 }}>
                  업로드&저장
                </InnerText>
              </TouchableOpacity>
            </ActionsInner>
          </Actions>
        </>
      )}
    </Container>
  );
};
