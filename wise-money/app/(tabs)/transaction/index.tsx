import React, { useState, useMemo, useEffect } from "react";
import { Stack, router } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import { icons, COLORS } from "../../../constants";
import CustomTabBarTransaction from "../../../components/tab-custom/CustomTabBarTransaction";
import TabContent from "../../../components/tab-custom/TabContent";
import DateRangePicker from "../../../components/modal-calendar/DateRangePicker";
import {
  generateDateList,
  generateWeekList,
  generateMonthList,
  generateCustomNestedTabs,
} from "../../../components/transaction-function/generateListTab";
import TransactionPopup from "../../../components/modal-popUp/TransactionPopup";
import TimRangePopup from "../../../components/modal-popUp/TimRangePopup";
import { supabase } from "../../../lib/supabase";

const Page = () => {
  const [popupOption, setPopupOption] = useState("viewByTransac");
  const [rangeOption, setRangeOption] = useState("month");
  const [customStartDate, setCustomStartDate] = useState(new Date());
  const [customEndDate, setCustomEndDate] = useState(new Date());

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isTimeRangeVisible, setIsTimeRangeVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCustomRange, setIsCustomRange] = useState(null);

  const openPopup = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const openTimeRange = () => {
    setIsTimeRangeVisible(true);
  };

  const closeTimeRange = () => {
    setIsTimeRangeVisible(false);
  };

  const closeRangeCustom = () => {
    setIsCustomRange(false);
  };
  const openRangeCustom = () => {
    setIsCustomRange(true);
  };

  const handleOpenTimeRange = () => {
    closePopup();
    openTimeRange();
  };

  const handleOpenCustomRange = () => {
    closeTimeRange();
    openRangeCustom();
  };

  const currentDate = new Date();

  const [nestedTabs, setNestedTabs] = useState(generateMonthList(currentDate));

  const generateTablist = (option) => {
    switch (option) {
      case "day":
        setNestedTabs(generateDateList(currentDate));
        break;
      case "week":
        setNestedTabs(generateWeekList(currentDate));
        break;
      case "month":
        setNestedTabs(generateMonthList(currentDate));
        break;
      case "custom":
        setNestedTabs(generateCustomNestedTabs(customStartDate, customEndDate));
        break;
      default:
        setNestedTabs(generateMonthList(currentDate));
        break;
    }
  };

  useEffect(() => {
    generateTablist(rangeOption);
  }, [rangeOption, customStartDate, customEndDate]); // Call generateTablist when rangeOption changes

  const [transactionsData, setTransactionsData] = useState(null);

  async function fetchDataByTime(walletId, startDate, endDate) {
    try {
      let { data, error } = await supabase.rpc("get_transactions_by_dates", {
        end_date: endDate,
        start_date: startDate,
        wallet_id: walletId,
      });

      if (error) throw error;
      else {
        return data.map((item) => ({
          ...item,
          date: new Date(item.date),
          total: Number(item.total),
        }));
      }
    } catch (error) {
      console.error(error);
      return []; // Ensure the function always returns an array
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
      else {
        return data.map((item) => ({
          ...item,
          total: Number(item.total),
          transactions: item.transactions.map((transaction) => ({
            ...transaction,
            date: new Date(transaction.date),
          })),
        }));
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  const normalizeNestedTabs = (nestedTabs) => {
    if (Array.isArray(nestedTabs)) {
      return nestedTabs;
    }
    return [nestedTabs];
  };

  const updateTabsWithTransactions = async () => {
    const normalizedTabs = normalizeNestedTabs(nestedTabs);

    const updatedTabsData = await Promise.all(
      normalizedTabs?.map(async (tab) => {
        const { walletId, startDate, endDate } = tab.content;

        let transactionList = [];
        if (popupOption === "viewByTransac") {
          transactionList = await fetchDataByTime(walletId, startDate, endDate);
        } else if (popupOption === "viewByCateg") {
          transactionList = await fetchDataByCategory(
            walletId,
            startDate,
            endDate
          );
        }
        return {
          key: tab.key,
          title: tab.title,
          transactionList,
        };
      })
    );

    setTransactionsData(updatedTabsData);
  };

  useEffect(() => {
    updateTabsWithTransactions();

    const channelsExpense = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Expense" },
        async (payload) => {
          console.log("Change received in Expense!", payload);
          await updateTabsWithTransactions();
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Income" },
        async (payload) => {
          console.log("Change received in Income!", payload);
          await updateTabsWithTransactions();
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Debt" },
        async (payload) => {
          console.log("Change received in Debt!", payload);
          await updateTabsWithTransactions();
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Loan" },
        async (payload) => {
          console.log("Change received in Loan!", payload);
          await updateTabsWithTransactions();
        }
      )
      .subscribe();

    return () => {
      channelsExpense.unsubscribe();
    };
  }, [nestedTabs, popupOption]);

  // Memoized CustomTabBar component instance
  const memoizedTabBar = useMemo(() => {
    return rangeOption === "custom" ? (
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <View
          style={{
            paddingHorizontal: 15,
            paddingTop: 10,
            borderBottomWidth: 2,
            borderColor: "#F3F2F7",
            backgroundColor: COLORS.primary,
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "white", // Change this color to your desired text color
                fontFamily: "InterSemiBold", // Add any other text styles as needed
                fontSize: 16,
                textTransform: "capitalize",
                paddingBottom: 8,
              }}
            >
              {transactionsData[0]?.title}
            </Text>

            <View
              style={{
                height: 3,
                backgroundColor: "white",
                width: "30%",
                borderRadius: 10,
              }}
            />
          </View>
        </View>
        <TabContent
          transactionList={transactionsData[0]?.transactionList}
          typeApi={popupOption}
        />
      </View>
    ) : (
      <CustomTabBarTransaction
        widthOfPerTab={
          rangeOption == "week"
            ? Dimensions.get("window").width / 2
            : Dimensions.get("window").width / 3
        }
        nestedTabs={transactionsData}
        TabContent={TabContent}
        selectedOption={popupOption}
        colorStyle={{
          backgroundColorTabBar: COLORS.primary,
          colorTabText: "white",
          backgroundColorIndicator: "white",
        }}
      />
    );
  }, [transactionsData]);

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
                Transactions
              </Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={openPopup}>
              <icons.select fill="white" />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerShadowVisible: false,
          headerTitleAlign: "center",
        }}
      />
      <TransactionPopup
        isPopupVisible={isPopupVisible}
        close={closePopup}
        handleOpenTimeRange={handleOpenTimeRange}
        setOptionPopup={setPopupOption}
      />

      <TimRangePopup
        isTimeRangeVisible={isTimeRangeVisible}
        close={closeTimeRange}
        handleOpenCustomRange={handleOpenCustomRange}
        setRangeOption={setRangeOption}
      />

      <DateRangePicker
        visible={isCustomRange}
        close={closeRangeCustom}
        startDate={customStartDate}
        setStartDate={setCustomStartDate}
        endDate={customEndDate}
        setEndDate={setCustomEndDate}
        setRangeOption={setRangeOption}
      />

      {/* <View
        style={{
          backgroundColor: "white",
          paddingTop: 17,
        }}
      >
        <Text
          style={{
            fontFamily: "InterSemiBold",
            fontSize: 18,
            textAlign: "center",
          }}
        >
          Total amount: 5,000,000 VNĐ
        </Text>
      </View> */}

      {/* <CustomTabBar
        widthOfPerTab={Dimensions.get("window").width / 3}
        nestedTabs={nestedTabs}
        TabContent={TabContent}
      /> */}
      {transactionsData && memoizedTabBar}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Page;
