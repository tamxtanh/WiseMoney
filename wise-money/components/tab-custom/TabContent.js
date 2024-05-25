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

const TabContent = ({ content, typeApi }) => {
  const [transacDateList, setTransacDateList] = useState(null);
  const [transacCategList, setTransacCategList] = useState(null);
  useEffect(() => {
    async function fetchDataByTime(walletId, startDate, endDate) {
      try {
        let { data, error } = await supabase.rpc("get_transactions_by_dates", {
          end_date: endDate,
          start_date: startDate,
          wallet_id: walletId,
        });

        if (error) throw error;
        else
          setTransacDateList(
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

    async function fetchDataByCategory(walletId, startDate, endDate) {
      try {
        let { data, error } = await supabase.rpc("get_transactions_by_categ", {
          end_date: endDate,
          start_date: startDate,
          wallet_id: walletId,
        });

        if (error) throw error;
        else
          setTransacCategList(
            data.map((item) => ({
              ...item,
              total: Number(item.total),
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

    if (typeApi === "viewByTransac") {
      fetchDataByTime(content.walletId, content.startDate, content.endDate);
    } else if (typeApi === "viewByCateg") {
      fetchDataByCategory(content.walletId, content.startDate, content.endDate);
    }

    const channelsExpense = supabase
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
      channelsExpense.unsubscribe();
    };
  }, [typeApi, content]);

  // console.log(
  //   "transactionListData",
  //   transactionListData ? transactionListData[0]?.date : "none"
  // );
  // console.log("transactionListData", transactionListData);

  if (typeApi === "viewByTransac") {
    return transacDateList?.length > 0 ? (
      <ScrollView style={styles.containerSv}>
        {/* <View style={styles.initReport}>
          <View style={styles.itemReport}>
            <Text style={styles.titleItemReport}>Opening balance </Text>
            <Text style={styles.valueItemReport}>2,000,000</Text>
          </View>
          <View style={styles.itemReport}>
            <Text style={styles.titleItemReport}>Inflow </Text>
            <Text style={styles.valueItemReport}>4,000,000</Text>
          </View>
          <View style={styles.itemReport}>
            <Text style={styles.titleItemReport}>Outflow </Text>
            <Text style={styles.valueItemReport}>1,000,000</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              paddingVertical: 5,
            }}
          >
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

                textAlign: "right",
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
        </View> */}
        {transacDateList?.map(
          (dayTransactions, index) => (
            <ListTransactionWithName
              key={index}
              listTransactions={dayTransactions}
            />
          )
          // <Text>viewByTransac</Text>
        )}
      </ScrollView>
    ) : (
      <View
        style={{
          flex: 1,
          backgroundColor: "#F3F2F7",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            marginTop: -100,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{ width: 70, height: 70 }}
            source={require("../../assets/images/transactional.png")}
          />
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              fontFamily: "InterRegular",
              color: COLORS.textColor1,
            }}
          >
            Tap{" "}
            <Text style={{ fontSize: 24, color: COLORS.textColor2 }}>+</Text> to
            add one
          </Text>
        </View>
      </View>
    );
  } else if (typeApi === "viewByCateg") {
    return transacCategList?.length > 0 ? (
      <ScrollView style={styles.containerSv}>
        {/* <View style={styles.initReport}>
          <View style={styles.itemReport}>
            <Text style={styles.titleItemReport}>Opening balance </Text>
            <Text style={styles.valueItemReport}>2,000,000</Text>
          </View>
          <View style={styles.itemReport}>
            <Text style={styles.titleItemReport}>Inflow </Text>
            <Text style={styles.valueItemReport}>4,000,000</Text>
          </View>
          <View style={styles.itemReport}>
            <Text style={styles.titleItemReport}>Outflow </Text>
            <Text style={styles.valueItemReport}>1,000,000</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              paddingVertical: 5,
            }}
          >
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

                textAlign: "right",
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
        </View> */}
        {transacCategList?.map(
          (dayTransactions, index) => (
            <TransactionListWithDateWithoutImage
              key={index}
              data={dayTransactions}
            />
          )
          // <Text>viewByCateg</Text>
        )}
      </ScrollView>
    ) : (
      <View
        style={{
          flex: 1,
          backgroundColor: "#F3F2F7",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            marginTop: -100,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{ width: 70, height: 70 }}
            source={require("../../assets/images/transactional.png")}
          />
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              fontFamily: "InterRegular",
              color: COLORS.textColor1,
            }}
          >
            Tap{" "}
            <Text style={{ fontSize: 24, color: COLORS.textColor2 }}>+</Text> to
            add one
          </Text>
        </View>
      </View>
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
