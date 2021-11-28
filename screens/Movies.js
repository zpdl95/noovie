import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const Btn = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  /* <ThemeProvider theme={isDark ? darkTheme : lightTheme}>를
  이용하여 styledComponent에 props값으로 theme값을 전달해 사용 할 수 있다. */
`;

const Movies = ({ navigation: { navigate } }) => (
  <Btn onPress={() => navigate("Stack", { screen: "Three" })}>
    <Title>Movies</Title>
  </Btn>
);
export default Movies;

/* navigation prop 안에 있는 navigate 함수를 사용 */
/* navigate의 첫번째 인자가 스크린 이름이면 같은 네비게이터의 스크린으로 이동 
              첫번째 인자가 네비게이터 이름이면 두번째 인자에 스크린 오브젝트를 넣어줘야함 */
