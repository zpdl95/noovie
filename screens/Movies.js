import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const Btn = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  color: ${(props) => (props.selected ? "blue" : "red")};
  /* ${(props) => props.selected} 임의로 생성한 props를 사용하는 방법
    styled컴포넌트라서 사용가능하다 */
`;

const Movies = ({ navigation: { navigate } }) => (
  <Btn onPress={() => navigate("Stack", { screen: "Three" })}>
    <Title selected={false}>Movies</Title>
    /* Title 컴포넌트에 selected props를 임의로 생성 */
  </Btn>
);
export default Movies;

/* navigation prop 안에 있는 navigate 함수를 사용 */
/* navigate의 첫번째 인자가 스크린 이름이면 같은 네비게이터의 스크린으로 이동 
              첫번째 인자가 네비게이터 이름이면 두번째 인자에 스크린 오브젝트를 넣어줘야함 */
