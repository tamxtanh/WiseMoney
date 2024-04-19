import { Stack } from "expo-router";

import NotificationComponent from "../../../components/notification/NotificationComponent";
import NotificationComponentList from "../../../components/notification/NotificationComponentList";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import TransactionWithDate from "../../../components/transaction/TransactionWithDate";
import TransactionWithName from "../../../components/transaction/TransactionWithName";
import GroupTotal from "../../../components/transaction/GroupTotal";
import ListTransactionWithName from "../../../components/transaction/ListTransactionWithName";
import ListGroupTotal from "../../../components/transaction/ListGroupTotal";
import UpdateProfile from "../../../components/profile/UpdateProfile";
import MyBarChart from "../../../components/chart/MyBarChart";
import MyPieChart from "../../../components/chart/MyPieChart";
import { icons, COLORS, SIZES } from "../../../constants";
import UtilityItem from "../../../components/home/utilityItem";
import UtilityItemList from "../../../components/utility/utilityItemList";
import { useState } from "react";
import RadioTabList from "../../../components/home/radioTabList";

export default function Page() {
  const transaction = {
    id: 1,
    image: require("../../../assets/category/car.png"),
    type: "INCOME",
    category_name: "Học tập",
    date: new Date(2024, 6, 3),
    value: 15300000,
  };

  const transaction2 = {
    id: 1,
    image:
      "https://eianmciufswbutirdbka.supabase.co/storage/v1/object/public/my%20files/images/icons/bank.jpg?t=2024-03-03T11%3A56%3A20.199Z",
    type: "INCOME",
    category_name: "Học tập",
    name: "Mua sách tiếng Anh",
    value: 15300000,
  };

  const listTransactions = {
    date: new Date("2024-08-08"),
    total: -222000000,
    transactions: [
      {
        id: 1,
        image:
          "https://eianmciufswbutirdbka.supabase.co/storage/v1/object/public/my%20files/images/icons/bank.jpg?t=2024-03-03T11%3A56%3A20.199Z",
        type: "INCOME",
        category_name: "Học tập",
        name: "Mua sách tiếng Anh",
        value: 15300000,
      },
      {
        id: 2,
        image:
          "https://eianmciufswbutirdbka.supabase.co/storage/v1/object/public/my%20files/images/icons/bank.jpg?t=2024-03-03T11%3A56%3A20.199Z",
        type: "INCOME",
        category_name: "Họasfdasfdsc tập",
        name: "Mua sáasfdafch tiếng Anh",
        value: 32300000,
      },
      {
        id: 3,
        image:
          "https://eianmciufswbutirdbka.supabase.co/storage/v1/object/public/my%20files/images/icons/bank.jpg?t=2024-03-03T11%3A56%3A20.199Z",
        type: "INCOME",
        category_name: "Họasfdafập",
        name: "qwrqwewqr qwreAnh",
        value: 9500000,
      },
      {
        id: 4,
        image:
          "https://eianmciufswbutirdbka.supabase.co/storage/v1/object/public/my%20files/images/icons/birthdate.png?t=2024-03-03T11%3A56%3A32.582Z",
        type: "INCOME",
        category_name: "Hqwerweqr tập",
        name: "Mqwererwqếng Anh",
        value: 333500000,
      },
      {
        id: 5,
        image:
          "https://eianmciufswbutirdbka.supabase.co/storage/v1/object/public/my%20files/images/icons/bank.jpg?t=2024-03-03T11%3A56%3A20.199Z",
        type: "INCOME",
        category_name: "qwreqwerqerwq qwerqwer",
        name: "Mwqerwqrng Anh",
        value: 166300000,
      },
    ],
  };

  const barChartData = {
    title: "Monthly Sales",
    height: 300,
    list: [
      { name: "January", value: 1000000 },
      { name: "February", value: 10898000 },
      { name: "Jan", value: 898000 },
      { name: "Feb", value: 1898000 },
      { name: "Jan", value: 2898000 },
      { name: "Feb", value: 5898000 },
      { name: "Feb", value: 1898000 },
      { name: "Jan", value: 2898000 },
      { name: "Feb", value: 5898000 },

      // more data...
    ],
  };

  const notifications = [
    {
      id: 1,
      name: "Your expense exceeds your budget",
      description:
        "You have spent over VND 1,000,000 over your budget in Eat and Drink April Budget",
      time: new Date(), // Current date and time
      is_read: false,
      type: "warning",
      source: 1,
      image_url:
        "https://actufinance.fr/wp-content/uploads/2020/08/binance.png",
    },
    {
      id: 2,
      name: "New message received",
      description: "You have a new message from John Doe",
      time: new Date("2024-04-19T08:00:00"), // Specific date and time
      is_read: false,
      type: "info",
      source: 2,
      image_url:
        "https://actufinance.fr/wp-content/uploads/2020/08/binance.png",
    },
    {
      id: 3,
      name: "Event reminder",
      description: "Don't forget about the meeting today!",
      time: new Date("2024-04-20T15:30:00"), // Another specific date and time
      is_read: false,
      type: "reminder",
      source: 3,
      image_url:
        "https://actufinance.fr/wp-content/uploads/2020/08/binance.png",
    },
    {
      id: 4,
      name: "New message received",
      description: "You have a new message from John Doe",
      time: new Date("2024-04-19T08:00:00"), // Specific date and time
      is_read: false,
      type: "info",
      source: 2,
      image_url:
        "https://actufinance.fr/wp-content/uploads/2020/08/binance.png",
    },
    {
      id: 5,
      name: "Event reminder",
      description: "Don't forget about the meeting today!",
      time: new Date("2024-04-20T15:30:00"), // Another specific date and time
      is_read: false,
      type: "reminder",
      source: 3,
      image_url:
        "https://actufinance.fr/wp-content/uploads/2020/08/binance.png",
    },
    {
      id: 6,
      name: "New message received",
      description: "You have a new message from John Doe",
      time: new Date("2024-04-19T08:00:00"), // Specific date and time
      is_read: false,
      type: "info",
      source: 2,
      image_url:
        "https://actufinance.fr/wp-content/uploads/2020/08/binance.png",
    },
    {
      id: 7,
      name: "Event reminder",
      description: "Don't forget about the meeting today!",
      time: new Date("2024-04-20T15:30:00"), // Another specific date and time
      is_read: false,
      type: "reminder",
      source: 3,
      image_url:
        "https://actufinance.fr/wp-content/uploads/2020/08/binance.png",
    },
    {
      id: 8,
      name: "New message received",
      description: "You have a new message from John Doe",
      time: new Date("2024-04-19T08:00:00"), // Specific date and time
      is_read: false,
      type: "info",
      source: 2,
      image_url:
        "https://actufinance.fr/wp-content/uploads/2020/08/binance.png",
    },
    {
      id: 9,
      name: "Event reminder",
      description: "Don't forget about the meeting today!",
      time: new Date("2024-04-20T15:30:00"), // Another specific date and time
      is_read: false,
      type: "reminder",
      source: 3,
      image_url:
        "https://actufinance.fr/wp-content/uploads/2020/08/binance.png",
    },
  ];

  const utilityList = [
    {
      title: "Exchange Rates",
      icon: <icons.exchangeRates fill="white" />,
      colorBox: "#4445E8",
    },
    {
      title: "Debts",
      icon: <icons.debts fill="white" />,
      colorBox: "#FB6C23",
    },
    {
      title: "Tax Calculating",
      icon: <icons.taxCaculating fill="white" />,
      colorBox: "#1BD6E2",
    },
    {
      title: "Spending Suggestions",
      icon: <icons.spendingSuggestions fill="white" />,
      colorBox: "#0585FF",
    },
    {
      title: "Categories",
      icon: <icons.category fill="white" />,
      colorBox: "#12C144",
    },
    {
      title: "Export Data",
      icon: <icons.exportData fill="white" />,
      colorBox: "#FFC75C",
    },
  ];

  const barChartData_2month = {
    // title: "Monthly Sales",
    height: 300,
    list: [
      { name: "Last month", value: 1000000 },
      { name: "This month", value: 10898000 },

      // more data...
    ],
  };

  const listTabData = [{ title: "Week" }, { title: "Month" }];

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
                Hi tam16121612@gmail.com
              </Text>
            </View>
          ),
          headerRight: () => <icons.notification fill="white" />,
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
              <Text style={styles.valueBalance}> 5,000,000 đ </Text>
            </View>
            {/* icon */}
            <View style={styles.rightBalanceBox}>
              <icons.visibility fill={COLORS.textColor3} />
            </View>
          </View>
        </View>
        <View style={styles.spendingReport}>
          <View style={styles.titleBox}>
            <Text style={styles.lTitleBox}>Spending Report</Text>
            <Text style={styles.rTitleBox}>See reports</Text>
          </View>

          <View style={styles.tabsSpReport}>
            <View style={{ marginHorizontal: 15 }}>
              {/* {listTab.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.tabBtn,
                    barStatus === item.title && styles.tabBtnActive,
                  ]}
                  onPress={() => setBarStatus(item.title)}
                >
                  <Text
                    style={[
                      styles.textTab,
                      barStatus === item.title && styles.textTabActive,
                    ]}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              ))} */}
              <RadioTabList
                listTab={listTabData}
                defaultSelected={listTabData[1].title}
              />
            </View>
            <Text
              style={{
                fontFamily: "InterSemiBold",
                fontSize: 18,
                marginTop: 10,
              }}
            >
              5,000,000 đ
            </Text>
            <Text
              style={{
                marginTop: 3,
                fontSize: 14,
                fontFamily: "InterMedium",
                color: COLORS.textColor3,
              }}
            >
              Total spent this month
            </Text>
            <MyBarChart data={barChartData_2month} />
          </View>
          <View style={styles.topSpReport}>
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
              <TransactionWithDate transaction={transaction} />
            </View>
          </View>
        </View>
        <View style={styles.recentTransactions}>
          <View style={styles.titleBox}>
            <Text style={styles.lTitleBox}>Recent transactions</Text>
            <Text style={styles.rTitleBox}>See all</Text>
          </View>
          <View style={styles.listReTrans}>
            <TransactionWithDate transaction={transaction} />
            <TransactionWithDate transaction={transaction} />
            <TransactionWithDate transaction={transaction} />
          </View>
        </View>
        <View style={styles.otherUtilities}>
          <Text style={styles.lTitleBox}> Other utilities</Text>
          <View style={styles.listOtherUti}>
            <UtilityItemList itemData={utilityList} qualityPerRow={4} />
          </View>
        </View>
      </ScrollView>

      {/* <TransactionWithName transaction={transaction2} /> */}
      {/* <ListTransactionWithName
        listTransactions={listTransactions}
        style={{ flex: 1 }}
      /> */}

      {/* <UpdateProfile></UpdateProfile> */}
      {/* <BarChartVerticalWithLabels /> */}
      {/* <MyBarChart data={barChartData} />
      <MyPieChart data={barChartData} /> */}
      {/* <GroupTotal transaction={transaction2} /> */}
      {/* <ListGroupTotal groups={listTransactions.transactions} /> */}
      {/* <NotificationComponentList notifications={notifications} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "E9E9E9",
    // alignItems: "center",
    // justifyContent: "center",
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
    padding: 18,
  },
  titleBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  lTitleBox: {
    fontSize: 16,
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
    padding: 18,
  },
  otherUtilities: {
    marginTop: 10,
    backgroundColor: "white",
    padding: 18,
  },
  tabsSpReport: {
    marginVertical: 12,
  },
  spending: {},
  scrollViewContainer: {
    marginBottom: 62,
  },
});
