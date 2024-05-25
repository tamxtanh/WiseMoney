import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { COLORS } from "../../constants";
import DoubleBarChart from "../chart/DoubleBarChart";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

const ExpenseContent = ({ content, typeApi }) => {
  const [dataChart, setDataChart] = useState({
    height: 250,
    defaultColor: COLORS.expenseChart,
    list: [
      {
        name: "Expense",
        value: 10000,
        svg: {
          fill: COLORS.expense,
        },
      },
      {
        name: "Income",
        value: 50000,
        svg: {
          fill: COLORS.income,
        },
      },
    ],
  });

  useEffect(() => {
    async function fetchReportExpenseIncome(walletId, startDate, endDate) {
      try {
        let { data, error } = await supabase
          .rpc("get_report_income_expense", {
            enddate: endDate,
            startdate: startDate,
            walletid: walletId,
          })
          .single();

        if (error) throw error;
        else
          setDataChart((prev) => ({
            ...prev,
            list: prev.list.map((item, index) => ({
              ...item,
              value: index === 0 ? data?.total_expense : data?.total_income,
            })),
          }));
      } catch (error) {
        console.error(error);
      }
    }

    fetchReportExpenseIncome(
      content.walletId,
      content.startDate,
      content.endDate
    );

    const channelsExpenseIncome = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Expense" },
        (payload) => {
          console.log("Change received!", payload);
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Income" },
        (payload) => {
          console.log("Change received!", payload);
        }
      )
      .subscribe();

    return () => {
      // Unsubscribe when the component unmounts
      channelsExpenseIncome.unsubscribe();
    };
  }, [content]);

  return (
    <ScrollView style={styles.containerSv}>
      <View style={styles.initReport}>
        <View style={{ flexDirection: "row", gap: 100 }}>
          <View>
            <Text style={styles.lTitleBox}>Total </Text>
            <Text style={styles.titleExpense}>7,000,000 </Text>
          </View>

          <View>
            <Text style={styles.lTitleBox}>Daily average </Text>
            <Text style={styles.titleExpense}>7,000,000 </Text>
          </View>
        </View>
        <DoubleBarChart data={dataChart} />
      </View>
    </ScrollView>
  );
};

export default ExpenseContent;

const styles = StyleSheet.create({
  containerSv: {
    flex: 1,
    backgroundColor: "white",
  },
  initReport: {
    paddingHorizontal: 16,
    paddingVertical: 15,
    backgroundColor: "white",
    // marginBottom: 18,
  },

  lTitleBox: {
    fontSize: 15,
    fontFamily: "InterSemiBold",
    color: "#000000",
  },
  titleExpense: {
    color: COLORS.expense,
    fontFamily: "InterSemiBold",
  },
});
