import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import TV from "../screens/TV";
import Search from "../screens/Search";
import { useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons"; /* 이미 설치되어있는 expo vector icon을 불러온다 Ionicons이름으로써 */

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = useColorScheme() === "dark";
  /* 디바이스의 dark mode light mode를 감지하는 hooks다 */
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDark ? "grey" : "white",
        },
        tabBarActiveTintColor: isDark ? "yellow" : "grey",
        tabBarInactiveTintColor: isDark ? "grey" : "white",
        headerStyle: {
          backgroundColor: isDark ? "grey" : "white",
        },
        headerTitleStyle: {
          color: isDark ? "white" : "grey",
        },
        tabBarLabelStyle: {
          marginTop: -5,
          fontSize: 10,
          fontWeight: "600",
        },
      }}
    >
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={focused ? "film" : "film-outline"}
                color={color}
                size={size}
              />
            );
            /* 위 Navigator에서 주어진 사이즈와 컬러를 사용한다 */
          },
        }}
      />
      <Tab.Screen
        name="TV"
        component={TV}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={focused ? "tv" : "tv-outline"}
                color={color}
                size={size}
              />
            );
            /* 위 Navigator에서 주어진 사이즈와 컬러를 사용한다 */
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={focused ? "search" : "search-outline"}
                color={color}
                size={size}
              />
            );
            /* 위 Navigator에서 주어진 사이즈와 컬러를 사용한다 */
          },
        }}
      />
    </Tab.Navigator>
  );
};
export default Tabs;

/* screenOptions는 모든 스크린에 동일하게 적용된다.
tabBarLabelStyle은 탭에 있는 글자옵션이다*/

/* options는 각 스크린에 적용된다. */
