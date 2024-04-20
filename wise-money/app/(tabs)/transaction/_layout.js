import { Stack, Link } from "expo-router";
import { Image } from "react-native";
import { icons, COLORS } from "../../../constants";

const TransactionLayout = () => {
  return (
    <Stack
      screenOptions={{ headerShadowVisible: false, headerTitleAlign: "center" }}
    >
      <Stack.Screen
        name="(tabs-top)"
        // options={{
        //   headerLeft: () => (
        //     <Link href={"/category-list"}>
        //       <icons.category fill={COLORS.iconColor} />
        //     </Link>
        //   ),
        //   headerTitle: () => (
        //     <Image
        //       source={require("../../../assets/images/logo-home.png")}
        //       style={{
        //         width: 60,
        //         height: 60,
        //         resizeMode: "contain",
        //       }}
        //     />
        //   ),
        //   headerRight: () => <icons.notification fill={COLORS.iconColor} />,
        // }}
      />

      <Stack.Screen
        name="detail"
        options={{ headerTitle: "Detail", headerBackTitle: "Back" }}
      />
    </Stack>
  );
};

export default TransactionLayout;
