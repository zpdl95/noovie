import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import { Image, useColorScheme, LogBox } from "react-native";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { Ionicons } from "@expo/vector-icons"; /* 이미 설치되어있는 expo vector icon을 불러온다 Ionicons이름으로써 */
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "styled-components/native";
import { QueryClient, QueryClientProvider } from "react-query";
import Root from "./navigation/Root";
import { darkTheme, lightTheme } from "./theme";

/* 이상한 오류가 떠서 무시 */
LogBox.ignoreLogs(["Setting a timer for"]);

/* reactQuery 클라이언트 생성 */
const queryClient = new QueryClient();

const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

const loadImages = (images) =>
  images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.loadAsync(image);
    }
  });

/* hooks를 사용하지 않고 startLoading함수를 따로 만들어 사용하는것이 좀더 유연할 수 있다 */
export default function App() {
  /* 디바이스의 dark mode light mode를 감지하는 hooks다 */
  const isDark = useColorScheme() === "dark";
  const [ready, setReady] = useState(false);
  const onFinish = () => setReady(true);
  const startLoading = async () => {
    const fonts = loadFonts([
      Ionicons.font,
    ]); /* Font.loadAsync를 여러번 사용할때를 위해 */
    const images = loadImages([
      require("./archon.jpg"),
      "https://reactnative.dev/img/oss_logo.png",
    ]); /* 이미지 로드를 여러번 사용할때를 위해 */
    await Promise.all([
      ...fonts,
      ...images,
    ]); /* 폰트의 프로미스와 이미지의 프로미스를 1개의 배열에 넣음 */
  };
  if (!ready) {
    return (
      <AppLoading
        startAsync={startLoading}
        onFinish={onFinish}
        onError={console.error}
      />
    );
  }
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

/* <AppLoading/>컴포넌트는 로딩중 상태일때 강제로 로딩화면을 랜더링 해주는 컴포넌트이다.
이 로딩 상태는 useState를 사용해서 만들어준다
onFinish = startAsync가 해결이 되면 실행되는 함수
onError = startAsync가 해결이 안되면 실행되는 함수
startAsync = 로딩중에 해야될 작업이 들어있는 함수, 이 함수가 실행이 끝나면 Promise를 return한다*/

/* 웹에 있는 이미지 데이터를 로딩할때는 React-native에 있는 Image컴포넌트를 사용한다 */

/* <NavigationContainer><Tabs/></NavigationContainer> 
탭스 네비게이션이나 스택 네비게이션을 사용하기 위해서는 네비게이션컨테이너 안에 넣어줘야한다
<NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}> 으로 기본 테마를 설정해줄 수 있다 */

/* <ThemeProvider theme={isDark ? darkTheme : lightTheme}>를
사용하여 모든 컴포넌트에서 색상테마를 가져다 쓸수 있게 되었다.
모든 컴포넌트는 props안에 theme prop이 들어가 있는것이다 */

/* reactQuery는 <QueryClientProvider client={queryClient}>로 앱을 감싸야 사용 가능 
`https://maxkim-j.github.io/posts/react-query-preview`리액트 쿼리 설명 */
