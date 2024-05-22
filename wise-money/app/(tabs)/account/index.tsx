import { Stack } from "expo-router";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { Button } from "react-native-elements";
import { supabase } from "../../../lib/supabase";
import UpdateProfile from "../../../components/profile/UpdateProfile";
import { COLORS, icons, SIZES } from "../../../constants";
import UtilityItemList from "../../../components/utility/utilityItemList";
import React, { useState, useEffect } from "react";
import styles from "./styles";

export default function Page() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [avatarUrl, setAvatarUrl] = useState(
    "https://eianmciufswbutirdbka.supabase.co/storage/v1/object/public/my%20files/images/icons/dollar.png?t=2024-03-03T11%3A57%3A19.836Z"
  );
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
      pathName: "/categoryList",
    },
    {
      title: "Categories",
      icon: <icons.category fill="white" />,
      colorBox: "#12C144",
      pathName: "/categoryList",
    },
    {
      title: "Loans",
      icon: <icons.debts fill="white" />,
      colorBox: "#FB6C23",
      pathName: "/loan",
    },
    {
      title: " Suggestions",
      icon: <icons.spendingSuggestions fill="white" />,
      colorBox: "#0585FF",
    },

    {
      title: "Calculate Tax",
      icon: <icons.category fill="white" />,
      colorBox: "#1BD6E2",
    },

    {
      title: "Exchange Rates",
      icon: <icons.exchangeRates fill="white" />,
      colorBox: "#4445E8",
      pathName: "/exchange-rate",
    },

    {
      title: "Calculate Interest",
      icon: <icons.bank fill="white" />,
      colorBox: "#FF4133",
      pathName: "/saving",
    },
    {
      title: "Export Data",
      icon: <icons.exportData fill="white" />,
      colorBox: "#FFC75C",
      pathName: "/export-data",
    },
  ];

  const functionList = [
    {
      icon: <icons.user fill="#919191" />,
      title: "Change Profile",
      onPress: () => {
        router.push("/profile");
      },
    },
    {
      icon: <icons.about fill="#919191" />,
      title: "About Us",
      onPress: () => { },
    },
    {
      icon: <icons.policy fill="#919191" />,
      title: "Policy",
      onPress: () => { },
    },
    {
      icon: <icons.feedBack fill="#919191" />,
      title: "Feedback",
      onPress: () => { },
    },
    {
      icon: <icons.rating fill="#919191" />,
      title: "Rate App",
      onPress: () => { },
    },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      let { data, error } = await supabase.rpc("get_user_data", {
        user_email: user.email,
      });

      if (error) console.error(error);
      else {
        setEmail(data[0].email);
        setName(data[0].name);
        setAvatarUrl(data[0].avatar_url);
      }
    };
    fetchUserData();
  }, []);

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
              <icons.support fill="white" />
            </View>
          ),
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerShadowVisible: false,
        }}
      />
      <ScrollView style={styles.scrollView}>
        <View style={{ flex: 1 }}>
          <View style={styles.infoContainer}>
            <Image style={styles.avatar} source={{ uri: avatarUrl }} />
            <Text style={styles.textName}>{name}</Text>
            <Text style={{ textAlign: "center" }}>{email}</Text>
          </View>

          {/* <View style={styles.separator} /> */}

          <View style={[styles.otherUtilities, { paddingBottom: 25 }]}>
            <Text style={styles.lTitleBox}> Utilities</Text>
            <UtilityItemList itemData={utilityList} qualityPerRow={4} />
          </View>

          {/* <View style={styles.separator} /> */}

          <View style={styles.otherUtilities}>
            <Text style={styles.lTitleBox}> Others</Text>
            <FlatList
              scrollEnabled={false}
              data={functionList}
              keyExtractor={(item) => item.title}
              renderItem={({ item }) => (
                <View>
                  <TouchableOpacity
                    style={styles.functionItem}
                    onPress={item.onPress}
                  >
                    <View style={{ flexDirection: "row", gap: 20 }}>
                      {item.icon}
                      <Text style={styles.functionTitle}>{item.title}</Text>
                    </View>

                    <View>
                      <icons.arrowRight fill="#c0c0c2" />
                    </View>
                  </TouchableOpacity>

                  <View
                    style={{
                      height: 0.8,
                      backgroundColor: "#EEEEF0",
                      width: "92%",
                      alignSelf: "center",
                    }}
                  ></View>
                </View>
              )}
            />
          </View>

          {/* <View style={styles.separator} /> */}

          <Button
            buttonStyle={styles.signOut}
            titleStyle={styles.textSignOut}
            title="SIGN OUT"
            onPress={signOut}
          />
        </View>
      </ScrollView>
    </View>
  );
}
