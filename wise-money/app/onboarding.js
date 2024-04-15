import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { COLORS, SIZES } from "../constants/theme";

const slides = [
  {
    id: 1,
    title: "Gain total control of your money",
    description: "Become your own money manager and make every cent count",
    image: require("../assets/images/intro-pic-1.png"),
  },
  {
    id: 2,
    title: "Know where your money goes",
    description:
      "Track your transaction easily, with categories and financial report",
    image: require("../assets/images/intro-pic-2.png"),
  },
  {
    id: 3,
    title: "Planning ahead",
    description: "Setup your budget for each category so you in control",
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
            fontWeight: "600",
            fontSize: SIZES.h4,
          }}
        >
          {label}
        </Text>
      </View>
    );
  };

  if (!showHomePage) {
    return (
      <AppIntroSlider
        data={slides}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                padding: 15,
                paddingTop: 100,
                backgroundColor: "#ffffff",
              }}
            >
              <Image
                source={item.image}
                style={{
                  width: SIZES.width - 80,
                  height: 400,
                }}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontWeight: "bold",
                  color: COLORS.title,
                  fontSize: SIZES.h1,
                }}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  paddingTop: 5,
                  color: COLORS.title,
                }}
              >
                {item.description}
              </Text>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>SIGN UP FOR FREE</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={{ color: COLORS.primary, marginTop: 10 }}>
                  SIGN IN
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
        activeDotStyle={{
          backgroundColor: COLORS.primary,
          width: 30,
        }}
        showSkipButton
        renderNextButton={() => buttonLabel("Next")}
        renderSkipButton={() => buttonLabel("Skip")}
        renderDoneButton={() => buttonLabel("Done")}
        onDone={() => {
          setShowHomePage(true);
        }}
      />
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
    marginTop: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    width: 328,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 15,
    color: COLORS.whitee,
  },
});
