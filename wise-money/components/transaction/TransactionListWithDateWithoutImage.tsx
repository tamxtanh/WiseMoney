import React from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import TransactionWithDateWithoutImage from "./TransactionWithDateWithoutImage";
import {
  DateTransactionWithoutImage,
  TransactionListByCategory,
} from "./interface";
import { COLORS, FONT, SIZES } from "../../constants";

const TransactionListWithDateWithoutImage: React.FC<{
  data: TransactionListByCategory;
}> = ({ data }) => {
  const renderItem = ({ item }: { item: DateTransactionWithoutImage }) => (
    <TransactionWithDateWithoutImage transaction={item} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.left}>
          <Image source={{ uri: data.image_url }} style={styles.image} />

          <View style={styles.center}>
            <Text style={styles.title}>{data.category_name}</Text>
            <Text style={styles.subtitle}>
              {data.total_transaction} transactions
            </Text>
          </View>
        </View>

        <View style={styles.right}>
          <Text style={styles.total}>
            {data.total.toLocaleString("en-US", {
              //   style: "currency",
              //   currency: "VND",
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}
          </Text>
        </View>
      </View>
      <View style={styles.separator} />
      {/* <FlatList
        data={data.transactions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      /> */}
      {data.transactions.map((item, index) => (
        <TransactionWithDateWithoutImage key={index} transaction={item} />
      ))}
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
    gap: 17,
  },
  center: {
    justifyContent: "center",
  },
  right: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
  title: {
    fontFamily: FONT.medium,
    fontSize: 18,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: FONT.regular,
    color: COLORS.textColor3,
  },
  total: {
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

export default TransactionListWithDateWithoutImage;
