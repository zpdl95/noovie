import React, { useState } from "react";
import styled from "styled-components/native";

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

  const onChangeText = (text: string) => setQuery(text);
  return (
    <Container>
      <SearchBar
        placeholder="Search for Movie or TV show..."
        placeholderTextColor="rgba(0,0,0,.5)"
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect
        onChangeText={onChangeText}
      />
    </Container>
  );
};
export default Search;
