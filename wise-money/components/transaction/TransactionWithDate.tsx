import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { DateTransaction } from "./interface";
import { fonts } from "react-native-elements/dist/config";
import { COLORS, FONT, SIZES } from "../../constants/theme";
import { router } from "expo-router";

const TransactionWithDate: React.FC<{ transaction: DateTransaction }> = ({
  transaction,
}) => {
  let type;

  if (transaction?.type === "debtLoan" && transaction?.value > 0) {
    type = "debt";
  } else if (transaction?.type === "debtLoan" && transaction?.value < 0) {
    type = "loan";
  } else {
    type = transaction?.type;
  }

  const handleClick = () => {
    // Handle click event here
    // Navigate to other page depending on type
    router.navigate({
      pathname: `/update-transaction/${transaction.id}`,
      params: {
        typeTransaction: type,
      },
    });
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "long",
      year: "numeric",
    };
    const formattedDate = new Date(date).toLocaleDateString("en-US", options);
    const [month, day, year] = formattedDate.split(" ");
    return `${day.replace(",", "")} ${month} ${year}`;
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleClick}>
      <View style={styles.left}>
        <Image source={{ uri: transaction.image_url }} style={styles.icon} />
        <View style={styles.categoryName}>
          <Text style={styles.title}>{transaction.category_name}</Text>
          <Text style={styles.subtitle}>{formatDate(transaction.date)}</Text>
        </View>
      </View>

      <View style={styles.right}>
        <Text style={transaction.value < 0 ? styles.red : styles.blue}>
          {Math.abs(transaction.value).toLocaleString("en-US", {
            // If you want to display the value as a currency, uncomment the lines below
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

export default TransactionWithDate;

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
    fontFamily: FONT.regular,
  },
});
