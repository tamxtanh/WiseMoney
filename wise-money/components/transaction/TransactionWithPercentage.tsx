import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { PercentageTransaction } from "./interface";
import { fonts } from "react-native-elements/dist/config";
import { COLORS, FONT, SIZES } from "../../constants/theme";

const TransactionWithPercentage: React.FC<{
  transaction: PercentageTransaction;
}> = ({ transaction }) => {
  const handleClick = () => {
    // Handle click event here
    // Navigate to other page depending on type
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleClick}>
      <View style={styles.left}>
        <Image source={{ uri: transaction.image_url }} style={styles.icon} />
        <View style={styles.categoryName}>
          <Text style={styles.title}>{transaction.category_name}</Text>
          <Text style={styles.subtitle}>
            {transaction.value.toLocaleString("en-US", {
              // style: "currency",
              // currency: "VND",
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}
          </Text>
        </View>
      </View>

      <View style={styles.right}>
        <Text style={styles.red}>{transaction.percentage}%</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TransactionWithPercentage;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 65,
    width: "100%",
    backgroundColor: COLORS.background,
    paddingLeft: "1%",
    paddingRight: "2%",
    justifyContent: "space-between",
  },
  left: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 14,
  },
  categoryName: {
    justifyContent: "center",
  },
  right: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  icon: {
    width: 36,
    height: 36,
    borderRadius: 25,
  },
  title: {
    fontSize: 15,
    fontFamily: FONT.medium,
  },
  subtitle: {
    color: COLORS.gray,
    fontSize: 12,
    fontFamily: FONT.regular,
  },
  red: {
    color: COLORS.expense,
    fontSize: SIZES.h8,
    fontFamily: FONT.semiBold,
  },
  blue: {
    color: COLORS.income,
    fontSize: SIZES.h8,
    fontFamily: FONT.semiBold,
  },
});
