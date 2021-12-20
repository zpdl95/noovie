import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Movie, TV } from "../api";
import Poster from "./Poster";
import Votes from "./Votes";

const MovieView = styled.View`
  align-items: center;
`;

const Title = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 11px;
  margin-top: 3px;
  margin-bottom: 3px;
`;

interface VMediaProps {
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  fullData: Movie | TV;
}

const VMedia: React.FC<VMediaProps> = ({
  posterPath,
  originalTitle,
  voteAverage,
  fullData,
}) => {
  /* useNavigation hook은 navigation prop을 사용할 수 있게 해주는 함수다 */
  const navigation = useNavigation();
  const goToDetail = () => {
    /* navigate는 다른 screen으로 이동해주는 함수
    첫번째인자로 screen이름을 넣으면 같은 Tab or Stack Navigator안에서 이동
    다른 Navigator에 있는 screen으로 이동하려면 ↓ 처럼 작성 */
    /* navigate로 이동할때 screen name과 params에 값을 전달한다 */
    navigation.navigate("Stack", {
      screen: "Detail",
      params: { ...fullData },
    });
  };
  return (
    <TouchableOpacity onPress={goToDetail}>
      <MovieView>
        <Poster path={posterPath} />
        <Title>
          {originalTitle.slice(0, 10)}
          {originalTitle.length > 10 ? "..." : null}
        </Title>
        <Votes votes={voteAverage} />
      </MovieView>
    </TouchableOpacity>
  );
};

export default VMedia;
