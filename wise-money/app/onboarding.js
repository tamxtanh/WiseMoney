import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { COLORS, SIZES } from "../constants/theme";
import { router } from "expo-router";
import { supabase } from "../lib/supabase";

const slides = [
  {
    id: 1,
    title: "Gain total control of your money",
    description: "Become your own money manager \n and make every cent count",
    image: require("../assets/images/intro-pic-1.png"),
  },
  {
    id: 2,
    title: "Know where your money goes",
    description:
      "Track your transaction easily,\n with categories and financial report",
    image: require("../assets/images/intro-pic-2.png"),
  },
  {
    id: 3,
    title: "Planning ahead",
    description: "Setup your budget for each category \n so you in control",
    image: require("../assets/images/intro-pic-3.png"),
  },
];

const Onboarding = () => {
  const [showHomePage, setShowHomePage] = useState(false);

  const buttonLabel = (label) => {
    return (
      <View
        style={{
          padding: 12,
        }}
      >
        <Text
          style={{
            color: COLORS.title,
            fontFamily: "600",
            fontSize: SIZES.h4,
          }}
        >
          {label}
        </Text>
      </View>
    );
  };

  const handleSignUp = () => {
    router.push("/auth");
  };

  const handleSignIn = () => {
    router.push("/auth");
  };

  // Check if user is logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace("/(tabs)/home");
        // router.back()
        // try {
        //     router.back()
        // }
        // catch (error) {
        //     router.push(`/(tabs)/home`);
        // }
      } else {
        console.log("no user");
      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.replace("/(tabs)/home");
        // try {
        //     router.back()
        // }
        // catch (error) {
        //     router.push(`/(tabs)/home`);
        // }
      } else {
        console.log("no user 2");
      }
    });
  }, []);

  if (!showHomePage) {
    return (
      <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
        <AppIntroSlider
          data={slides}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  padding: 15,
                  paddingTop: 70,
                  backgroundColor: "#ffffff",
                }}
              >
                <Image
                  source={item.image}
                  style={{
                    width: SIZES.width - 80,
                    height: 300,
                    marginBottom: 30,
                  }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    fontFamily: "InterBold",
                    textAlign: "center",
                    color: COLORS.textColor2,
                    fontSize: SIZES.title,
                    marginLeft: 20,
                    marginRight: 20,
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    fontFamily: "InterRegular",
                    textAlign: "center",
                    color: COLORS.textColor1,
                    fontSize: SIZES.h7,
                    marginTop: 12,
                    marginLeft: 20,
                    marginRight: 20,
                  }}
                >
                  {item.description}
                </Text>
              </View>
            );
          }}
          activeDotStyle={{
            backgroundColor: COLORS.primary,
          }}
          dotStyle={{
            backgroundColor: "#EEE5FF",
          }}
        />
        <View style={{ alignItems: "center", marginTop: 30, marginBottom: 80 }}>
          <TouchableOpacity onPress={handleSignUp} style={styles.button}>
            <Text style={styles.buttonText}>SIGN UP FOR FREE</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSignIn}>
            <Text
              style={{
                color: COLORS.primary,
                marginTop: 30,
                fontFamily: "InterSemiBold",
                fontSize: 15,
              }}
            >
              SIGN IN
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Home Screen</Text>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    width: 328,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 15,
    color: COLORS.white1,
    fontFamily: "InterSemiBold",
  },
});
