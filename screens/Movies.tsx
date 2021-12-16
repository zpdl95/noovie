import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import {
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  ScrollView,
} from "react-native";

import Slide from "../components/Slide";
import Poster from "../components/Poster";

const API_KEY = "9db5794f039ec550f11e71750544ca9e";

const Container = styled.ScrollView``;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ListTitle = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-left: 30px;
`;

const TrendingScroll = styled.ScrollView`
  margin-top: 20px;
`;

const Movie = styled.View`
  margin-right: 30px;
  align-items: center;
`;

const Title = styled.Text`
  color: white;
  font-size: 12px;
  margin-top: 7px;
`;

const Vote = styled.Text`
  margin-top: 3px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 10px;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 30px;
`;

const HMovie = styled.View`
  padding: 0 30px;
  flex-direction: row;
  margin-bottom: 30px;
`;

const HColumn = styled.View`
  margin-left: 15px;
  width: 80%;
`;

const Release = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: 10px;
  margin-top: 5px;
`;

const Overview = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: 10px;
  margin-top: 5px;
  width: 80%;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
/* 디바이스의 창의 크기를 가져오는 api */

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);
  const getTrending = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
      )
    ).json();
    setTrending(results);
  };
  const getUpcoming = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`
      )
    ).json();
    setUpcoming(results);
  };
  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
      )
    ).json();
    setNowPlaying(results);
  };
  const getData = async () => {
    await Promise.all([getNowPlaying(), getUpcoming(), getTrending()]);
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  /* 새로고침할 경우 실행할 함수 */
  const onRefreshing = async () => {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  };

  return loading ? (
    <Loader>
      <ActivityIndicator color="white" />
    </Loader>
  ) : (
    <Container
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefreshing} />
      }
    >
      <Swiper
        autoplay
        autoplayTimeout={3.5}
        showsPagination={false}
        containerStyle={{
          marginBottom: 30,
          width: "100%",
          height: SCREEN_HEIGHT / 4,
        }}
      >
        {nowPlaying.map((movie) => (
          <Slide
            key={movie.id}
            backdrop_path={movie.backdrop_path}
            poster_path={movie.poster_path}
            original_title={movie.original_title}
            vote_average={movie.vote_average}
            overview={movie.overview}
          />
        ))}
      </Swiper>
      <ListContainer>
        <ListTitle>Trending Movies</ListTitle>
        <TrendingScroll
          contentContainerStyle={{ paddingLeft: 30 }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {trending.map((movie) => (
            <Movie key={movie.id}>
              <Poster path={movie.poster_path} />
              <Title>
                {movie.original_title.slice(0, 12)}
                {movie.original_title.length > 12 ? "..." : null}
              </Title>
              <Vote>
                {movie.vote_average > 0
                  ? `⭐ ${movie.vote_average}`
                  : "Coming soon"}
              </Vote>
            </Movie>
          ))}
        </TrendingScroll>
      </ListContainer>
      <ComingSoonTitle>Coming soon</ComingSoonTitle>
      {upcoming.map((movie) => (
        <HMovie key={movie.id}>
          <Poster path={movie.poster_path} />
          <HColumn>
            <Title>{movie.original_title}</Title>
            <Release>
              {new Date(movie.release_date).toLocaleDateString()}
            </Release>
            <Overview>
              {movie.overview.length > 150
                ? `${movie.overview.slice(0, 150)} ...`
                : `${movie.overview}`}
            </Overview>
          </HColumn>
        </HMovie>
      ))}
    </Container>
  );
};
export default Movies;

/* uri는 웹 기술에서 사용하는 논리 or 물리적 리소스를 식별한다 */

/* 컴포넌트에 넣고 싶은 prop이 있으면 이름을 정해주고 값을 넣어주면 된다
ex) <Title isDark={isDark}> */
