import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { COLORS, icons } from "../../constants";
import DoubleBarChart from "../chart/DoubleBarChart";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import IconRadioTabs from "../../components/radio-tabs/IconRadioTabs";
import TransactionReportListByCategory from "../transaction/TransactionReportListByCategory";
import DonutChart from "../chart/DonutChart";
import DefaultTabContent from "./DefaultTabContent";
import { formatStardEndDate } from "../../function/FormatDateNumber";

const ExpenseContent = ({ content, typeApi }) => {
  const [apiExpenseReport, setApiExpenseReport] = useState();
  const [expenseReportCateg, setExpenseReportCateg] = useState();

  const [chartType, setChartType] = useState("bar");

  const listTabData = [
    { icon: <icons.barChart fill="#ABABAB" />, value: "bar" },
    { icon: <icons.pieChart fill="#ABABAB" />, value: "pie" },
  ];

  useEffect(() => {
    async function fetchReportExpense(walletId, startDate, endDate) {
      try {
        let { data, error } = await supabase
          .rpc("get_report_expense", {
            end_date: endDate,
            start_date: startDate,
            wallet_id: walletId,
          })
          .single();

        if (error) throw error;
        else setApiExpenseReport(data);
      } catch (error) {
        console.error(error);
      }
    }

    async function fetchReportExpenseCateg(walletId, startDate, endDate) {
      try {
        let { data, error } = await supabase.rpc(
          "get_report_expense_by_categ",
          {
            end_date: endDate,
            start_date: startDate,
            wallet_id: walletId,
          }
        );

        if (error) throw error;
        else
          setExpenseReportCateg(
            data.map((item) => ({
              ...item,
              total: Math.abs(Number(item.total)),
              transactions: item.transactions.map((transaction) => ({
                ...transaction,
                date: new Date(transaction.date),
              })),
            }))
          );
      } catch (error) {
        console.error(error);
      }
    }

    fetchReportExpense(content.walletId, content.startDate, content.endDate);
    fetchReportExpenseCateg(
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
      .subscribe();

    return () => {
      // Unsubscribe when the component unmounts
      channelsExpenseIncome.unsubscribe();
    };
  }, [content]);

  const dataChart = {
    height: 250,
    defaultColor: COLORS.expenseChart,
    list: apiExpenseReport?.periods
      ?.filter((item) => item.value !== null && item.value !== undefined)
      .map((item, index) => {
        return {
          name: formatStardEndDate(item.start_date, item.end_date),
          value: item.value,
        };
      }),
  };

  const dataPieChart = {
    height: 350,
    list: expenseReportCateg?.map((item) => ({
      name: item.category_name,
      image_url: item.image_url,
      value: item.total,
    })),
  };

  const defaultUI = (
    <DefaultTabContent
      imageUrl={require("../../assets/images/no_data.png")}
      title="No data to display"
    />
  );

  return apiExpenseReport?.total !== null ? (
    <ScrollView style={styles.containerSv}>
      <View style={styles.initReport}>
        <IconRadioTabs
          listTab={listTabData}
          defaultSelected={listTabData[0].value}
          setPeriodValue={setChartType}
        />
        <View
          style={{
            marginTop: 20,
            marginLeft: 12,
            flexDirection: "row",
            gap: 100,
          }}
        >
          <View>
            <Text style={styles.lTitleBox}>Total </Text>
            <Text style={styles.titleExpense}>
              {apiExpenseReport?.total?.toLocaleString("en-US", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })}
            </Text>
          </View>

          <View>
            <Text style={styles.lTitleBox}>Daily average </Text>
            <Text style={styles.titleExpense}>
              {apiExpenseReport?.daily_avg?.toLocaleString("en-US", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })}
            </Text>
          </View>
        </View>
      </View>

      {chartType === "bar" ? (
        <View style={{ marginTop: 10 }}>
          <View>
            {apiExpenseReport?.periods && <DoubleBarChart data={dataChart} />}
          </View>

          <View style={{ marginTop: 30 }}>
            {apiExpenseReport?.periods
              ?.filter(
                (item) => item.value !== null && item.value !== undefined
              )
              .map((item, index) => {
                return (
                  <View key={index}>
                    <View style={styles.separator} />
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingHorizontal: 17,
                        paddingVertical: 12,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "InterRegular",
                          fontSize: 15,
                        }}
                      >
                        {formatStardEndDate(item.start_date, item.end_date)}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 7,
                        }}
                      >
                        <Text
                          style={{
                            color: COLORS.expense,
                            fontFamily: "InterMedium",
                            fontSize: 15,
                          }}
                        >
                          {item?.value?.toLocaleString("en-US", {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2,
                          })}
                        </Text>
                        <icons.arrowRight
                          fill="#c0c0c2"
                          width={14}
                          height={14}
                        />
                      </View>
                    </View>
                  </View>
                );
              })}
          </View>
        </View>
      ) : (
        <View style={{ backgroundColor: "#F4F3F8" }}>
          <DonutChart data={dataPieChart} />

          <View style={styles.separator} />
          {expenseReportCateg?.map(
            (dayTransactions, index) => (
              <TransactionReportListByCategory
                key={index}
                data={dayTransactions}
                colorValue={COLORS.expense}
              />
            )
            // <Text>viewByCateg</Text>
          )}
        </View>
      )}
    </ScrollView>
  ) : (
    defaultUI
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
  separator: {
    height: 1.5,
    backgroundColor: "#EEEEF0",
    width: "100%",
    alignSelf: "center",
  },
});
