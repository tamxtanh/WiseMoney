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
  const contacts = [
    {
      id: 1,
      name: "John Doe",
      phone: "123-456-7890",
      email: "john@example.com",
      address: "123 Main St, Anytown, USA",
      image_url: "https://th.bing.com/th/id/R.9cdacb09e37604f78a22d5d1b4e9c67c?rik=KOAVX5xNHfygFg&riu=http%3a%2f%2fmedia.doisongphapluat.com%2f693%2f2019%2f7%2f3%2ftruong+my+lan.jpg&ehk=CK0Dg158I1tHQFpaxExZBcMb0LaQ3ODkDfHj6%2fGpPcY%3d&risl=&pid=ImgRaw&r=0"
    }
    ,
    {
      id: 2,
      name: "Jane Smith",
      phone: "456-789-0123",
      email: "jane@example.com",
      address: "456 Elm St, Sometown, USA",
      image_url: "https://th.bing.com/th/id/R.9cdacb09e37604f78a22d5d1b4e9c67c?rik=KOAVX5xNHfygFg&riu=http%3a%2f%2fmedia.doisongphapluat.com%2f693%2f2019%2f7%2f3%2ftruong+my+lan.jpg&ehk=CK0Dg158I1tHQFpaxExZBcMb0LaQ3ODkDfHj6%2fGpPcY%3d&risl=&pid=ImgRaw&r=0"
    }
    ,
    {
      id: 3,
      name: "Alice Johnson",
      phone: "789-012-3456",
      email: "alice@example.com",
      address: "789 Oak St, Othertown, USA",
      image_url: "https://th.bing.com/th/id/R.9cdacb09e37604f78a22d5d1b4e9c67c?rik=KOAVX5xNHfygFg&riu=http%3a%2f%2fmedia.doisongphapluat.com%2f693%2f2019%2f7%2f3%2ftruong+my+lan.jpg&ehk=CK0Dg158I1tHQFpaxExZBcMb0LaQ3ODkDfHj6%2fGpPcY%3d&risl=&pid=ImgRaw&r=0"
    }
    ,
    {
      id: 4,
      name: "Bob Williams",
      phone: "012-345-6789",
      email: "bob@example.com",
      address: "012 Pine St, Anothertown, USA",
      image_url: "https://th.bing.com/th/id/R.9cdacb09e37604f78a22d5d1b4e9c67c?rik=KOAVX5xNHfygFg&riu=http%3a%2f%2fmedia.doisongphapluat.com%2f693%2f2019%2f7%2f3%2ftruong+my+lan.jpg&ehk=CK0Dg158I1tHQFpaxExZBcMb0LaQ3ODkDfHj6%2fGpPcY%3d&risl=&pid=ImgRaw&r=0"
    }
    ,
    {
      id: 5,
      name: "Eva Garcia",
      phone: "345-678-9012",
      email: "eva@example.com",
      address: "345 Cedar St, Lasttown, USA",
      image_url: "https://th.bing.com/th/id/R.9cdacb09e37604f78a22d5d1b4e9c67c?rik=KOAVX5xNHfygFg&riu=http%3a%2f%2fmedia.doisongphapluat.com%2f693%2f2019%2f7%2f3%2ftruong+my+lan.jpg&ehk=CK0Dg158I1tHQFpaxExZBcMb0LaQ3ODkDfHj6%2fGpPcY%3d&risl=&pid=ImgRaw&r=0"
    }

  ]

  const budgets = [
    {
      id: 1,
      name: "Monthly Expenses",
      image_url: "https://th.bing.com/th/id/R.de95dac0133853f128bcffbfebcdbbc1?rik=%2bnFw9jo31aDcag&pid=ImgRaw&r=0",
      amount: 28000000,
      start_date: new Date("2024-04-01"),
      end_date: new Date("2024-04-30"),
      current: 15000000,
      is_done: new Date("2024-04-30") < new Date() // true
    },
    {
      id: 2,
      name: "Vacation Fund",
      image_url: "https://th.bing.com/th/id/R.de95dac0133853f128bcffbfebcdbbc1?rik=%2bnFw9jo31aDcag&pid=ImgRaw&r=0",
      amount: 5000,
      start_date: new Date("2024-06-01"),
      end_date: new Date("2024-06-30"),
      current: 6000,
      is_done: new Date("2024-06-30") < new Date() // false
    },
    {
      id: 3,
      name: "Emergency Savings",
      image_url: "https://th.bing.com/th/id/R.de95dac0133853f128bcffbfebcdbbc1?rik=%2bnFw9jo31aDcag&pid=ImgRaw&r=0",
      amount: 10000,
      start_date: new Date("2024-01-01"),
      end_date: new Date("2024-12-31"),
      current: 7500,
      is_done: new Date("2024-12-31") < new Date() // false
    },
    {
      id: 4,
      name: "Home Renovation",
      image_url: "https://th.bing.com/th/id/R.de95dac0133853f128bcffbfebcdbbc1?rik=%2bnFw9jo31aDcag&pid=ImgRaw&r=0",
      amount: 15000,
      start_date: new Date("2024-03-01"),
      end_date: new Date("2024-09-30"),
      current: 20000,
      is_done: new Date("2024-09-30") < new Date() // true
    },
    {
      id: 5,
      name: "College Fund",
      image_url: "https://th.bing.com/th/id/R.de95dac0133853f128bcffbfebcdbbc1?rik=%2bnFw9jo31aDcag&pid=ImgRaw&r=0",
      amount: 20000,
      start_date: new Date("2024-01-01"),
      end_date: new Date("2028-12-31"),
      current: 15000,
      is_done: new Date("2028-12-31") < new Date() // false
    },
    {
      id: 6,
      name: "New Car Fund",
      image_url: "https://th.bing.com/th/id/R.de95dac0133853f128bcffbfebcdbbc1?rik=%2bnFw9jo31aDcag&pid=ImgRaw&r=0",
      amount: 25000,
      start_date: new Date("2024-05-01"),
      end_date: new Date("2025-05-01"),
      current: 20000,
      is_done: new Date("2025-05-01") < new Date() // false
    },
    {
      id: 7,
      name: "Retirement Savings",
      image_url: "https://th.bing.com/th/id/R.de95dac0133853f128bcffbfebcdbbc1?rik=%2bnFw9jo31aDcag&pid=ImgRaw&r=0",
      amount: 50000,
      start_date: new Date("2024-01-01"),
      end_date: new Date("2044-01-01"),
      current: 40000,
      is_done: new Date("2044-01-01") < new Date() // false
    },
    {
      id: 8,
      name: "Healthcare Fund",
      image_url: "https://th.bing.com/th/id/R.de95dac0133853f128bcffbfebcdbbc1?rik=%2bnFw9jo31aDcag&pid=ImgRaw&r=0",
      amount: 10000,
      start_date: new Date("2024-01-01"),
      end_date: new Date("2024-12-31"),
      current: 12000,
      is_done: new Date("2024-12-31") < new Date() // false
    },
    {
      id: 9,
      name: "Wedding Savings",
      image_url: "https://th.bing.com/th/id/R.de95dac0133853f128bcffbfebcdbbc1?rik=%2bnFw9jo31aDcag&pid=ImgRaw&r=0",
      amount: 20000,
      start_date: new Date("2024-01-01"),
      end_date: new Date("2025-12-31"),
      current: 15000,
      is_done: new Date("2025-12-31") < new Date() // false
    },
    {
      id: 10,
      name: "Investment Portfolio",
      image_url: "https://th.bing.com/th/id/R.de95dac0133853f128bcffbfebcdbbc1?rik=%2bnFw9jo31aDcag&pid=ImgRaw&r=0",
      amount: 500000,
      start_date: new Date("2024-01-01"),
      end_date: new Date("2044-01-01"),
      current: 200000,
      is_done: new Date("2044-01-01") < new Date() // false
    }
  ];

  const transaction = {
    "id": 10,
    "type": "Expense",
    "name": "Entertainment",
    "date": new Date(2023, 2, 20),
    "value": 15200000,
  }


  const transactionList = {
    id: 1,
    title: "Category Title",
    subtitle: "10",
    image_url: "https://th.bing.com/th/id/R.9cdacb09e37604f78a22d5d1b4e9c67c?rik=KOAVX5xNHfygFg&riu=http%3a%2f%2fmedia.doisongphapluat.com%2f693%2f2019%2f7%2f3%2ftruong+my+lan.jpg&ehk=CK0Dg158I1tHQFpaxExZBcMb0LaQ3ODkDfHj6%2fGpPcY%3d&risl=&pid=ImgRaw&r=0",
    total: 110000, // Total of 10 transactions with value over 10000 and divisible by 1000
    transactions: [
      {
        id: 1,
        type: "Type 1",
        name: "Transaction 1",
        date: new Date(),
        value: 15000 // Over 10000 and divisible by 1000
      },
      {
        id: 2,
        type: "Type 2",
        name: "Transaction 2",
        date: new Date(),
        value: 20000 // Over 10000 and divisible by 1000
      },
      {
        id: 3,
        type: "Type 3",
        name: "Transaction 3",
        date: new Date(),
        value: 13000 // Over 10000 and divisible by 1000
      },
      // Repeat this pattern for the remaining transactions
      {
        id: 4,
        type: "Type 4",
        name: "Transaction 4",
        date: new Date(),
        value: 11000 // Over 10000 and divisible by 1000
      },
      {
        id: 5,
        type: "Type 5",
        name: "Transaction 5",
        date: new Date(),
        value: 14000 // Over 10000 and divisible by 1000
      },
      {
        id: 6,
        type: "Type 6",
        name: "Transaction 6",
        date: new Date(),
        value: 18000 // Over 10000 and divisible by 1000
      },
      {
        id: 7,
        type: "Type 7",
        name: "Transaction 7",
        date: new Date(),
        value: 12000 // Over 10000 and divisible by 1000
      },
      {
        id: 8,
        type: "Type 8",
        name: "Transaction 8",
        date: new Date(),
        value: 16000 // Over 10000 and divisible by 1000
      },
      {
        id: 9,
        type: "Type 9",
        name: "Transaction 9",
        date: new Date(),
        value: 17000 // Over 10000 and divisible by 1000
      },
      {
        id: 10,
        type: "Type 10",
        name: "Transaction 10",
        date: new Date(),
        value: 19000 // Over 10000 and divisible by 1000
      }
    ]
  };

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
      {/* <View style={styles.otherUtilities}>
        <Text style={styles.lTitleBox}> Other utilities</Text>
        <View style={styles.listOtherUti}>
          <UtilityItemList itemData={utilityList} qualityPerRow={4} />
        </View>
      </View> */}

      {/* <ContactList contacts={contacts} />
      <BudgetComponentList budgets={budgets} /> */}

      {/* <TransactionWithDateWithoutImage transaction={transaction} /> */}
      <TransactionListWithDateWithoutImage data={transactionList} />
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
