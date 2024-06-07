import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { DateTransactionWithoutImage } from "./interface";
import { COLORS, FONT, SIZES } from "../../constants/theme";

const TransactionWithDateWithoutImage: React.FC<{
  transaction: DateTransactionWithoutImage;
  showSubtitle?: boolean;
}> = ({ transaction, showSubtitle = false }) => {
  if (!transaction)
    return <></>
  const handleClick = () => {
    // Handle click event here
    // Navigate to other page depending on type
  };

  const formatDate = (date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );
    return formattedDate;
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleClick}>
      <View style={styles.left}>
        <Image
          source={require("../../assets/images/wallet.png")}
          style={styles.icon}
        />
      </View>
      <View style={styles.center}>
        <Text style={styles.title}>{formatDate(new Date(transaction.date))}</Text>
        {showSubtitle && (
          <Text style={styles.subtitle}>{transaction.note}</Text>
        )}
      </View>
      <View style={styles.right}>
        <Text style={transaction.value > 0 ? styles.blue : styles.red}>
          {transaction.value.toLocaleString("en-US", {
            // style: "currency",
            // currency: "VND",
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TransactionWithDateWithoutImage;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 65,
    width: "100%",
    backgroundColor: COLORS.background,
    paddingLeft: "4%",
    paddingRight: "5%",
  },
  left: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  center: {
    flex: 7,
    justifyContent: "center",
    marginLeft: 15,
  },
  right: {
    flex: 4,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  icon: {
    width: 34,
    height: 34,
    borderRadius: 25,
  },
  title: {
    fontSize: 16,
    fontFamily: FONT.regular,
  },
  subtitle: {
    color: COLORS.gray,
    fontSize: SIZES.h8,
    fontFamily: FONT.regular,
  },
  red: {
    color: COLORS.expense,
    fontSize: SIZES.h8,
    fontFamily: FONT.medium,
  },
  blue: {
    color: COLORS.income,
    fontSize: SIZES.h8,
    fontFamily: FONT.medium,
  },
});
