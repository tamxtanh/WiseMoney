import React, { useState, useMemo, useEffect } from "react";
import { Stack } from "expo-router";
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
import CustomTabBar from "../../../components/tab-custom/CustomTabBar";
import TabContent from "../../../components/tab-custom/TabContent";
import DateRangePicker from "../../../components/modal-calendar/DateRangePicker";
import {
  generateDateList,
  generateWeekList,
  generateMonthList,
} from "../../../components/transaction-function/generateListTab";
import TransactionPopup from "../../../components/modal-popUp/TransactionPopup";
import TimRangePopup from "../../../components/modal-popUp/TimRangePopup";

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
      default:
        setNestedTabs(generateMonthList(currentDate));
        break;
    }
  };

  useEffect(() => {
    generateTablist(rangeOption);
  }, [rangeOption]); // Call generateTablist when rangeOption changes

  // Memoized CustomTabBar component instance
  const memoizedTabBar = useMemo(
    () => (
      <CustomTabBar
        widthOfPerTab={
          rangeOption == "week"
            ? Dimensions.get("window").width / 2
            : Dimensions.get("window").width / 3
        }
        nestedTabs={nestedTabs}
        TabContent={TabContent}
        selectedOption={popupOption}
      />
    ),
    [nestedTabs, popupOption]
  );

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerLeft: () => <icons.searchIcon fill="white" />,
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
      />

      <View
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
      </View>

      {/* <CustomTabBar
        widthOfPerTab={Dimensions.get("window").width / 3}
        nestedTabs={nestedTabs}
        TabContent={TabContent}
      /> */}
      {memoizedTabBar}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Page;
