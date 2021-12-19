import React, { useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { useQuery, useQueryClient } from "react-query";
import { tvApi } from "../api";
import HList from "../components/HList";
import Loader from "../components/Loader";

const TV = () => {
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();

  const { isLoading: trendingLoading, data: trendingData } = useQuery(
    ["tv", "trending"],
    tvApi.trending
  );
  const { isLoading: airingTodayLoading, data: airingTodayData } = useQuery(
    ["tv", "airingToday"],
    tvApi.airingToday
  );
  const { isLoading: topRatedLoading, data: topRatedData } = useQuery(
    ["tv", "topRated"],
    tvApi.topRated
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["tv"]);
    setRefreshing(false);
  };

  const loading = trendingLoading || airingTodayLoading || topRatedLoading;

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
