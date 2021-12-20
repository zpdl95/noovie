import { useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import React from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from "react-native";
import styled from "styled-components/native";
import { Movie } from "../api";
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
  backdropPath: string;
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  overview: string;
  fullData: Movie;
}

/* 설정한 인터페이스를 컴포넌트에 적용 */
const Slide: React.FC<SlideProps> = ({
  backdropPath,
  posterPath,
  originalTitle,
  voteAverage,
  overview,
  fullData,
}) => {
  const isDark = useColorScheme() === "dark";

  /* useNavigation hook은 navigation prop을 사용할 수 있게 해주는 함수다 */
  const navigation = useNavigation();
  const goToDetail = () => {
    /* navigate는 다른 screen으로 이동해주는 함수
    첫번째인자로 screen이름을 넣으면 같은 Tab or Stack Navigator안에서 이동
    다른 Navigator에 있는 screen으로 이동하려면 ↓ 처럼 작성 */
    /* navigate로 이동할때 screen name과 params에 값을 전달한다 */
    navigation.navigate("Stack", {
      screen: "Detail",
      params: { ...fullData },
    });
  };
  return (
    <View style={{ flex: 1 }}>
      <BgImg
        style={StyleSheet.absoluteFill}
        source={{ uri: makeImgPath(backdropPath) }}
      />
      <BlurView
        tint={isDark ? "dark" : "light"}
        intensity={100}
        style={StyleSheet.absoluteFill}
      >
        <TouchableWithoutFeedback onPress={goToDetail}>
          <Wrapper>
            <Poster path={posterPath} />
            <Column>
              <Title isDark={isDark}>{originalTitle}</Title>
              <Vote isDark={isDark}>⭐ {voteAverage}</Vote>
              <Overview isDark={isDark}>
                {overview.length > 100
                  ? `${overview.split(" ").slice(0, 21).join(" ")} ...`
                  : `${overview}`}
              </Overview>
            </Column>
          </Wrapper>
        </TouchableWithoutFeedback>
      </BlurView>
    </View>
  );
};

export default Slide;
