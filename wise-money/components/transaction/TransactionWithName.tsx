// import React, { useEffect } from "react";
// import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
// import styles from "./style";
// import { CategoryTransaction } from "./interface";
// import { router } from "expo-router";

// const TransactionWithName: React.FC<{ transaction: CategoryTransaction }> = ({
//   transaction,
// }) => {
//   console.log("transaction: ", transaction);
//   let type;

//   if (transaction?.type === "debtLoan" && transaction?.value > 0) {
//     type = "debt";
//   } else if (transaction?.type === "debtLoan" && transaction?.value < 0) {
//     type = "loan";
//   } else {
//     type = transaction?.type;
//   }

//   const handleClick = () => {
//     // Handle click event here
//     // Navigate to other page depending on type
//     router.navigate({
//       pathname: `/update-transaction/${transaction.id}`,
//       params: {
//         typeTransaction: type,
//       },
//     });
//   };

//   // useEffect(() => {
//   //     console.log("transaction: ", transaction)

//   // }, [])

//   return (
//     <TouchableOpacity style={styles.container} onPress={handleClick}>
//       <View style={styles.left}>
//         <Image source={{ uri: transaction.image_url }} style={styles.icon} />
//       </View>
//       <View style={styles.center}>
//         <Text style={styles.title}>{transaction.category_name}</Text>
//         {/* <Text style={styles.subtitle}>{transaction.name}</Text> */}
//       </View>
//       <View style={styles.right}>
//         <Text style={transaction.value > 0 ? styles.blue : styles.red}>
//           {transaction.value.toLocaleString("en-US", {
//             // style: "currency",
//             // currency: "VND",
//             minimumFractionDigits: 0,
//             maximumFractionDigits: 2,
//           })}
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

// export default TransactionWithName;

import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
} from "react-native";
import styles from "./style";
import { CategoryTransaction } from "./interface";
import { router } from "expo-router";
import { supabase } from "../../lib/supabase";

const TransactionWithName: React.FC<{ transaction: CategoryTransaction }> = ({
  transaction,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  let type;
  if (transaction?.type === "debtLoan" && transaction?.value > 0) {
    type = "debt";
  } else if (transaction?.type === "debtLoan" && transaction?.value < 0) {
    type = "loan";
  } else {
    type = transaction?.type;
  }

  const handleClick = () => {
    router.navigate({
      pathname: `/update-transaction/${transaction.id}`,
      params: {
        typeTransaction: type,
      },
    });
  };

  const handleLongPress = () => {
    setModalVisible(true);
  };

  const handleClone = async () => {
    setModalVisible(false);
    console.log("Cloning transaction:", transaction);
    // Implement cloning logic here
    // Call Supabase RPC to clone the transaction
    const { data, error } = await supabase.rpc("clone_data", {
      id: transaction.id,
      type: type,
    });

    // Handle the result of the RPC call
    if (error) {
      console.error("Error cloning transaction:", error);
      alert("Failed to clone transaction");
    } else {
      console.log("Cloned transaction data:", data);
      alert("Transaction cloned successfully!");
    }
  };

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={handleClick}
        onLongPress={handleLongPress}
      >
        <View style={styles.left}>
          <Image source={{ uri: transaction.image_url }} style={styles.icon} />
        </View>
        <View style={styles.center}>
          <Text style={styles.title}>{transaction.category_name}</Text>
        </View>
        <View style={styles.right}>
          <Text style={transaction.value > 0 ? styles.blue : styles.red}>
            {transaction.value.toLocaleString("en-US", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Modal for Clone Confirmation */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="none"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={modalStyles.modalContainer}>
          <View style={modalStyles.modalContent}>
            <Text style={modalStyles.modalText}>
              Do you want to clone this transaction?
            </Text>
            <View style={modalStyles.buttonContainer}>
              <TouchableOpacity
                style={modalStyles.textButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={modalStyles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={modalStyles.textButton}
                onPress={handleClone}
              >
                <Text style={modalStyles.buttonText}>Clone</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

// Modal Styles
const modalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 18,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end", // Align buttons to the right
    width: "100%",
    gap: 5, // Add spacing between buttons
  },
  textButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "white",
  },
  buttonText: {
    color: "#2EB84B",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TransactionWithName;
