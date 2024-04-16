import { Stack } from "expo-router";
import { useFonts } from "expo-font";
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
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
