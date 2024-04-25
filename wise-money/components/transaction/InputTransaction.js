import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const InputTransaction = ({
  iconSvg,
  title,
  iconBoxStyle,
  textInputTransaction,
  handlerOnPress,
}) => {
  return (
    <TouchableOpacity onPress={handlerOnPress}>
      <View style={styles.inputTransaction}>
        <View style={[styles.iconBox, iconBoxStyle]}>{iconSvg}</View>
        <Text style={textInputTransaction}> {title} </Text>
      </View>
    </TouchableOpacity>
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
