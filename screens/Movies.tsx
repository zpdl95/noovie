import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
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
/* ↓ Movies를 Type해주려면 NativeStackScreenProps를 가져와야한다
첫번째 인자는 RootStackParamList가 들어가야하지만 이번에는 그냥 any로 대체
두번째 인자는 Screen의 이름을 넣는다 */
/* React.FC는 Screen의 props를 type을 정해주기 위해 사용,
type이 정해지면 자동완성기능이 생김,
navigation과 navigate가 자동완성이 됨 */
const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({
  navigation: { navigate },
}) => (
  <Btn onPress={() => navigate("Stack", { screen: "Three" })}>
    <Title>Movies</Title>
  </Btn>
);
export default Movies;

/* navigation prop 안에 있는 navigate 함수를 사용 */
/* navigate의 첫번째 인자가 스크린 이름이면 같은 네비게이터의 스크린으로 이동 
              첫번째 인자가 네비게이터 이름이면 두번째 인자에 스크린 오브젝트를 넣어줘야함 */
