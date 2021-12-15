import React from "react";
import styled from "styled-components/native";
import { makeImgPath } from "../utils";

const Img = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 7px;
`;

interface PosterProps {
  path: string;
}

const Poster: React.FC<PosterProps> = ({ path }) => (
  <Img source={{ uri: makeImgPath(path) }} />
);

export default Poster;
