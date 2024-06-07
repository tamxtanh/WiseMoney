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

const DebtLoanContent = ({ content, typeApi }) => {
  const [transacList, setTransacList] = useState(null);

  useEffect(() => {
    async function fetchDebtsDataByTime(walletId, startDate, endDate) {
      try {
        let { data, error } = await supabase.rpc(
          "get_debt_transactions_by_dates",
          {
            end_date: endDate,
            start_date: startDate,
            wallet_id: walletId,
          }
        );

        if (error) throw error;
        else
          setTransacList(
            data.map((item) => ({
              ...item,
              date: new Date(item.date),
              total: Number(item.total),
            }))
          );
      } catch (error) {
        console.error(error);
      }
    }

    async function fetchLoansDataByTime(walletId, startDate, endDate) {
      try {
        let { data, error } = await supabase.rpc(
          "get_loan_transactions_by_dates",
          {
            end_date: endDate,
            start_date: startDate,
            wallet_id: walletId,
          }
        );

        if (error) throw error;
        else
          setTransacList(
            data.map((item) => ({
              ...item,
              date: new Date(item.date),
              total: Number(item.total),
            }))
          );
      } catch (error) {
        console.error(error);
      }
    }

    if (typeApi === "debt") {
      fetchDebtsDataByTime(
        content.walletId,
        content.startDate,
        content.endDate
      );
    } else if (typeApi === "loan") {
      fetchLoansDataByTime(
        content.walletId,
        content.startDate,
        content.endDate
      );
    }

    const channelsExpense = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Debt" },
        (payload) => {
          console.log("Change received!", payload);
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Loan" },
        (payload) => {
          console.log("Change received!", payload);
        }
      )
      .subscribe();

    return () => {
      // Unsubscribe when the component unmounts
      channelsExpense.unsubscribe();
    };
  }, [typeApi, content]);

  const defaultUI = (
    <DefaultTabContent
      imageUrl={require("../../assets/images/no_data.png")}
      title="No data to display"
    />
  );

  return transacList?.length > 0 ? (
    <ScrollView style={styles.containerSv}>
      {transacList?.map((dayTransactions, index) => (
        <ListTransactionWithName
          key={index}
          listTransactions={dayTransactions}
        />
      ))}
    </ScrollView>
  ) : (
    defaultUI
  );
};

export default DebtLoanContent;

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
