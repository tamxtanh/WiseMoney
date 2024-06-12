import { Tabs } from "expo-router";
import { View, TouchableNativeFeedback, Platform, Image } from "react-native"; // Import TouchableNativeFeedback
import { icons, COLORS, SIZES } from "../../constants";
import { useKeyboard } from "../../context/KeyboardContext";

export default function TabsLayout() {
  const TouchableComponent =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity; // Determine the Touchable component based on the platform
  const { setInputValue } = useKeyboard();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: "#ABABAB",
        tabBarStyle: {
          height: SIZES.heightBottomNavigation,
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
        name="add-transaction"
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
                  width: Platform.OS == "ios" ? 40 : 48,
                  height: Platform.OS == "ios" ? 40 : 48,
                  borderRadius: Platform.OS == "ios" ? 25 : 30,
                  top: Platform.OS == "ios" ? 2 : 4,
                }}
              >
                <icons.plus />
              </View>
            );
          },
          // tabBarButton: (props) => (
          //   <TabBarButton {...props} TouchableComponent={TouchableComponent} />
          // ), // Pass TouchableComponent to TabBarButton

          tabBarButton: (props) => (
            <TabBarButton
              {...props}
              TouchableComponent={TouchableComponent}
              onPress={() => {
                setInputValue("");
                props.onPress();
              }}
            />
          ),
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
