import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";

const ScreenOne = ({ navigation: { navigate } }) => (
  /* StackNavigator에 있는 navigation props의 사용 방법 */
  <TouchableOpacity onPress={() => navigate("Two")}>
    <Text>go to Two</Text>
  </TouchableOpacity>
);
const ScreenTwo = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("Three")}>
    <Text>go to Three</Text>
  </TouchableOpacity>
);
const ScreenThree = ({ navigation: { goBack } }) => (
  <TouchableOpacity onPress={() => goBack()}>
    <Text>go back</Text>
  </TouchableOpacity>
);

const NativeStack = createNativeStackNavigator();

const Stack = () => (
  <NativeStack.Navigator>
    <NativeStack.Screen name="One" component={ScreenOne} />
    <NativeStack.Screen name="Two" component={ScreenTwo} />
    <NativeStack.Screen name="Three" component={ScreenThree} />
  </NativeStack.Navigator>
);
export default Stack;
