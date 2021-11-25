import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import { Image, Text } from "react-native";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { Ionicons } from "@expo/vector-icons"; /* 이미 설치되어있는 expo vector icon을 불러온다 Ionicons이름으로써 */
import { loadAsync } from "expo-font";

const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

const loadImages = (images) =>
  images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.loadAsync(image);
    }
  });

export default function App() {
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
    /* 아래의 AppLoading에 있는 3가지 Props를 사용하기 위한 작업이 윗 부분이다 */
    /* Hooks를 사용하면 Props와 위의 함수를 사용할 필요가 없다 */
    return (
      <AppLoading
        startAsync={startLoading}
        onFinish={onFinish}
        onError={console.error}
      />
    );
  }
  return <Text>We are done loading!</Text>;
}

/* <AppLoading/>컴포넌트는 로딩중 상태일때 강제로 로딩화면을 랜더링 해주는 컴포넌트이다.
이 로딩 상태는 useState를 사용해서 만들어준다
onFinish = startAsync가 해결이 되면 실행되는 함수
onError = startAsync가 해결이 안되면 실행되는 함수
startAsync = 로딩중에 해야될 작업이 들어있는 함수, 이 함수가 실행이 끝나면 Promise를 return한다*/

/* 웹에 있는 이미지 데이터를 로딩할때는 React-native에 있는 Image컴포넌트를 사용한다 */
