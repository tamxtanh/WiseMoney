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

const ExpenseIncomeContent = ({ content, typeApi }) => {
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
        <DoubleBarChart data={dataChart} />

        <View style={styles.initReport}>
          <View style={styles.itemReport}>
            <Text style={styles.lTitleBox}>Income </Text>
            <Text style={styles.titleExpense}>
              {dataChart.list[1].value
                ? dataChart.list[1].value?.toLocaleString("en-US", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  })
                : "None"}
            </Text>
          </View>

          <View style={styles.itemReport}>
            <Text style={styles.lTitleBox}>Expense</Text>
            <Text style={styles.titleIncome}>
              {dataChart.list[0].value
                ? dataChart.list[0].value?.toLocaleString("en-US", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  })
                : "None"}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <View>
              <View
                style={{
                  height: 1.5,
                  backgroundColor: "#F3F2F7",
                }}
              ></View>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 18,
                  color: "#000000",
                  fontFamily: "InterSemiBold",
                }}
              >
                {(
                  dataChart.list[1].value - dataChart.list[0].value
                ).toLocaleString("en-US", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ExpenseIncomeContent;

const styles = StyleSheet.create({
  containerSv: {
    flex: 1,
    backgroundColor: "#F3F2F7",
  },
  initReport: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 15,
    backgroundColor: "white",
    marginBottom: 18,
  },
  itemReport: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 3,
  },
  lTitleBox: {
    fontSize: 15,
    fontFamily: "InterSemiBold",
    color: "#000000",
  },
  rTitleBox: {
    fontSize: 13,
    fontFamily: "InterMedium",
    color: COLORS.primary,
  },
  titleExpense: {
    color: COLORS.expense,
    fontFamily: "InterSemiBold",
  },
  titleIncome: {
    color: COLORS.income,
    fontFamily: "InterSemiBold",
  },
});
