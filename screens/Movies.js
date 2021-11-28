import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const Movies = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("Stack", { screen: "Three" })}>
    <Text>Movies</Text>
  </TouchableOpacity>
);
export default Movies;

/* navigation prop 안에 있는 navigate 함수를 사용 */
/* navigate의 첫번째 인자가 스크린 이름이면 같은 네비게이터의 스크린으로 이동 
              첫번째 인자가 네비게이터 이름이면 두번째 인자에 스크린 오브젝트를 넣어줘야함 */
