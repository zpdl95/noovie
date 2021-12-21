import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { Movie, moviesApi, TV, tvApi } from "../api";
import Poster from "../components/Poster";
import { makeImgPath } from "../utils";
import { useQuery } from "react-query";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Header = styled.View`
  height: ${SCREEN_HEIGHT / 4}px;
  justify-content: flex-end;
  padding: 0 20px;
`;

const Background = styled.Image``;

const Column = styled.View`
  flex-direction: row;
`;

const Title = styled.Text`
  color: white;
  font-size: 36px;
  align-self: flex-end;
  width: 70%;
  margin-left: 15px;
`;

const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin-top: 30px;
  padding: 0 20px;
`;

/* Root Navigator가 갖고 있는 Screen들의 type을 만들어야한다 */
type RootStackParamList = {
  Detail: Movie | TV /* 해당 screen에 있는 params의 type을 명시 */;
};

/* DetailScreen의 type옵션 설정 */
/* NativeStackScreenProps = 이러한 종류의 Screen 안에 들어간다고 명시 */
/* RootStackParamList = 타입 명시 */
/* "Detail" = screen 이름 명시 */
type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;

const Detail: React.FC<DetailScreenProps> = ({
  navigation: { setOptions },
  route: { params },
}) => {
  const { isLoading: moviesLoading, data: moviesData } = useQuery([
    "movies",
    params.id,
    moviesApi.detail,
    {
      enabled: "original_title" in params /* title이 있으면 실행 */,
    },
  ]);
  const { isLoading: tvLoading, data: tvData } = useQuery([
    "tv",
    params.id,
    tvApi.detail,
    {
      enabled: "original_name" in params /* name이 있으면 실행 */,
    },
  ]);

  /* component가 didmount됐을 때 실행시킴  */
  useEffect(() => {
    setOptions({
      title: "original_title" in params ? "Movie" : "TV Show",
    });
  }, []);
  return (
    <Container>
      <Header>
        <Background
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImgPath(params.backdrop_path || "") }}
        />
        <LinearGradient
          colors={["transparent", "#1e272e"]}
          style={StyleSheet.absoluteFill}
        />
        <Column>
          <Poster path={params.poster_path || ""} />
          <Title>
            {"original_title" in params
              ? params.original_title
              : params.original_name}
          </Title>
        </Column>
      </Header>
      <Overview>{params.overview}</Overview>
    </Container>
  );
};

export default Detail;
