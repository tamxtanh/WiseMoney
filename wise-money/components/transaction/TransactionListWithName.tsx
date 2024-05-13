import React, { useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import TransactionWithName from "./TransactionWithName";
import { COLORS, FONT, SIZES } from "../../constants";
import { ListTransactionADay } from "./interface";

const ListTransactionWithName: React.FC<{
  listTransactions: ListTransactionADay;
}> = ({ listTransactions }) => {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    console.log(listTransactions);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.left}>
          <Text style={styles.big}>
            {listTransactions.date.toLocaleString("en-US", {
              day: "2-digit",
            })}
          </Text>

          <View style={styles.normal}>
            <Text style={styles.weekday}>
              {weekdays[listTransactions.date.getDay()]}
            </Text>
            <Text style={styles.gray}>
              {listTransactions.date.toLocaleString("en-US", {
                month: "long", // 'long' for the full month name (e.g., "May")
                year: "numeric", // 'numeric' for the four-digit year (e.g., "2024")
              })}
            </Text>
          </View>
        </View>

        <View style={styles.right}>
          <Text
            style={{
              color: COLORS.textColor2,
              fontSize: 15,
              fontFamily: FONT.medium,
            }}
          >
            {listTransactions.total.toLocaleString("en-US", {
              //   style: "currency",
              //   currency: "VND",
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}
          </Text>
        </View>
      </View>
      <View style={styles.separator} />
      {listTransactions.transactions.map((item, index) => (
        <TransactionWithName key={index} transaction={item} />
      ))}
      {/* // <FlatList
            //     data={listTransactions.transactions}
            //     renderItem={({ item }) => <TransactionWithName transaction={item} />}
            //     keyExtractor={item => item.id.toString()}
            ///> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    flexDirection: "column",
    marginBottom: 14,
  },
  top: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    // backgroundColor: 'green',
    justifyContent: "space-between",
  },
  left: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 20,
  },
  normal: {
    justifyContent: "center",
  },
  right: {
    justifyContent: "center",
    alignItems: "center",
  },
  big: {
    fontSize: 32,
    fontFamily: FONT.regular,
  },
  weekday: {
    fontSize: 13,
    fontFamily: FONT.medium,
  },
  gray: {
    fontSize: 13,
    color: COLORS.gray,
  },
  red: {
    color: COLORS.red,
    fontSize: SIZES.h7,
    fontFamily: FONT.regular,
  },
  green: {
    color: COLORS.textColor2,
    fontSize: 15,
    fontFamily: FONT.medium,
  },
  separator: {
    height: 1.5,
    backgroundColor: "#EEEEF0",
    width: "90%",
    alignSelf: "center",
  },
});

export default ListTransactionWithName;
