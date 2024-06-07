import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { COLORS, icons, FONT } from "../../constants";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import TransactionReportListByCategory from "../transaction/TransactionReportListByCategory";
import DonutChart from "../chart/DonutChart";
import DefaultTabContent from "./DefaultTabContent";
import { Icon } from "react-native-elements";

const SuggestionContent = ({ content, typeApi }) => {
  const [suggestionSumary, setSuggestionSumary] = useState();
  const [topExpenseData, setTopExpenseData] = useState();

  useEffect(() => {
    async function fetchSuggestionSummary(walletId, startDate, endDate) {
      try {
        let { data, error } = await supabase
          .rpc("get_summary_suggestion", {
            end_date: endDate,
            start_date: startDate,
            wallet_id: walletId,
          })
          .single();

        if (error) throw error;
        else setSuggestionSumary(data);
      } catch (error) {
        console.error(error);
      }
    }

    async function fetchTopExpenseCateg(
      walletId,
      startDate,
      endDate,
      topQuantity
    ) {
      try {
        let { data, error } = await supabase.rpc("get_top_expense_by_categ", {
          end_date: endDate,
          quality_top: topQuantity,
          start_date: startDate,
          wallet_id: walletId,
        });

        if (error) throw error;
        else {
          setTopExpenseData(
            data?.map((item) => ({
              ...item,
              total: Math.abs(Number(item.total)),
              transactions: item.transactions
                ? item.transactions.map((transaction) => ({
                    ...transaction,
                    date: new Date(transaction.date),
                  }))
                : [],
            }))
          );
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchSuggestionSummary(
      content.walletId,
      content.startDate,
      content.endDate
    );

    fetchTopExpenseCateg(
      content.walletId,
      content.startDate,
      content.endDate,
      4
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

  const dataPieChart = {
    height: 350,
    list: topExpenseData?.map((item) => ({
      name: item.category_name,
      image_url: item.image_url,
      value: item.total,
    })),
  };

  const defaultUI = (
    <DefaultTabContent
      imageUrl={require("../../assets/images/no_data.png")}
      title="No target data to suggest"
    />
  );

  const summarySuggestionUI = (
    <View style={styles.initReport}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.lTitleBox}>Total target </Text>
        <Text style={styles.titleTarget}>
          {suggestionSumary?.total_target?.toLocaleString("en-US", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })}
        </Text>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.lTitleBox}>Total income </Text>
        <Text style={styles.titleIncome}>
          {(suggestionSumary?.total_income ?? 0).toLocaleString("en-US", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })}
        </Text>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.lTitleBox}>Total expense </Text>
        <Text style={styles.titleExpense}>
          {(suggestionSumary?.total_expense ?? 0).toLocaleString("en-US", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 5,
          paddingVertical: 10,
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
          }}
        >
          <Text style={styles.rcmTitle}>Actual expense </Text>
          <Text style={styles.titleExpense}>
            {(suggestionSumary?.actual_day ?? 0).toLocaleString("en-US", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}
            {" per day"}
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
          }}
        >
          <Text style={styles.rcmTitle}>Recommend spend </Text>
          <Text style={styles.titleExpense}>
            {(suggestionSumary?.suggest_per_day ?? 0).toLocaleString("en-US", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}
            {" per day"}
          </Text>
        </View>
      </View>
      {suggestionSumary?.actual_day > suggestionSumary?.suggest_per_day ? (
        <View
          style={{
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{
              fontFamily: "InterRegular",
              fontSize: 14,
              lineHeight: 25,
              textAlign: "justify",
            }}
          >
            To achieve the target, you need to reduce spending on{" "}
            <Text style={{ fontFamily: FONT.semiBold, fontSize: 16 }}>
              {topExpenseData
                ?.filter((item) => item.category_name !== "Other")
                .map((item) => item.category_name)
                .join(", ")}
            </Text>
          </Text>
        </View>
      ) : (
        <View
          style={{
            paddingHorizontal: 20,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Icon
            name="thumbs-up"
            type="font-awesome"
            size={20}
            color="#FFB300"
          />
          <Text
            style={{
              fontFamily: "InterRegular",
              fontSize: 14,
              lineHeight: 25,
              textAlign: "center",
            }}
          >
            Great job! Your spending is within the recommended amount
          </Text>
        </View>
      )}
    </View>
  );

  return suggestionSumary?.total_target > 0 ? (
    topExpenseData?.length > 0 ? (
      <ScrollView style={styles.containerSv}>
        {summarySuggestionUI}

        <View style={{ backgroundColor: "#F4F3F8" }}>
          <DonutChart data={dataPieChart} />

          <View style={styles.separator} />
          {topExpenseData?.map((dayTransactions, index) => (
            <TransactionReportListByCategory
              key={index}
              data={dayTransactions}
              colorValue={COLORS.expense}
            />
          ))}
        </View>
      </ScrollView>
    ) : (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          gap: 100,
        }}
      >
        {summarySuggestionUI}

        <DefaultTabContent
          backgroundColor="White"
          imageUrl={require("../../assets/images/no_data.png")}
          title="No expense data to display"
        />
      </View>
    )
  ) : (
    defaultUI
  );
};

export default SuggestionContent;

const styles = StyleSheet.create({
  containerSv: {
    flex: 1,
    backgroundColor: "white",
  },
  initReport: {
    paddingHorizontal: 16,
    paddingVertical: 15,
    backgroundColor: "white",
    gap: 10,
    // marginBottom: 18,
  },

  lTitleBox: {
    fontSize: 15,
    fontFamily: "InterSemiBold",
    color: "#000000",
  },
  rcmTitle: {
    fontSize: 15,
    fontFamily: "InterSemiBold",
    color: COLORS.textColor3,
  },
  titleExpense: {
    color: COLORS.expense,
    fontFamily: "InterSemiBold",
  },
  titleIncome: {
    color: COLORS.income,
    fontFamily: "InterSemiBold",
  },
  titleTarget: {
    color: COLORS.greenTarget,
    fontFamily: "InterSemiBold",
  },
  separator: {
    height: 1.5,
    backgroundColor: "#EEEEF0",
    width: "100%",
    alignSelf: "center",
  },
});
