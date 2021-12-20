import React from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import { Movie, TV } from "../api";
import VMedia from "./VMedia";

const ListContainer = styled.View`
  margin-bottom: 20px;
`;

const ListTitle = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-left: 30px;
  margin-bottom: 20px;
`;

export const HListSeperator = styled.View`
  width: 20px;
`;

interface HListProps {
  title: string;
  data: any[];
}

const HList: React.FC<HListProps> = ({ title, data }) => (
  <ListContainer>
    <ListTitle>{title}</ListTitle>
    <FlatList
      horizontal
      keyExtractor={(item) => item.id + ""}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 30 }}
      data={data}
      ItemSeparatorComponent={HListSeperator}
      renderItem={({ item }: { item: Movie | TV }) => (
        <VMedia
          posterPath={item.poster_path || ""}
          originalTitle={
            "original_title" in item ? item.original_title : item.original_name
          }
          voteAverage={item.vote_average}
          fullData={item}
        />
      )}
    />
  </ListContainer>
);

export default HList;

/* 모든 컴포넌트의 props 객체는 children이라고 이름된 property를 가진다.
this.props.children은 컴포넌트의 오프닝과 JSX태그들 클로징 사이에서 모든것을 리턴할 것이다.
const HList: React.FC<HListProps> = ({ title, children }) => (
  <ListContainer>
    <ListTitle>{title}</ListTitle>
    {children}
  </ListContainer>
); */
