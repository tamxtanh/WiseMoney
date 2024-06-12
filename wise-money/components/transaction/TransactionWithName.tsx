import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import styles from "./style";
import { CategoryTransaction } from "./interface";
import { router } from "expo-router";

const TransactionWithName: React.FC<{ transaction: CategoryTransaction }> = ({
  transaction,
}) => {
  let type;

  if (transaction?.type === "debtLoan" && transaction?.value > 0) {
    type = "debt";
  } else if (transaction?.type === "debtLoan" && transaction?.value < 0) {
    type = "loan";
  } else {
    type = transaction?.type;
  }

  const handleClick = () => {
    // Handle click event here
    // Navigate to other page depending on type
    router.navigate({
      pathname: `/update-transaction/${transaction.id}`,
      params: {
        typeTransaction: type,
      },
    });
  };

  // useEffect(() => {
  //     console.log("transaction: ", transaction)

  // }, [])

  return (
    <TouchableOpacity style={styles.container} onPress={handleClick}>
      <View style={styles.left}>
        <Image source={{ uri: transaction.image_url }} style={styles.icon} />
      </View>
      <View style={styles.center}>
        <Text style={styles.title}>{transaction.category_name}</Text>
        {/* <Text style={styles.subtitle}>{transaction.name}</Text> */}
      </View>
      <View style={styles.right}>
        <Text style={transaction.value > 0 ? styles.blue : styles.red}>
          {transaction.value.toLocaleString("en-US", {
            // style: "currency",
            // currency: "VND",
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TransactionWithName;
