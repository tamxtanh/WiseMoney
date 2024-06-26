import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const InputTransaction = ({
  iconSvg,
  title,
  iconBoxStyle,
  textInputTransaction,
  inputIcon = false,
  isHaveChildren = false,
  children,
}) => {
  return (
    <View style={styles.inputTransaction}>
      <View style={[styles.iconBox, iconBoxStyle]}>{iconSvg}</View>
      {isHaveChildren ? (
        children
      ) : (
        <Text style={textInputTransaction}> {title} </Text>
      )}
    </View>
  );
};

export default InputTransaction;

const styles = StyleSheet.create({
  inputTransaction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  iconBox: {
    padding: 5,
  },
});
