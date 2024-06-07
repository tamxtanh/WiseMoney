import React from "react";
import { View, StyleSheet } from "react-native";
import { COLORS } from "../../constants";

const HorizontalProgressBar = ({ progress, color = COLORS.redTarget }) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.filled,
          { width: `${progress}%` },
          { backgroundColor: color },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 12,
    width: "100%",
    backgroundColor: "#e4e9ec",
    borderRadius: 10,
    overflow: "hidden",
  },
  filled: {
    height: "100%",
    backgroundColor: "#3b5998",
    borderRadius: 10,
  },
});

export default HorizontalProgressBar;
