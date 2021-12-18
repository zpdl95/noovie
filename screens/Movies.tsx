import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { Dimensions, FlatList } from "react-native";
import { useQuery, useQueryClient } from "react-query";
import { Movie, MovieResponse, moviesApi } from "../api";
import Slide from "../components/Slide";
import HMedia from "../components/HMedia";
import Loader from "../components/Loader";
import HList from "../components/HList";

const ListTitle = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-left: 30px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 20px;
`;

const HSeperator = styled.View`
  height: 20px;
`;

/* 디바이스의 창의 크기를 가져오는 api */
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  /* queryClient는 모든 cache, query를 관리함 
  useQueryClient()를 사용해 접근가능 */
  const queryClient = useQueryClient();

  /* react-query는 useQuery hook을 가지고 있음
  첫번째 인자는 key, 두번째 인자는 fetcher
  key에 data를 캐싱한다
  useQuery는 fetch에서 일어나는 모든걸 추적함
  key는 string타입으로 넣을수있고, array타입으로 넣을 수도 있다.
  array타입을 사용해서 category를 만들어 주거나 변수를 추가할 수 있다.
  `useQuery(["movies", "nowPlaying"], ...)` movies이라는 category에 nowPlaying라는 id를 줌
  `useQuery(["movies", "nowPlaying", {preview: true}], ...)` {preview: ture}라는 변수를 추가 */
  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    isRefetching: isRefetchingNowPlaying,
  } = useQuery<MovieResponse>(["movies", "nowPlaying"], moviesApi.nowPlaying);
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    isRefetching: isRefetchingUpcoming,
  } = useQuery<MovieResponse>(["movies", "upComing"], moviesApi.upcoming);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: isrefetchingTrending,
  } = useQuery<MovieResponse>(["movies", "trending"], moviesApi.trending);

  /* 새로고침할 경우 실행할 함수 */
  const onRefresh = async () => {
    /* movies category를 가진 쿼리를 모두 refetch함 */
    queryClient.refetchQueries(["movies"]);
  };

  const renderHMedia = ({ item }: { item: Movie }) => (
    <HMedia
      posterPath={item.poster_path || ""}
      originalTitle={item.original_title}
      overview={item.overview}
      releaseDate={item.release_date}
    />
  );

  const movieKeyExtractor = (item: Movie) => item.id + "";

  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
  const refreshing =
    isRefetchingNowPlaying || isRefetchingUpcoming || isrefetchingTrending;

  /* 'upcomingData ?' 와 같이 작성하는 이유는 typescript를 작성할때
      이 데이터가 있을 수 도 있고 없을 수도 있어서 '?'를 넣어줘야 한다 */
  return loading ? (
    <Loader />
  ) : upcomingData ? (
    <FlatList
      refreshing={refreshing}
      onRefresh={onRefresh}
      ListHeaderComponent={
        <>
          <Swiper
            autoplay
            autoplayTimeout={3.5}
            showsPagination={false}
            containerStyle={{
              marginBottom: 20,
              width: "100%",
              height: SCREEN_HEIGHT / 4,
            }}
          >
            {nowPlayingData?.results.map((movie) => (
              <Slide
                key={movie.id}
                backdropPath={movie.backdrop_path || ""}
                posterPath={movie.poster_path || ""}
                originalTitle={movie.original_title}
                voteAverage={movie.vote_average}
                overview={movie.overview}
              />
            ))}
          </Swiper>
          {trendingData ? (
            <HList title="Trending Movies" data={trendingData?.results} />
          ) : null}
          <ComingSoonTitle>Coming soon</ComingSoonTitle>
        </>
      }
      data={upcomingData.results}
      keyExtractor={movieKeyExtractor}
      ItemSeparatorComponent={HSeperator}
      renderItem={renderHMedia}
    />
  ) : null;
};
export default Movies;

/* uri는 웹 기술에서 사용하는 논리 or 물리적 리소스를 식별한다 */

/* 컴포넌트에 넣고 싶은 prop이 있으면 이름을 정해주고 값을 넣어주면 된다
ex) <Title isDark={isDark}> */

/* ScrollView에 있는 refreshControl props에 <RefreshControl/>을 넣어서 새로고침 기능을 만든다
refreshing에는 새로고침중인지 아닌지 boolean형식으로 사용하고
onRefresh에는 새로고침중에 뭘 할것인지 함수를 넣어준다
이 기능은 FlatList도 사용할 수 있다 */

/* ScrollView는 모든 자식 컴포넌트를 한번에 렌더링한다. 따라서 많은
데이터를 가지고 있다면 렌더링에 시간이 오래 걸린다. 이 대안으로 나온것이
FlatList다. FlatList는 추가적이 화면 출력이 필요하면 그때 렌더링한다. */

/* FlatList에 있는 ListHeaderComponent속성은 해당 Flatlist가 렌더링 하는
컴포넌트 위에 컴포넌트를 렌더링할 수 있도록 해주는 기능이 있다. */

/* FlatList는 ScrollView의 업그레이드 버전
FlatList는 array데이터를 받아 map()방식으로 표현해 준다
FlatList는 자식컴포넌트를 두지 않는다
data prop에 데이터를 array형 데이터를 넣어주고
renderItem에 컴포넌트를 리턴하는 함수를 넣어준다. 이 함수는 {item, index, seperate} 인자를 받는다
ItemSeparatorComponent는 item사이에 넣을 컴포넌트를 넣으면 된다
keyExtractor는 각각의 데이터에서 key값으로 사용할 데이터(문자열)를 리턴 받는다.
ListHeaderComponent에 렌더링하는 컴포넌트 윗부분에 넣을 컴포넌트를 넣어준다(<></> = fragment = 여러개를 넣어서 render 할 수 있게 해줌 )*/
