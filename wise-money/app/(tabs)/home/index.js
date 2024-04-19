import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import TransactionWithDate from '../../../components/transaction/TransactionWithDate'
import TransactionWithName from '../../../components/transaction/TransactionWithName'
import GroupTotal from '../../../components/transaction/GroupTotal'
import ListTransactionWithName from '../../../components/transaction/ListTransactionWithName'
import ListGroupTotal from '../../../components/transaction/ListGroupTotal'
import UpdateProfile from '../../../components/profile/UpdateProfile'
import MyBarChart from '../../../components/chart/MyBarChart'
import MyPieChart from '../../../components/chart/MyPieChart'
import NotificationComponent from '../../../components/notification/NotificationComponent'
import NotificationComponentList from '../../../components/notification/NotificationComponentList'

export default function Page() {
  const transaction = {
    id: 1,
    image: "https://eianmciufswbutirdbka.supabase.co/storage/v1/object/public/my%20files/images/icons/bank.jpg?t=2024-03-03T11%3A56%3A20.199Z",
    type: "INCOME",
    category_name: 'Học tập',
    date: new Date(2024, 6, 3),
    value: 15300000
  }

  const transaction2 = {
    id: 1,
    image: "https://eianmciufswbutirdbka.supabase.co/storage/v1/object/public/my%20files/images/icons/bank.jpg?t=2024-03-03T11%3A56%3A20.199Z",
    type: "INCOME",
    category_name: 'Học tập',
    name: "Mua sách tiếng Anh",
    value: 15300000
  }

  const listTransactions = {
    date: new Date("2024-08-08"),
    total: -222000000,
    transactions:
      [
        {
          id: 1,
          image: "https://eianmciufswbutirdbka.supabase.co/storage/v1/object/public/my%20files/images/icons/bank.jpg?t=2024-03-03T11%3A56%3A20.199Z",
          type: "INCOME",
          category_name: 'Học tập',
          name: "Mua sách tiếng Anh",
          value: 15300000
        },
        {
          id: 2,
          image: "https://eianmciufswbutirdbka.supabase.co/storage/v1/object/public/my%20files/images/icons/bank.jpg?t=2024-03-03T11%3A56%3A20.199Z",
          type: "INCOME",
          category_name: 'Họasfdasfdsc tập',
          name: "Mua sáasfdafch tiếng Anh",
          value: 32300000
        },
        {
          id: 3,
          image: "https://eianmciufswbutirdbka.supabase.co/storage/v1/object/public/my%20files/images/icons/bank.jpg?t=2024-03-03T11%3A56%3A20.199Z",
          type: "INCOME",
          category_name: 'Họasfdafập',
          name: "qwrqwewqr qwreAnh",
          value: 9500000
        },
        {
          id: 4,
          image: "https://eianmciufswbutirdbka.supabase.co/storage/v1/object/public/my%20files/images/icons/birthdate.png?t=2024-03-03T11%3A56%3A32.582Z",
          type: "INCOME",
          category_name: 'Hqwerweqr tập',
          name: "Mqwererwqếng Anh",
          value: 333500000
        },
        {
          id: 5,
          image: "https://eianmciufswbutirdbka.supabase.co/storage/v1/object/public/my%20files/images/icons/bank.jpg?t=2024-03-03T11%3A56%3A20.199Z",
          type: "INCOME",
          category_name: 'qwreqwerqerwq qwerqwer',
          name: "Mwqerwqrng Anh",
          value: 166300000
        }
      ]
  }

  const barChartData = {
    title: 'Monthly Sales',
    height: 300,
    list: [
      { name: 'January', value: 1000000 },
      { name: 'February', value: 10898000 },
      { name: 'Jan', value: 898000 },
      { name: 'Feb', value: 1898000 },
      { name: 'Jan', value: 2898000 },
      { name: 'Feb', value: 5898000 },
      { name: 'Feb', value: 1898000 },
      { name: 'Jan', value: 2898000 },
      { name: 'Feb', value: 5898000 },


      // more data...
    ],
  };

  const notifications = [
    {
      id: 1,
      name: 'Your expense exceeds your budget',
      description: 'You have spent over VND 1,000,000 over your budget in Eat and Drink April Budget',
      time: new Date(), // Current date and time
      is_read: false,
      type: 'warning',
      source: 1,
      image_url: 'https://actufinance.fr/wp-content/uploads/2020/08/binance.png'
    },
    {
      id: 2,
      name: 'New message received',
      description: 'You have a new message from John Doe',
      time: new Date('2024-04-19T08:00:00'), // Specific date and time
      is_read: false,
      type: 'info',
      source: 2,
      image_url: 'https://actufinance.fr/wp-content/uploads/2020/08/binance.png'
    },
    {
      id: 3,
      name: 'Event reminder',
      description: 'Don\'t forget about the meeting today!',
      time: new Date('2024-04-20T15:30:00'), // Another specific date and time
      is_read: false,
      type: 'reminder',
      source: 3,
      image_url: 'https://actufinance.fr/wp-content/uploads/2020/08/binance.png'
    },
    {
      id: 4,
      name: 'New message received',
      description: 'You have a new message from John Doe',
      time: new Date('2024-04-19T08:00:00'), // Specific date and time
      is_read: false,
      type: 'info',
      source: 2,
      image_url: 'https://actufinance.fr/wp-content/uploads/2020/08/binance.png'
    },
    {
      id: 5,
      name: 'Event reminder',
      description: 'Don\'t forget about the meeting today!',
      time: new Date('2024-04-20T15:30:00'), // Another specific date and time
      is_read: false,
      type: 'reminder',
      source: 3,
      image_url: 'https://actufinance.fr/wp-content/uploads/2020/08/binance.png'
    },
    {
      id: 6,
      name: 'New message received',
      description: 'You have a new message from John Doe',
      time: new Date('2024-04-19T08:00:00'), // Specific date and time
      is_read: false,
      type: 'info',
      source: 2,
      image_url: 'https://actufinance.fr/wp-content/uploads/2020/08/binance.png'
    },
    {
      id: 7,
      name: 'Event reminder',
      description: 'Don\'t forget about the meeting today!',
      time: new Date('2024-04-20T15:30:00'), // Another specific date and time
      is_read: false,
      type: 'reminder',
      source: 3,
      image_url: 'https://actufinance.fr/wp-content/uploads/2020/08/binance.png'
    },
    {
      id: 8,
      name: 'New message received',
      description: 'You have a new message from John Doe',
      time: new Date('2024-04-19T08:00:00'), // Specific date and time
      is_read: false,
      type: 'info',
      source: 2,
      image_url: 'https://actufinance.fr/wp-content/uploads/2020/08/binance.png'
    },
    {
      id: 9,
      name: 'Event reminder',
      description: 'Don\'t forget about the meeting today!',
      time: new Date('2024-04-20T15:30:00'), // Another specific date and time
      is_read: false,
      type: 'reminder',
      source: 3,
      image_url: 'https://actufinance.fr/wp-content/uploads/2020/08/binance.png'
    }
  ];


  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitleAlign: "center",
          headerTitle: "Widgets",
        }}
      />
      {/* <TransactionWithDate transaction={transaction} />
      <TransactionWithName transaction={transaction2} /> */}
      {/* <ListTransactionWithName listTransactions={listTransactions} style={{ flex: 1 }} /> */}

      {/* <UpdateProfile></UpdateProfile> */}
      {/* <BarChartVerticalWithLabels /> */}
      {/* <MyBarChart data={barChartData} /> */}
      {/* <MyPieChart data={barChartData} /> */}
      {/* <GroupTotal transaction={transaction2} /> */}
      {/* <ListGroupTotal groups={listTransactions.transactions} /> */}
      <NotificationComponentList notifications={notifications} />
      <Text>Index page of Widgets Tab</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
});
