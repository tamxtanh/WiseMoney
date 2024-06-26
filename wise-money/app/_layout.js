import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { icons } from "../constants";
import { StyleSheet, View, Text } from "react-native";
import { KeyboardProvider } from "../context/KeyboardContext";
import NumericKeyboard from "../components/keyboard-custom/NumericKeyboard";

// import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();

const Layout = () => {
  const [fontsLoaded] = useFonts({
    DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
    InterSemiBold: require("../assets/fonts/Inter-SemiBold.otf"),
    InterBold: require("../assets/fonts/Inter-Bold.otf"),
    InterMedium: require("../assets/fonts/Inter-Medium.otf"),
    InterRegular: require("../assets/fonts/Inter-Regular.otf"),
    InterLight: require("../assets/fonts/Inter-Light.otf"),
    InterExtraBold: require("../assets/fonts/Inter-ExtraBold.otf"),
  });

  return (
    <KeyboardProvider>
      {fontsLoaded ? (
        <View style={styles.container}>
          <Stack initialRouteName="(tabs)">
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="onboarding" options={{ headerShown: false }} />
            <Stack.Screen
              name="(wallet)/create-wallet/index"
              options={{ headerShown: false, headerTitle: "" }}
            />
            <Stack.Screen
              name="iconList"
              options={{
                headerTitle: () => (
                  <View style={{ marginLeft: 0 }}>
                    <Text style={{ fontSize: 20, fontFamily: "InterSemiBold" }}>
                      Select icon
                    </Text>
                  </View>
                ),
                // headerLeft: () => (
                //   <TouchableOpacity onPress={() => navigation.goBack()}>
                //     <icons.arrowBack fill="black" />
                //   </TouchableOpacity>
                // ),
              }}
            />
          </Stack>
          <NumericKeyboard />
        </View>
      ) : null}
    </KeyboardProvider>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative", // Ensure the parent container has position: relative
  },
});
