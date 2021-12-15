import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { makeImgPath } from "../utils";
import { BlurView } from "expo-blur";

const API_KEY = "9db5794f039ec550f11e71750544ca9e";

const Container = styled.ScrollView``;

const View = styled.View`
  flex: 1;
`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const BgImg = styled.Image``;

const Title = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: white;
`;

const Overview = styled.Text`
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
  margin-top: 10px;
`;

/* 스타일드컴포넌트의 확장컴포넌트 */
const Vote = styled(Overview)`
  margin-top: 5px;
`;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Column = styled.View`
  width: 40%;
  margin-left: 15px;
`;

const Poster = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 7px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
/* 디바이스의 창의 크기를 가져오는 api */

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const isDark = useColorScheme() === "dark";
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
      )
    ).json();
    setNowPlaying(results);
    setLoading(false);
  };
  useEffect(() => {
    getNowPlaying();
  }, []);
  return loading ? (
    <Loader>
      <ActivityIndicator color="white" />
    </Loader>
  ) : (
    <Container>
      <Swiper
        autoplay
        autoplayTimeout={3.5}
        showsPagination={false}
        containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
      >
        {nowPlaying.map((movie) => (
          <View key={movie.id}>
            <BgImg
              style={StyleSheet.absoluteFill}
              source={{ uri: makeImgPath(movie.backdrop_path) }}
            />
            <BlurView
              tint={isDark ? "dark" : "light"}
              intensity={100}
              style={StyleSheet.absoluteFill}
            >
              <Wrapper>
                <Poster source={{ uri: makeImgPath(movie.poster_path) }} />
                <Column>
                  <Title>{movie.original_title}</Title>
                  <Overview>
                    {movie.overview.split(" ").slice(0, 30).join(" ")} ...
                  </Overview>
                  <Vote>⭐ {movie.vote_average}</Vote>
                </Column>
              </Wrapper>
            </BlurView>
          </View>
        ))}
      </Swiper>
    </Container>
  );
};
export default Movies;

/* uri는 웹 기술에서 사용하는 논리 or 물리적 리소스를 식별한다 */
