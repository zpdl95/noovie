import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import { Image, Text } from "react-native";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { Ionicons } from "@expo/vector-icons"; /* 이미 설치되어있는 expo vector icon을 불러온다 Ionicons이름으로써 */

export default function App() {
  const [ready, setReady] = useState(false);
  const onFinish = () => setReady(true);
  const startLoading = async () => {
    await Font.loadAsync(Ionicons.font); /* 웹에서 폰트를 로딩할때 사용 */
    await Asset.loadAsync(
      require("./archon.jpg")
    ); /* 로컬데이터를 로딩할때 사용 */
    await Image.prefetch(
      "https://reactnative.dev/img/oss_logo.png"
    ); /* 웹에서 이미지가 필요하면 이 방식으로 로딩 */
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
  return <Text>We are done loading!</Text>;
}

/* <AppLoading/>컴포넌트는 로딩중 상태일때 강제로 로딩화면을 랜더링 해주는 컴포넌트이다.
이 로딩 상태는 useState를 사용해서 만들어준다
onFinish = startAsync가 해결이 되면 실행되는 함수
onError = startAsync가 해결이 안되면 실행되는 함수
startAsync = 로딩중에 해야될 작업이 들어있는 함수, 이 함수가 실행이 끝나면 Promise를 return한다*/

/* 웹에 있는 이미지 데이터를 로딩할때는 React-native에 있는 Image컴포넌트를 사용한다 */
