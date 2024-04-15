import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import TransactionWithDate from '../../../components/transaction/TransactionWithDate'
import TransactionWithName from '../../../components/transaction/TransactionWithName'

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

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitleAlign: "center",
          headerTitle: "Widgets",
        }}
      />
      <TransactionWithDate transaction={transaction} />
      <TransactionWithName transaction={transaction2} />
      <Text>Index page of Widgets Tab</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
