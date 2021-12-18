import React from "react";
import { View, Text, ScrollView, FlatList } from "react-native";
import { useQuery, useQueryClient } from "react-query";
import { tvApi } from "../api";
import Loader from "../components/Loader";
import VMedia from "../components/VMedia";

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

  const loading = trendingLoading || airingTodayLoading || topRatedLoading;
  const refreshing =
    isRefetchingTrending || isRefetchingAiringToday || isRefetchingTopRated;

  return loading ? (
    <Loader />
  ) : (
    <ScrollView>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={trendingData.results}
        renderItem={({ item }) => (
          <VMedia
            posterPath={item.poster_path}
            originalTitle={item.original_name}
            voteAverage={item.vote_average}
          />
        )}
      />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={airingTodayData.results}
        renderItem={({ item }) => (
          <VMedia
            posterPath={item.poster_path}
            originalTitle={item.original_name}
            voteAverage={item.vote_average}
          />
        )}
      />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={topRatedData.results}
        renderItem={({ item }) => (
          <VMedia
            posterPath={item.poster_path}
            originalTitle={item.original_name}
            voteAverage={item.vote_average}
          />
        )}
      />
    </ScrollView>
  );
};
export default TV;
