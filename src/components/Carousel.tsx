import React, { useState, useRef } from "react";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { Dimensions } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { ScrollView } from "react-native-gesture-handler";
import styled, { css } from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

// 참고영상: https://www.youtube.com/watch?v=otr_x0wKgvU

const screen = Dimensions.get("screen");
const imageWidth = screen.width - 2; // 2px => border width.
const imageHeight = screen.height * 0.4;

type CarouselProps = {
  images: string[];
  showIndex?: boolean;
  showNextPrev?: boolean;
};

const Container = styled.View`
  width: ${imageWidth}px;
  height: ${imageHeight}px;
  position: relative;
  align-items: center;
  justify-content: center;
`;

const ImageContainer = styled.ScrollView`
  width: 100%;
  height: 100%;
`;

const Photo = styled.Image`
  width: ${imageWidth}px;
  height: ${imageHeight}px;
`;

const IndexContainer = styled.View`
  position: absolute;
  align-items: center;
  padding: 10px;
  width: ${imageWidth}px;
  bottom: 0px;
  left: 0px;
  align-self: center;
  justify-content: center;
  flex-direction: row;
`;

const IndexItem = styled.Text<{ last?: boolean; selected?: boolean }>`
  ${(props) =>
    props.selected
      ? css`
          color: rgba(255, 255, 255, 1);
          font-size: 24px;
        `
      : css`
          color: rgba(255, 255, 255, 0.5);
          font-size: 18px;
        `};
  ${(props) =>
    !props.last &&
    css`
      margin-right: 5px;
    `}
`;

const ActContainer = styled.View`
  position: absolute;
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ActButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;

`;

const ActIcon = styled.Text`
  color: rgba(200, 200, 200, 0.8);
`;

export const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [index, setIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const onScrollHorizontal = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const {
      nativeEvent: { contentOffset, layoutMeasurement },
    } = event;
    const scrolledIndex = Math.ceil(contentOffset.x / layoutMeasurement.width);
    setIndex(scrolledIndex);
  };

  const scrollTo = (toIndex: number) => {
    if (scrollViewRef) {
      scrollViewRef.current?.scrollTo({ x: toIndex * imageWidth, y: 0 });
    }
  };

  const onNext = () => {
    const nextIndex = index === images.length - 1 ? 0 : index + 1;
    setIndex(index + 1);
    scrollTo(nextIndex);
  };
  const onPrev = () => {
    const prevIndex = index === 0 ? images.length - 1 : index - 1;
    setIndex(index + 1);
    scrollTo(prevIndex);
  };
  const onScrollTo = (toIndex: number) => () => {
    if (toIndex !== index) {
      scrollTo(toIndex);
      setIndex(toIndex);
    }
  };

  return (
    <Container>
      {/* @ts-ignore */}
      <ImageContainer ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={onScrollHorizontal}
      >
        {images.map((image) => (
          <Photo
            source={{ uri: image }}
            key={`Photo:${image}`}
            resizeMode="cover"
          />
        ))}
      </ImageContainer>
      <ActContainer>
        <ActButton onPress={onPrev}>
          <ActIcon>
            <Ionicons
              name="arrow-back-circle"
              color="rgba(255,255,255,0.9)"
              size={40}
            />
          </ActIcon>
        </ActButton>
        <ActButton onPress={onNext}>
          <ActIcon>
            <Ionicons
              name="arrow-forward-circle"
              color="rgba(255,255,255,0.9)"
              size={40}
            />
          </ActIcon>
        </ActButton>
      </ActContainer>
      <IndexContainer>
        {images.map((image, i) => (
          <TouchableWithoutFeedback
            key={`${image}-${i}`}
            onPress={onScrollTo(i)}
          >
            <IndexItem last={i === images.length - 1} selected={i === index}>
              ●
            </IndexItem>
          </TouchableWithoutFeedback>
        ))}
      </IndexContainer>
    </Container>
  );
};
