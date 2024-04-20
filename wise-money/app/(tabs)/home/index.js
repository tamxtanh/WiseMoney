import { Stack } from "expo-router";

import NotificationComponent from '../../../components/notification/NotificationComponent'
import NotificationComponentList from '../../../components/notification/NotificationComponentList'

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import TransactionWithDate from "../../../components/transaction/TransactionWithDate";
import TransactionWithName from "../../../components/transaction/TransactionWithName";
import GroupTotal from "../../../components/transaction/GroupTotal";
import ListTransactionWithName from "../../../components/transaction/TransactionListWithName";
import ListGroupTotal from "../../../components/transaction/GroupTotalList";
import UpdateProfile from "../../../components/profile/UpdateProfile";
import MyBarChart from "../../../components/chart/MyBarChart";
import MyPieChart from "../../../components/chart/MyPieChart";
import { icons, COLORS, SIZES } from "../../../constants";
import UtilityItem from "../../../components/home/utilityItem";
import UtilityItemList from "../../../components/utility/utilityItemList";
import Contact from '../../../components/contact/Contact'
import ContactList from '../../../components/contact/ContactList'
import BudgetComponent from '../../../components/budget/BudgetComponent'
import BudgetComponentList from '../../../components/budget/BudgetComponentList'
import TransactionWithDateWithoutImage from '../../../components/transaction/TransactionWithDateWithoutImage'
import TransactionListWithDateWithoutImage from '../../../components/transaction/TransactionListWithDateWithoutImage'

export default function Page() {
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
        <View style={styles.tabsSpReport}></View>
        <View style={styles.topSpReport}>
          <Text style={styles.titleTopSpReport}></Text>
          <View style={styles.listTopSpReport}></View>
        </View>
      </View>
      <View style={styles.recentTransactions}>
        <View style={styles.titleBox}>
          <Text style={styles.lTitleBox}>Recent transactions</Text>
          <Text style={styles.rTitleBox}>See all</Text>
        </View>
        <View style={styles.listReTrans}></View>
      </View>
      <View style={styles.otherUtilities}>
        <Text style={styles.lTitleBox}> Other utilities</Text>
        <View style={styles.listOtherUti}>
          <UtilityItemList itemData={utilityList} qualityPerRow={4} />
        </View>
      </View>

      <Text>Index page of Widgets Tab</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "E9E9E9",
    marginBottom: '11%'
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
});
