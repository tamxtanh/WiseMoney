import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const UtilityItem = ({ title, icon, colorBox }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <View style={[styles.iconBox, { backgroundColor: colorBox }]}>
          {icon}
        </View>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UtilityItem;

const styles = StyleSheet.create({
  container: {
    flex: 1 / 4,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconBox: {
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  title: {
    marginTop: 7,
    fontFamily: "InterMedium",
    fontSize: 12,
    textAlign: "center",
  },
});
