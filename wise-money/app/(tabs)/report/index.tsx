import React, { useState } from "react";
import { Stack, router, useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { icons, COLORS } from "../../../constants";
import MyBarChart from "../../../components/chart/MyBarChart";
import ReportItem from "../../../components/report/ReportItem";

const Page = () => {
  const barChartData_2month = {
    // title: "Monthly Sales",
    height: 300,
    list: [
      { name: "Last month", value: 1000000 },
      { name: "This month", value: 10898000 },

      // more data...
    ],
  };

  const router = useRouter();

  const handleRouter = (title) => {
    switch (title) {
      case "Expense vs Income":
        router.push("/report/incomeExpense");
        break;
      case "Expense":
        router.push("/report/expense");
        break;
      case "Income":
        router.push("/report/income");
        break;
      case "Debt":
        router.navigate({
          pathname: "/report/debtLoan",
          params: {
            typeTransaction: "debt",
          },
        });
        break;
      case "Loan":
        router.navigate({
          pathname: "/report/debtLoan",
          params: {
            typeTransaction: "loan",
          },
        });
        break;
    }
  };

  const reportItemData = [
    {
      title: "Expense vs Income",
      image_url: require("../../../assets/images/expense_income.png"),
    },
    {
      title: "Expense",
      image_url: require("../../../assets/images/expense.png"),
    },
    {
      title: "Income",
      image_url: require("../../../assets/images/income.png"),
    },
    {
      title: "Debt",
      image_url: require("../../../assets/images/debt.png"),
    },
    {
      title: "Loan",
      image_url: require("../../../assets/images/loan.png"),
    },
  ];
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.push("/search/food")}>
              <icons.searchIcon fill="white" />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <View style={{ marginLeft: 0 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "InterSemiBold",
                  color: "white",
                }}
              >
                Report
              </Text>
            </View>
          ),
          // headerRight: () => (
          //   <View style={{ flexDirection: "row", gap: 12 }}>
          //     <icons.share2 />
          //     {/* <TouchableOpacity>
          //       <icons.calendar fill="white" />
          //     </TouchableOpacity> */}
          //   </View>
          // ),
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerShadowVisible: false,
          headerTitleAlign: "center",
        }}
      />

      {/* <ScrollView style={styles.containerSv}>
        <View style={styles.initReport}>
          <View style={styles.itemReport}>
            <Text style={styles.titleItemReport}>Opening balance </Text>
            <Text style={styles.valueItemReport}>2,000,000</Text>
          </View>

          <View style={styles.itemReport}>
            <Text style={styles.titleItemReport}>Ending balance</Text>
            <Text style={styles.valueItemReport}>5,000,000</Text>
          </View>
        </View>

        <View style={styles.initReport}>
          <View style={styles.titleBox}>
            <Text style={styles.lTitleBox}>Expense vs Income</Text>
            <TouchableOpacity
              onPress={() => handleRouter("/report/incomeExpense")}
            >
              <Text style={styles.rTitleBox}>See details</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Text style={styles.titleExpense}>7,000,000 </Text>
            <Text style={styles.titleIncome}>2,000,000 </Text>
          </View>

          <MyBarChart data={barChartData_2month} />
        </View>

        <View style={styles.initReport}>
          <View style={styles.titleBox}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Text style={styles.lTitleBox}>Expense</Text>
              <Text style={styles.titleExpense}>7,000,000 </Text>
            </View>

            <TouchableOpacity onPress={() => handleRouter("/report/expense")}>
              <Text style={styles.rTitleBox}>See details</Text>
            </TouchableOpacity>
          </View>

          <MyBarChart data={barChartData_2month} />
        </View>

        <View style={styles.initReport}>
          <View style={styles.titleBox}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Text style={styles.lTitleBox}>Income</Text>
              <Text style={styles.titleIncome}>2,000,000 </Text>
            </View>
            <TouchableOpacity onPress={() => handleRouter("/report/income")}>
              <Text style={styles.rTitleBox}>See details</Text>
            </TouchableOpacity>
          </View>

          <MyBarChart data={barChartData_2month} />
        </View>
      </ScrollView> */}

      <ScrollView style={styles.containerSv}>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            paddingHorizontal: 12,
            paddingVertical: 15,
          }}
        >
          {reportItemData.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                width: "48%", // Adjust width to ensure 2 items per row with some spacing
                marginBottom: 15,
              }}
              onPress={() => handleRouter(item.title)}
            >
              <ReportItem imageUrl={item.image_url} title={item.title} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerSv: {
    flex: 1,
    backgroundColor: "#F3F2F7",
  },
  initReport: {
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
  titleItemReport: {
    fontSize: 13,
    color: COLORS.textColor3,
    fontFamily: "InterBold",
  },
  valueItemReport: {
    fontSize: 13,
    color: "#000000",
    fontFamily: "InterBold",
  },

  titleBox: {
    flexDirection: "row",
    justifyContent: "space-between",
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

export default Page;
