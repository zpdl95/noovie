import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Movie } from "../api";
import Poster from "./Poster";
import Votes from "./Votes";

const HMovie = styled.View`
  padding: 0px 30px;
  flex-direction: row;
`;

const HColumn = styled.View`
  margin-left: 15px;
  width: 80%;
`;

const Overview = styled.Text`
  color: white;
  opacity: 0.8;
  width: 80%;
  font-size: 12px;
`;

const Release = styled.Text`
  color: white;
  font-size: 12px;
  margin-vertical: 7px;
  font-weight: 500;
  opacity: 0.6;
`;

const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
`;

interface HMediaProps {
  posterPath: string;
  originalTitle: string;
  overview: string;
  releaseDate?: string;
  voteAverage?: number;
  fullData: Movie;
}

const HMedia: React.FC<HMediaProps> = ({
  posterPath,
  originalTitle,
  overview,
  releaseDate,
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
      <HMovie>
        <Poster path={posterPath} />
        <HColumn>
          <Title>
            {originalTitle.length > 30
              ? `${originalTitle.slice(0, 30)}...`
              : originalTitle}
          </Title>
          {releaseDate ? (
            <Release>
              {new Date(releaseDate).toLocaleDateString("ko", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </Release>
          ) : null}
          {voteAverage ? <Votes votes={voteAverage} /> : null}
          <Overview>
            {overview.length > 100
              ? `${overview.split(" ").slice(0, 21).join(" ")} ...`
              : overview}
          </Overview>
        </HColumn>
      </HMovie>
    </TouchableOpacity>
  );
};

export default HMedia;
