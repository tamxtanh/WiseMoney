import { Tabs } from "expo-router";
import { View, TouchableNativeFeedback, Platform, Image } from "react-native"; // Import TouchableNativeFeedback
import { icons, COLORS } from "../../constants";

export default function TabsLayout() {
  const TouchableComponent =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity; // Determine the Touchable component based on the platform

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: "#ABABAB",
        tabBarStyle: {
          height: 62,
          paddingTop: 5,
          paddingBottom: 9,
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
          elevation: 0,
          backgroundColor: "white",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: -8,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
          title: "Home",
          tabBarIcon: ({ color }) => <icons.house fill={color} />,
          tabBarButton: (props) => (
            <TabBarButton {...props} TouchableComponent={TouchableComponent} />
          ), // Pass TouchableComponent to TabBarButton
        }}
      />

      <Tabs.Screen
        name="transaction"
        options={{
          tabBarLabel: "Transactions",
          title: "Transactions",
          tabBarIcon: ({ color }) => <icons.wallet fill={color} />,
          tabBarButton: (props) => (
            <TabBarButton {...props} TouchableComponent={TouchableComponent} />
          ), // Pass TouchableComponent to TabBarButton
        }}
      />

      <Tabs.Screen
        name="watch-later"
        options={{
          tabBarLabel: "",
          title: "",
          tabBarIcon: ({ color }) => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: COLORS.primary,
                  width: Platform.OS == "ios" ? 40 : 50,
                  height: Platform.OS == "ios" ? 40 : 50,
                  borderRadius: Platform.OS == "ios" ? 25 : 30,
                  top: Platform.OS == "ios" ? 2 : 5,
                }}
              >
                <icons.plus />
              </View>
            );
          },
          // tabBarButton: (props) => (
          //   <TabBarButton {...props} TouchableComponent={TouchableComponent} />
          // ), // Pass TouchableComponent to TabBarButton
        }}
      />

      <Tabs.Screen
        name="report"
        options={{
          tabBarLabel: "Report",
          title: "Report",
          tabBarIcon: ({ color }) => <icons.chart fill={color} />,
          tabBarButton: (props) => (
            <TabBarButton {...props} TouchableComponent={TouchableComponent} />
          ), // Pass TouchableComponent to TabBarButton
        }}
      />

      <Tabs.Screen
        name="account"
        options={{
          tabBarLabel: "Account",
          title: "Account",
          tabBarIcon: ({ color }) => <icons.profile fill={color} />,
          tabBarButton: (props) => (
            <TabBarButton {...props} TouchableComponent={TouchableComponent} />
          ), // Pass TouchableComponent to TabBarButton
        }}
      />
    </Tabs>
  );
}

// Custom TabBarButton component with ripple effect
const TabBarButton = ({ children, onPress, TouchableComponent }) => {
  return (
    <TouchableComponent
      onPress={onPress}
      background={TouchableNativeFeedback.Ripple("#DEF4E2", true)}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {children}
      </View>
    </TouchableComponent>
  );
};
