import { BlurView } from "expo-blur";
import React from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import styled from "styled-components/native";
import { makeImgPath } from "../utils";
import Poster from "./Poster";

const BgImg = styled.Image``;

/* <{ isDark: boolean }> 스타일드컴포넌트에 해당 변수의 타입을 알려준다 */
const Title = styled.Text<{ isDark: boolean }>`
  font-size: 15px;
  font-weight: 600;
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
`;

const Overview = styled.Text<{ isDark: boolean }>`
  color: ${(props) =>
    props.isDark ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.8)"};
  font-size: 12px;
  margin-top: 5px;
`;

/* 스타일드컴포넌트의 확장컴포넌트 */
const Vote = styled(Overview)<{ isDark: boolean }>``;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  width: 90%;
  margin: 0 auto;
  justify-content: space-around;
  align-items: center;
`;

const Column = styled.View`
  width: 60%;
`;

/* 타입스크립트의 인터페이스 설정 */
interface SlideProps {
  backdrop_path: string;
  poster_path: string;
  original_title: string;
  vote_average: number;
  overview: string;
}

/* 설정한 인터페이스를 컴포넌트에 적용 */
const Slide: React.FC<SlideProps> = ({
  backdrop_path,
  poster_path,
  original_title,
  vote_average,
  overview,
}) => {
  const isDark = useColorScheme() === "dark";
  return (
    <View style={{ flex: 1 }}>
      <BgImg
        style={StyleSheet.absoluteFill}
        source={{ uri: makeImgPath(backdrop_path) }}
      />
      <BlurView
        tint={isDark ? "dark" : "light"}
        intensity={100}
        style={StyleSheet.absoluteFill}
      >
        <Wrapper>
          <Poster path={poster_path} />
          <Column>
            <Title isDark={isDark}>{original_title}</Title>
            <Vote isDark={isDark}>⭐ {vote_average}</Vote>
            <Overview isDark={isDark}>
              {overview.split(" ").slice(0, 30).join(" ")} ...
            </Overview>
          </Column>
        </Wrapper>
      </BlurView>
    </View>
  );
};

export default Slide;
