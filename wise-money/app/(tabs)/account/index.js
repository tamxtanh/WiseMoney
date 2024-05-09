import { Stack } from "expo-router";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Button } from "react-native-elements";
import { supabase } from "../../../lib/supabase";
import UpdateProfile from "../../../components/profile/UpdateProfile";
import { COLORS, icons, SIZES } from "../../../constants";
import UtilityItemList from "../../../components/utility/utilityItemList";

export default function Page() {
  const router = useRouter();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    console.log("Signed out!");
    if (error) {
      console.error("Error signing out:", error);
    } else {
      router.push("/auth");
    }
  };

  const utilityList = [
    {
      title: "Wallets",
      icon: <icons.wallet3 fill="white" />,
      colorBox: "#4445E8",
    },
    {
      title: "Categories",
      icon: <icons.category fill="white" />,
      colorBox: "#12C144",
    },
    {
      title: "Debts",
      icon: <icons.debts fill="white" />,
      colorBox: "#FB6C23",
    },
    {
      title: " Suggestions",
      icon: <icons.spendingSuggestions fill="white" />,
      colorBox: "#0585FF",
    },

    {
      title: "Tax",
      icon: <icons.spendingSuggestions fill="white" />,
      colorBox: "#1BD6E2",
    },

    {
      title: "Exchange Rates",
      icon: <icons.exchangeRates fill="white" />,
      colorBox: "#4445E8",
    },

    {
      title: "Interest",
      icon: <icons.bank fill="white" />,
      colorBox: "#FF4133",
    },
    {
      title: "Export Data",
      icon: <icons.exportData fill="white" />,
      colorBox: "#FFC75C",
    },
  ];

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <View style={{ marginLeft: 5 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "InterSemiBold",
                  color: "white",
                }}
              >
                Account
              </Text>
            </View>
          ),
          headerTitle: "",
          headerRight: () => (
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "InterMedium",
                  color: "white",
                }}
              >
                Support
              </Text>
              <icons.support />
            </View>
          ),
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerShadowVisible: false,
        }}
      />
      <ScrollView
        style={{ flex: 1, marginBottom: SIZES.heightBottomNavigation }}
      >
        <View style={{ flex: 1 }}>
          <UpdateProfile></UpdateProfile>
          <Button title="Sign Out" onPress={signOut} />

          <View style={styles.otherUtilities}>
            <Text style={styles.lTitleBox}> Other utilities</Text>
            <View style={styles.listOtherUti}>
              <UtilityItemList itemData={utilityList} qualityPerRow={4} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  otherUtilities: {
    marginTop: 10,
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  lTitleBox: {
    fontSize: 16,
    fontFamily: "InterSemiBold",
    color: "#000000",
  },
});
