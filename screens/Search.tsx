import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { moviesApi, tvApi } from "../api";

const Container = styled.ScrollView``;

const SearchBar = styled.TextInput`
  background-color: white;
  padding: 5px 15px;
  border-radius: 15px;
  width: 90%;
  margin: 10px auto;
`;

const Search = () => {
  const [query, setQuery] = useState("");

  /* useQuery의 키값리스트에 두번째 인자로 검색어 state를 넣으면 
  이 검색어 state를 fetcher에서 queryKey값으로 받아 fetch할때 변수값으로 사용한다. */
  const {
    isLoading: moviesLoading,
    data: moviesData,
    refetch: searchMovies,
  } = useQuery(["searchMovies", query], moviesApi.search, {
    enabled:
      false /* useQuery의 세번째 인자, 옵션값으로 enabled 옵션은 이 쿼리를 바로 실행할지 안할지를 결정한다 */,
  });
  const {
    isLoading: tvLoading,
    data: tvData,
    refetch: searchTv,
  } = useQuery(["searchTV", query], tvApi.search, { enabled: false });
  const onChangeText = (text: string) => setQuery(text);
  const onSubmit = () => {
    if (query === "") {
      return;
    }
    searchMovies();
    searchTv();
  };
  return (
    <Container>
      <SearchBar
        placeholder="Search for Movie or TV show..."
        placeholderTextColor="rgba(0,0,0,.5)"
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
    </Container>
  );
};
export default Search;
