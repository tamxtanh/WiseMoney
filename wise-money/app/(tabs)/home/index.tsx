import { Stack, useRouter } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

import TransactionWithDate from "../../../components/transaction/TransactionWithDate";
import TransactionWithPercentage from "../../../components/transaction/TransactionWithPercentage";
import HomeChart from "../../../components/chart/HomeChart";
import { icons, COLORS, SIZES } from "../../../constants";
import RadioTabList from "../../../components/home/radioTabList";
import { useEffect, useState } from "react";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import SupabaseSingleton from "../../../lib/supabaseSingleton";
import MyBarChart from "../../../components/chart/MyBarChart";
import { useKeyboard } from "../../../context/KeyboardContext";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

export default function Page() {
  const supabase = SupabaseSingleton.getInstance().getClient();

  const [recentTransacList, setRecentTransacList] = useState([]);
  const [periodValue, setPeriodValue] = useState("month");
  const [topSpending, setTopSpending] = useState();
  const [showBalance, setShowBalance] = useState(true);
  const [percentageIncrease, setPercentageIncrease] = useState(-25);
  const [totalBalance, setTotalBalance] = useState();
  const [userNameText, setUserNameText] = useState();

  const { userId, walletId } = useKeyboard();

  const router = useRouter();

  const [dataChart, setDataChart] = useState({
    height: 250,
    defaultColor: COLORS.expenseChart,
    list: [
      {
        name: "Last month",
        value: 10000,
      },
      { name: "This month", value: 50000 },
    ],
  });

  const listTabData = [
    { title: "Week", value: "week" },
    { title: "Month", value: "month" },
  ];

  const addCommasToNumber = (number) => {
    return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const getRecentTransaction = async (walletId, quantily) => {
    try {
      let { data, error } = await supabase.rpc("get_recent_transactions", {
        transaction_limit: quantily,
        wallet_id: walletId,
      });
      if (error) console.error(error);
      else {
        setRecentTransacList(
          data.map((item) => ({
            ...item,
            date: new Date(item.date),
          }))
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getPeriodExpenseSummary = async (
    typePeriod,
    quantityTransaction,
    walletId
  ) => {
    try {
      let { data, error } = await supabase.rpc("get_period_expense_summary", {
        quantity: quantityTransaction,
        type: typePeriod,
        walletid: walletId,
      });
      if (error) throw error;
      else {
        setTopSpending(data?.top_transactions);
        setDataChart((prev) => ({
          ...prev,
          list: prev.list.map((item, index) => ({
            ...item,
            name: index === 0 ? `Last ${typePeriod}` : `This ${typePeriod}`,
            value:
              index === 0
                ? data?.last_period_total
                : data?.current_period_total,
          })),
        }));
        setPercentageIncrease(Number(data?.percentage_increase));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getTotalBalance = async (walletId) => {
    try {
      let { data, error } = await supabase.rpc("get_total_balance", {
        wallet_id: walletId,
      });
      if (error) throw error;
      else {
        setTotalBalance(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getUserName = async (userId) => {
    try {
      let { data: User, error } = await supabase
        .from("User")
        .select("username")
        .eq("id", userId)
        .single();

      if (error) throw error;
      else {
        setUserNameText(User.username);
      }
    } catch (error) { }
  };

  const fetchData = useCallback(() => {
    getRecentTransaction(1, 5);

    getTotalBalance(1);

    getUserName(1);

    const channelsExpense = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Expense" },
        async (payload) => {
          console.log("Change received in Expense!", payload);
          // await getRecentTransaction(walletId, 5);
          // await getTotalBalance(walletId);
          await getRecentTransaction(1, 5);
          await getTotalBalance(1);
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Income" },
        async (payload) => {
          console.log("Change received in Income!", payload);
          // await getRecentTransaction(walletId, 5);
          // await getTotalBalance(walletId);
          await getRecentTransaction(1, 5);
          await getTotalBalance(1);
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Debt" },
        async (payload) => {
          console.log("Change received in Debt!", payload);
          // await getRecentTransaction(walletId, 5);
          // await getTotalBalance(walletId);
          await getRecentTransaction(1, 5);
          await getTotalBalance(1);
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Loan" },
        async (payload) => {
          console.log("Change received in Loan!", payload);
          // await getRecentTransaction(walletId, 5);
          // await getTotalBalance(walletId);
          await getRecentTransaction(1, 5);
          await getTotalBalance(1);
        }
      )
      .subscribe();

    return () => {
      channelsExpense.unsubscribe();
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  const fetchExpenseSummary = useCallback(() => {
    getPeriodExpenseSummary(periodValue, 3, 1);

    const channelsExpense = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Expense" },
        async (payload) => {
          console.log("Change received!", payload);
          //await getPeriodExpenseSummary(periodValue, 3, walletId);
          await getPeriodExpenseSummary(periodValue, 3, 1);
        }
      )
      .subscribe();

    return () => {
      // Unsubscribe when the component unmounts
      channelsExpense.unsubscribe();
    };
  }, [periodValue]);

  useFocusEffect(
    useCallback(() => {
      fetchExpenseSummary();
    }, [fetchExpenseSummary])
  );

  // useEffect(() => {
  //   // getRecentTransaction(walletId, 5);

  //   // getTotalBalance(walletId);

  //   // getUserName(userId);

  //   getRecentTransaction(1, 5);

  //   getTotalBalance(1);

  //   getUserName(1);

  //   const channelsExpense = supabase
  //     .channel("custom-all-channel")
  //     .on(
  //       "postgres_changes",
  //       { event: "*", schema: "public", table: "Expense" },
  //       async (payload) => {
  //         console.log("Change received in Expense!", payload);
  //         // await getRecentTransaction(walletId, 5);
  //         // await getTotalBalance(walletId);
  //         await getRecentTransaction(1, 5);
  //         await getTotalBalance(1);
  //       }
  //     )
  //     .on(
  //       "postgres_changes",
  //       { event: "*", schema: "public", table: "Income" },
  //       async (payload) => {
  //         console.log("Change received in Income!", payload);
  //         // await getRecentTransaction(walletId, 5);
  //         // await getTotalBalance(walletId);
  //         await getRecentTransaction(1, 5);
  //         await getTotalBalance(1);
  //       }
  //     )
  //     .on(
  //       "postgres_changes",
  //       { event: "*", schema: "public", table: "Debt" },
  //       async (payload) => {
  //         console.log("Change received in Debt!", payload);
  //         // await getRecentTransaction(walletId, 5);
  //         // await getTotalBalance(walletId);
  //         await getRecentTransaction(1, 5);
  //         await getTotalBalance(1);
  //       }
  //     )
  //     .on(
  //       "postgres_changes",
  //       { event: "*", schema: "public", table: "Loan" },
  //       async (payload) => {
  //         console.log("Change received in Loan!", payload);
  //         // await getRecentTransaction(walletId, 5);
  //         // await getTotalBalance(walletId);
  //         await getRecentTransaction(1, 5);
  //         await getTotalBalance(1);
  //       }
  //     )
  //     .subscribe();

  //   return () => {
  //     channelsExpense.unsubscribe();
  //   };
  // }, []);

  useEffect(() => {
    //getPeriodExpenseSummary(periodValue, 3, walletId);
    getPeriodExpenseSummary(periodValue, 3, 1);

    const channelsExpense = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Expense" },
        async (payload) => {
          console.log("Change received!", payload);
          //await getPeriodExpenseSummary(periodValue, 3, walletId);
          await getPeriodExpenseSummary(periodValue, 3, 1);
        }
      )
      .subscribe();

    return () => {
      // Unsubscribe when the component unmounts
      channelsExpense.unsubscribe();
    };
  }, [periodValue]);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: "",
          headerLeft: () => (
            <View style={{ marginLeft: 0 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "InterSemiBold",
                  color: "white",
                }}
              >
                Hi {userNameText}
              </Text>
            </View>
          ),
          headerRight: () => (
            <>
              {/* <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => router.push("/search/food")}
              >
                <icons.searchIcon fill="white" />
              </TouchableOpacity> */}
              <TouchableOpacity onPress={() => router.push("/notification")}>
                <icons.notification fill="white" />
              </TouchableOpacity>
            </>
          ),
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerShadowVisible: false,
        }}
      />
      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.totalBalance}>
          <View style={styles.balanceBox}>
            <View style={styles.leftBalanceBox}>
              <View style={styles.topTileBalance}>
                <Text style={styles.titleBalance}>Total balance</Text>
                <icons.arrowForward fill={COLORS.textColor3} />
              </View>
              <Text style={styles.valueBalance}>
                {" "}
                {showBalance ? addCommasToNumber(totalBalance) : "***00"}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setShowBalance(!showBalance)}
              style={styles.rightBalanceBox}
            >
              {showBalance ? (
                <icons.visibility fill={COLORS.textColor3} />
              ) : (
                <icons.visibilityOff fill={COLORS.textColor3} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.spendingReport}>
          <View style={styles.titleBox}>
            <Text style={styles.lTitleBox}>Spending Report</Text>
            {/* <TouchableOpacity>
              <Text style={styles.rTitleBox}>See reports</Text>
            </TouchableOpacity> */}
          </View>

          <View style={styles.tabsSpReport}>
            <View style={{ marginHorizontal: 28 }}>
              <RadioTabList
                listTab={listTabData}
                defaultSelected={listTabData[1].title}
                setPeriodValue={setPeriodValue}
              />
            </View>
            <Text
              style={{
                fontFamily: "InterSemiBold",
                fontSize: 18,
                marginTop: 10,
              }}
            >
              {/* {dataChart?.list[1]?.value.toLocaleString("en-US", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })} */}
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 7,
                marginTop: 3,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "InterMedium",
                  color: COLORS.textColor3,
                }}
              >
                Total spent this {periodValue}
              </Text>
              <View></View>
              <View
                style={{
                  width: 17,
                  height: 17,
                  borderRadius: 20,
                  backgroundColor: "#EFEFEF",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {percentageIncrease > 0 ? (
                  <icons.arrowUp fill={COLORS.expense} />
                ) : (
                  <icons.arrowDown fill={COLORS.primary} />
                )}
              </View>
              <Text
                style={{
                  marginLeft: -5,
                  fontSize: 14,
                  fontFamily: "InterSemiBold",
                  color:
                    percentageIncrease > 0 ? COLORS.expense : COLORS.primary,
                }}
              >
                {Math.abs(percentageIncrease)}%
              </Text>
            </View>

            <View
              style={{
                justifyContent: "center",
                backgroundColor: "white",
                position: "relative",
              }}
            >
              {/* <HomeChart data={dataChart} /> */}
              <View
                style={{
                  height: 1,
                  backgroundColor: "#EEEEF0",
                  width: "90%",
                  alignSelf: "center",
                  position: "absolute",
                  bottom: 29,
                }}
              ></View>
            </View>
          </View>
          {/* <View style={styles.topSpReport}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "InterSemiBold",
                color: COLORS.textColor3,
              }}
            >
              Top spending
            </Text>
            <View style={styles.listTopSpReport}>
              {topSpending?.map((item, index) => (
                <TransactionWithPercentage key={index} transaction={item} />
              ))}
            </View>
          </View> */}
        </View>
        <View style={styles.recentTransactions}>
          <View style={styles.titleBox}>
            <Text style={styles.lTitleBox}>Recent transactions</Text>
            {/* <TouchableOpacity>
              <Text style={styles.rTitleBox}>See all</Text>
            </TouchableOpacity> */}
          </View>
          <View style={styles.listReTrans}>
            {recentTransacList?.map((item, index) => (
              <TransactionWithDate key={index} transaction={item} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9E9E9",
    marginBottom: SIZES.heightBottomNavigation,
  },
  totalBalance: {
    backgroundColor: COLORS.primary,
    paddingBottom: 18,
    paddingTop: 10,
    paddingHorizontal: 18,
  },
  contentBalance: {
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  balanceBox: {
    borderRadius: 9,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 18,
  },
  leftBalanceBox: {},
  topTileBalance: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  titleBalance: {
    fontSize: 14,
    fontFamily: "InterRegular",
    color: COLORS.textColor3,
    marginTop: -3,
    marginRight: 5,
  },
  valueBalance: {
    fontSize: 27,
    fontFamily: "InterBold",
    color: COLORS.primary,
    marginLeft: -5,
  },
  rightBalanceBox: {},
  spendingReport: {
    backgroundColor: "white",
    paddingHorizontal: 25,
    paddingVertical: 18,
  },
  titleBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  lTitleBox: {
    fontSize: 14,
    fontFamily: "InterSemiBold",
    color: "#000000",
  },
  rTitleBox: {
    fontSize: 14,
    fontFamily: "InterMedium",
    color: COLORS.primary,
  },
  recentTransactions: {
    marginTop: 10,
    backgroundColor: "white",
    paddingHorizontal: 25,
    paddingTop: 18,
    paddingBottom: 8,
    marginBottom: 10,
  },

  tabsSpReport: {
    marginVertical: 12,
  },
  scrollViewContainer: {
    // marginBottom: 62,
  },
  listReTrans: {
    flex: 1,
  },
});
