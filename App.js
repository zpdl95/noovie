import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import { Text } from "react-native";

export default function App() {
  const [ready, setReady] = useState(false);
  const onFinish = () => setReady(true);
  const startLoading = async () => {};
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
