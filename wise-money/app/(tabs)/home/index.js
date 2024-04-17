import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import TransactionWithDate from '../../../components/transaction/TransactionWithDate'
import TransactionWithName from '../../../components/transaction/TransactionWithName'
import ListTransactionWithName from '../../../components/transaction/ListTransactionWithName'
import UpdateProfile from '../../../components/profile/UpdateProfile'
import MyBarChart from '../../../components/chart/MyBarChart'
import MyPieChart from '../../../components/chart/MyPieChart'

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
      <MyPieChart data={barChartData} />
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
