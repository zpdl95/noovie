import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Detail from "../screens/Detail";

const NativeStack = createNativeStackNavigator();

/* StackNavigator에 있는 navigation prop의 사용 방법
'const ScreenOne = ({ navigation: { navigate } }) =>'
모든 Screen컴포넌트에 들어간 component는 navigation prop를 가진다 */
const Stack = () => (
  <NativeStack.Navigator>
    <NativeStack.Screen name="Detail" component={Detail} />
  </NativeStack.Navigator>
);
export default Stack;
