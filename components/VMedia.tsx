import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";
import Votes from "./Votes";

const Movie = styled.View`
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
}

const VMedia: React.FC<VMediaProps> = ({
  posterPath,
  originalTitle,
  voteAverage,
}) => (
  <Movie>
    <Poster path={posterPath} />
    <Title>
      {originalTitle.slice(0, 10)}
      {originalTitle.length > 10 ? "..." : null}
    </Title>
    <Votes votes={voteAverage} />
  </Movie>
);

export default VMedia;
