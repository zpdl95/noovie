import React, { useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import { tvApi } from "../api";
import HList from "../components/HList";
import Loader from "../components/Loader";
import { getNextPage } from "../utils";

const TV = () => {
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();

  const {
    isLoading: trendingLoading,
    data: trendingData,
    hasNextPage: trendingHasNextPage,
    fetchNextPage: trendingFetchNextPage,
    isFetchingNextPage: trendingIsFetchingNextPage,
  } = useInfiniteQuery(["tv", "trending"], tvApi.trending, {
    getNextPageParam: getNextPage,
  });
  const {
    isLoading: airingTodayLoading,
    data: airingTodayData,
    hasNextPage: airingTodayHasNextPage,
    fetchNextPage: airingTodayFetchNextPage,
    isFetchingNextPage: airingTodayIsFetchingNextPage,
  } = useInfiniteQuery(["tv", "airingToday"], tvApi.airingToday, {
    getNextPageParam: getNextPage,
  });
  const {
    isLoading: topRatedLoading,
    data: topRatedData,
    hasNextPage: topRatedHasNextPage,
    fetchNextPage: topRatedFetchNextPage,
    isFetchingNextPage: topRatedIsFetchingNextPage,
  } = useInfiniteQuery(["tv", "topRated"], tvApi.topRated, {
    getNextPageParam: getNextPage,
  });

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
      <HList
        title="Trending TV"
        data={trendingData.pages.map((page) => page.results).flat()}
        hasNextPage={trendingHasNextPage}
        fetchNextPage={trendingFetchNextPage}
        isFetchingNextPage={trendingIsFetchingNextPage}
      />
      <HList
        title="Airing Today"
        data={airingTodayData.pages.map((page) => page.results).flat()}
        hasNextPage={airingTodayHasNextPage}
        fetchNextPage={airingTodayFetchNextPage}
        isFetchingNextPage={airingTodayIsFetchingNextPage}
      />
      <HList
        title="Top Rated TV"
        data={topRatedData.pages.map((page) => page.results).flat()}
        hasNextPage={topRatedHasNextPage}
        fetchNextPage={topRatedFetchNextPage}
        isFetchingNextPage={topRatedIsFetchingNextPage}
      />
    </ScrollView>
  );
};
export default TV;
