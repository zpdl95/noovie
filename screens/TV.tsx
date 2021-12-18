import React from "react";
import { RefreshControl, ScrollView } from "react-native";
import { useQuery, useQueryClient } from "react-query";
import { tvApi } from "../api";
import HList from "../components/HList";
import Loader from "../components/Loader";

const TV = () => {
  const queryClient = useQueryClient();

  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: isRefetchingTrending,
  } = useQuery(["tv", "trending"], tvApi.trending);
  const {
    isLoading: airingTodayLoading,
    data: airingTodayData,
    isRefetching: isRefetchingAiringToday,
  } = useQuery(["tv", "airingToday"], tvApi.airingToday);
  const {
    isLoading: topRatedLoading,
    data: topRatedData,
    isRefetching: isRefetchingTopRated,
  } = useQuery(["tv", "topRated"], tvApi.topRated);

  const onRefresh = () => queryClient.refetchQueries(["tv"]);

  const loading = trendingLoading || airingTodayLoading || topRatedLoading;
  const refreshing =
    isRefetchingTrending || isRefetchingAiringToday || isRefetchingTopRated;

  return loading ? (
    <Loader />
  ) : (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={{ paddingVertical: 30 }}
    >
      <HList title="Trending TV" data={trendingData.results} />
      <HList title="Airing Today" data={airingTodayData.results} />
      <HList title="Top Rated TV" data={topRatedData.results} />
    </ScrollView>
  );
};
export default TV;
