import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { COLORS } from "../../constants";
import TransactionListWithDateWithoutImage from "../transaction/TransactionListWithDateWithoutImage";
import ListTransactionWithName from "../transaction/TransactionListWithName";

const TabContent = ({ content }) => {
  const transactionListData = [
    {
      date: new Date(2024, 3, 20), // Day 1
      total: 50000,
      transactions: [
        {
          id: 1,
          image_url: "image1.jpg",
          type: "expense",
          category_name: "Food",
          name: "Lunch",
          value: 20000,
        },
        {
          id: 2,
          image_url: "image2.jpg",
          type: "expense",
          category_name: "Transportation",
          name: "Taxi",
          value: 15000,
        },
        // Add more transactions for Day 1 if needed
      ],
    },
    {
      date: new Date(2024, 3, 18), // Day 2
      total: 70000,
      transactions: [
        {
          id: 3,
          image_url: "image3.jpg",
          type: "expense",
          category_name: "Shopping",
          name: "Clothes",
          value: 30000,
        },
        {
          id: 4,
          image_url: "image4.jpg",
          type: "expense",
          category_name: "Food",
          name: "Dinner",
          value: 40000,
        },
        // Add more transactions for Day 2 if needed
      ],
    },
    {
      date: new Date(2024, 3, 16), // Day 3
      total: 60000,
      transactions: [
        {
          id: 5,
          image_url: "image5.jpg",
          type: "expense",
          category_name: "Entertainment",
          name: "Movie",
          value: 40000,
        },
        {
          id: 6,
          image_url: "image6.jpg",
          type: "expense",
          category_name: "Food",
          name: "Snacks",
          value: 20000,
        },
        // Add more transactions for Day 3 if needed
      ],
    },
  ];

  return (
    <ScrollView style={styles.containerSv}>
      <View style={styles.initReport}>
        <View style={styles.itemReport}>
          <Text style={styles.titleItemReport}>Opening balance </Text>
          <Text style={styles.valueItemReport}>2,000,000</Text>
        </View>
        <View style={styles.itemReport}>
          <Text style={styles.titleItemReport}>Total income </Text>
          <Text style={styles.valueItemReport}>4,000,000</Text>
        </View>
        <View style={styles.itemReport}>
          <Text style={styles.titleItemReport}>Total expense </Text>
          <Text style={styles.valueItemReport}>1,000,000</Text>
        </View>
        <View style={styles.itemReport}>
          <Text
            style={{
              fontSize: 13,
              color: COLORS.textColor3,
              fontFamily: "InterBold",
            }}
          >
            Ending balance
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: "#000000",
              fontFamily: "InterBold",
            }}
          >
            5,000,000
          </Text>
        </View>

        <View style={styles.btnReportView}>
          <TouchableOpacity style={styles.btnReport}>
            <Text style={styles.textBtnReport}>
              View report for this period
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {transactionListData.map((dayTransactions, index) => (
        <ListTransactionWithName
          key={index}
          listTransactions={dayTransactions}
        />
      ))}
    </ScrollView>
  );
};

export default TabContent;

const styles = StyleSheet.create({
  containerSv: {
    flex: 1,
    backgroundColor: "#F3F2F7",
  },
  initReport: {
    paddingHorizontal: 16,
    paddingTop: 25,
    paddingBottom: 20,
    backgroundColor: "white",
    marginBottom: 30,
  },
  itemReport: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  titleItemReport: {
    fontFamily: "InterSemiBold",
    fontSize: 13,
    color: COLORS.textColor3,
  },
  valueItemReport: {
    fontFamily: "InterSemiBold",
    fontSize: 13,
    color: "#000000",
  },
  btnReportView: {
    alignItems: "center",
    justifyContent: "center",
  },
  btnReport: {
    marginTop: 25,
    backgroundColor: COLORS.lightMainColor,
    paddingHorizontal: 20,
    paddingVertical: 9,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  textBtnReport: {
    color: COLORS.primary,
    fontFamily: "InterSemiBold",
  },
});
