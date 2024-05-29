import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import TransactionWithDateWithoutImage from "./TransactionWithDateWithoutImage";
import {
  DateTransactionWithoutImage,
  TransactionListByCategory,
} from "./interface";
import { COLORS, FONT, SIZES, icons } from "../../constants";

const TransactionReportListByCategory: React.FC<{
  data: TransactionListByCategory;
  colorValue: string;
}> = ({ data, colorValue }) => {
  const renderItem = ({ item }: { item: DateTransactionWithoutImage }) => (
    <TransactionWithDateWithoutImage
      transaction={item}
      iconWidth={18}
      sizeTitle={10}
      sizeValue={10}
    />
  );

  const [isDropDown, setIsDropDown] = useState(false);

  return (
    <View style={[styles.container, { marginBottom: isDropDown ? 15 : 0 }]}>
      <View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setIsDropDown((prev) => !prev)}
        >
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
              <Text style={[styles.total, { color: colorValue }]}>
                {data.total.toLocaleString("en-US", {
                  //   style: "currency",
                  //   currency: "VND",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })}
              </Text>
              {isDropDown ? (
                <icons.arrowDropUp fill={colorValue} />
              ) : (
                <icons.arrowDropDown2 fill={colorValue} />
              )}
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />
      {/* <FlatList
        data={data.transactions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      /> */}
      {isDropDown &&
        data.transactions.map((item, index) => (
          <TransactionWithDateWithoutImage
            key={index}
            transaction={item}
            iconWidth={28}
            sizeTitle={14}
            sizeValue={14}
            containerHeight={55}
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    flexDirection: "column",
    // marginBottom: 10,
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
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  image: {
    width: 36,
    height: 36,
    borderRadius: 25,
  },
  title: {
    fontFamily: FONT.medium,
    fontSize: 16,
  },
  subtitle: {
    fontSize: 11,
    fontFamily: FONT.regular,
    color: COLORS.textColor3,
  },
  total: {
    color: COLORS.expense,
    fontSize: 16,
    fontFamily: FONT.medium,
  },
  separator: {
    height: 1.5,
    backgroundColor: "#EEEEF0",
    width: "90%",
    alignSelf: "center",
  },
});

export default TransactionReportListByCategory;
