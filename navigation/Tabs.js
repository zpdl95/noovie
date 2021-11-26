import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import TV from "../screens/TV";
import Search from "../screens/Search";
import { useColorScheme } from "react-native";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = useColorScheme() === "dark";
  /* 디바이스의 dark mode light mode를 감지하는 hooks다 */
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: isDark ? "grey" : "white" },
        tabBarActiveTintColor: isDark ? "white" : "grey",
        tabBarInactiveTintColor: isDark ? "grey" : "white",
        headerStyle: {
          backgroundColor: isDark ? "grey" : "white",
        },
        headerTitleStyle: {
          color: isDark ? "white" : "grey",
        },
      }}
    >
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{ color: "blue" }}
      />
      <Tab.Screen name="TV" component={TV} />
      <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
  );
};
export default Tabs;

/* screenOptions는 모든 스크린에 동일하게 적용된다.
tabBarLabelStyle은 탭에 있는 글자옵션이다*/

/* options는 각 스크린에 적용된다. */
