import React from "react";
import styled from "styled-components/native";
import { makeImgPath } from "../utils";

const Img = styled.Image`
  width: 90px;
  height: 140px;
  border-radius: 7px;
  background-color: rgba(255, 255, 255, 0.5);
`;

interface PosterProps {
  path: string;
}

const Poster: React.FC<PosterProps> = ({ path }) => (
  <Img source={{ uri: makeImgPath(path) }} />
);

export default Poster;
