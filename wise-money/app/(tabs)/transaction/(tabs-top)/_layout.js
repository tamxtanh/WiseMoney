import { View, Text } from "react-native";
import React from "react";

import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
  MaterialTopTabNavigationEventMap,
} from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";

import { withLayoutContext } from "expo-router";

const { Navigator } = createMaterialTopTabNavigator();

// code in typescript

// export const MaterialTopTabs = withLayoutContext<
// MaterialTopTabNavigationOptions,
// typeof Navigator,
// TabNavigationState<ParamListBase>,
// MaterialTopTabNavigationEventMap
// >(Navigator);

export const MaterialTopTabs = withLayoutContext(Navigator);

const Layout = () => {
  return (
    <MaterialTopTabs
      screenOptions={{
        tabBarActiveTintColor: "#131620",
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "bold",
          textTransform: "capitalize",
        },
        tabBarIndicatorStyle: { backgroundColor: "#1c87ed", height: 3 },
      }}
    >
      <MaterialTopTabs.Screen name="index" options={{ title: "Tin nóng" }} />
      <MaterialTopTabs.Screen name="thoisu" options={{ title: "Thời sự" }} />
      <MaterialTopTabs.Screen name="moinhat" options={{ title: "Mới nhất" }} />
    </MaterialTopTabs>
  );
};

export default Layout;
