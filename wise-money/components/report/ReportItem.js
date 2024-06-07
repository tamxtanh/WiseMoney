import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { COLORS } from "../../constants";

const ReportItem = ({ imageUrl, title }) => {
  return (
    <View style={styles.container}>
      <Image
        style={{
          width: 40,
          height: 40,
        }}
        source={imageUrl}
      />
      <Text numberOfLines={1} style={styles.title}>
        {title}
      </Text>
    </View>
  );
};

export default ReportItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
    paddingVertical: 27,
    paddingHorizontal: 10,
    borderRadius: 7,
    flex: 1,
  },
  title: {
    fontFamily: "InterMedium",
    fontSize: 14,
    color: COLORS.textColor2,
    textAlign: "center",
    flex: 1,
    maxWidth: "100%", // Ensures the title doesn't exceed the width of its container
  },
});
