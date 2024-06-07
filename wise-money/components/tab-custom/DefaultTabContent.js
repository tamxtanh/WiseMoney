import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { COLORS, SIZES } from "../../constants";

const DefaultTabContent = ({
  imageUrl,
  title,
  backgroundColor = "#F3F2F7",
}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: backgroundColor,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          marginTop: -100,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          style={{ width: 70, height: 70 }}
          // source={require("../../assets/images/transactional.png")}
          source={imageUrl}
        />
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            fontFamily: "InterRegular",
            color: COLORS.textColor1,
          }}
        >
          {/* Tap <Text style={{ fontSize: 24, color: COLORS.textColor2 }}>+</Text>{" "}
          to add one */}
          {title}
        </Text>
      </View>
    </View>
  );
};

export default DefaultTabContent;
