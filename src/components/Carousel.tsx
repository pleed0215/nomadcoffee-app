import React, { useState, useRef } from "react";
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, TouchableWithoutFeedback, Image } from "react-native";
import { Dimensions } from "react-native";
import styled, { css } from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";

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
  const length = images.length;
  const onScrollHorizontal = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const {
      nativeEvent: { contentOffset, layoutMeasurement },
    } = event;
    const scrolledIndex = Math.ceil(contentOffset.x / layoutMeasurement.width);        
    const upperLimited = scrolledIndex > length-1 ? length-1 : scrolledIndex;
    const lowerLimited = upperLimited < 0 ? 0 : upperLimited;    
    setIndex(lowerLimited);
  };

  const scrollTo = (toIndex: number) => {
    if (scrollViewRef) {
      // android에서 .. scrollTo하면.. scroll이벤트가 발생하는데.. 
      // 미세하게.. 설정해 놓은 imageWidth보다 더 커서.. Math.ceil에서 값이 걸림.. 임시방편 트릭..
      scrollViewRef.current?.scrollTo({ x: toIndex * (imageWidth-1), y: 0});
    }
  };

  const onNext = () => {
    const nextIndex = index >= images.length - 1 ? 0 : index + 1;
    
    setIndex(nextIndex);
    scrollTo(nextIndex);
  };
  const onPrev = () => {
    const prevIndex = index === 0 ? images.length - 1 : index - 1;
    setIndex(prevIndex);
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
      {/* @ts-ignore typescript ref type에러가 해결 안됨 ㅠㅠ. prettyignore에도 추가. */}
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
        <ActButton onPressIn={onPrev}>
          <ActIcon>
            <Ionicons
              name="arrow-back-circle"
              color="rgba(255,255,255,0.9)"
              size={40}
            />
          </ActIcon>
        </ActButton>
        <ActButton onPressIn={onNext}>
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
