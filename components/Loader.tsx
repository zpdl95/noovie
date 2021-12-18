import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

const LoaderContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Loader: React.FC = () => (
  <LoaderContainer>
    <ActivityIndicator color="white" />
  </LoaderContainer>
);

export default Loader;
