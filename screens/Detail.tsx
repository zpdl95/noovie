import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import { Movie, TV } from "../api";
import Poster from "../components/Poster";

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

/* Root Navigator가 갖고 있는 Screen들의 type을 만들어야한다 */
type RootStackParamList = {
  Detail: Movie | TV /* 해당 screen에 있는 params의 type을 명시 */;
};

/* DetailScreen의 type옵션 설정 */
/* NativeStackScreenProps = 이러한 종류의 Screen 안에 들어간다고 명시 */
/* RootStackParamList = 타입 명시 */
/* "Detail" = screen 이름 명시 */
type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;

const Detail: React.FC<DetailScreenProps> = ({
  navigation: { setOptions },
  route: { params },
}) => {
  /* component가 didmount됐을 때 실행시킴  */
  useEffect(() => {
    setOptions({
      title:
        "original_title" in params
          ? params.original_title
          : params.original_name,
    });
  }, []);
  return (
    <Container>
      <Poster path={params.poster_path || ""} />
    </Container>
  );
};

export default Detail;
