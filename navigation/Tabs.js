import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import TV from "../screens/TV";
import Search from "../screens/Search";

const Tab = createBottomTabNavigator();

const Tabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Movies" component={Movies} />
    <Tab.Screen name="TV" component={TV} />
    <Tab.Screen name="Search" component={Search} />
  </Tab.Navigator>
);
export default Tabs;
