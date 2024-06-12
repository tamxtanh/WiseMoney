import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { COLORS, SIZES } from "../../constants";
import TransactionListWithDateWithoutImage from "../transaction/TransactionListWithDateWithoutImage";
import ListTransactionWithName from "../transaction/TransactionListWithName";
import { useState, useEffect } from "react";
import { err } from "react-native-svg";
import { supabase } from "../../lib/supabase";
import DefaultTabContent from "./DefaultTabContent";

const TabContent = ({ transactionList, typeApi }) => {
  const defaultUI = (
    <DefaultTabContent
      imageUrl={require("../../assets/images/transactional.png")}
      title={
        <>
          Tap <Text style={{ fontSize: 24, color: COLORS.textColor2 }}>+</Text>{" "}
          to add one
        </>
      }
    />
  );

  if (typeApi === "viewByTransac") {
    return transactionList?.length > 0 ? (
      <ScrollView style={styles.containerSv}>
        {transactionList?.map((dayTransactions, index) => (
          <ListTransactionWithName
            key={index}
            listTransactions={dayTransactions}
          />
        ))}
      </ScrollView>
    ) : (
      defaultUI
    );
  } else if (typeApi === "viewByCateg") {
    return transactionList?.length > 0 ? (
      <ScrollView style={styles.containerSv}>
        {transactionList?.map((dayTransactions, index) => (
          <TransactionListWithDateWithoutImage
            key={index}
            data={dayTransactions}
          />
        ))}
      </ScrollView>
    ) : (
      defaultUI
    );
  }
};

export default TabContent;

const styles = StyleSheet.create({
  containerSv: {
    paddingTop: 5,
    flex: 1,
    backgroundColor: "#F3F2F7",
    marginBottom: SIZES.heightBottomNavigation,
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
