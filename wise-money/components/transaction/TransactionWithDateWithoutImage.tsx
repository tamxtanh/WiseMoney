// import React, { useEffect } from "react";
// import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
// import { DateTransactionWithoutImage } from "./interface";
// import { COLORS, FONT, SIZES } from "../../constants/theme";
// import { router } from "expo-router";

// const TransactionWithDateWithoutImage: React.FC<{
//   transaction: DateTransactionWithoutImage;
//   iconWidth?: number;
//   sizeTitle?: number;
//   sizeValue?: number;
//   containerHeight?: number;
//   showSubtitle?: boolean;
// }> = ({
//   transaction,
//   showSubtitle = false,
//   iconWidth = 34, // default value
//   sizeTitle = 15, // default value
//   sizeValue = SIZES.h8, // default value
//   containerHeight = 65, // default value
// }) => {
//   if (!transaction) return <></>;

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

//   const formatDate = (date) => {
//     if (!(date instanceof Date)) {
//       date = new Date(date);
//     }

//     const options: Intl.DateTimeFormatOptions = {
//       weekday: "long",
//       day: "numeric",
//       month: "long",
//       year: "numeric",
//     };
//     const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
//       date
//     );
//     return formattedDate;
//   };

//   return (
//     <TouchableOpacity
//       style={[styles.container, { height: containerHeight }]}
//       onPress={handleClick}
//     >
//       <View style={styles.left}>
//         <Image
//           source={require("../../assets/images/wallet.png")}
//           style={[styles.icon, { width: iconWidth, height: iconWidth }]}
//         />
//       </View>
//       <View style={styles.center}>
//         <Text style={[styles.title, { fontSize: sizeTitle }]}>
//           {formatDate(transaction?.date)}
//         </Text>
//         {/* <Text style={styles.subtitle}>{transaction.note}</Text> */}

//         {showSubtitle && (
//           <Text style={styles.subtitle}>{transaction?.note}</Text>
//         )}
//       </View>
//       <View style={styles.right}>
//         <Text
//           style={[
//             transaction.value > 0 ? styles.blue : styles.red,
//             { fontSize: sizeValue },
//           ]}
//         >
//           {transaction?.value?.toLocaleString("en-US", {
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

// export default TransactionWithDateWithoutImage;

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     height: 65,
//     width: "100%",
//     backgroundColor: COLORS.background,
//     paddingLeft: "4%",
//     paddingRight: "5%",
//   },
//   left: {
//     flex: 1.5,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   center: {
//     flex: 7,
//     justifyContent: "center",
//     marginLeft: 15,
//   },
//   right: {
//     flex: 4,
//     justifyContent: "center",
//     alignItems: "flex-end",
//   },
//   icon: {
//     width: 34,
//     height: 34,
//     borderRadius: 25,
//   },
//   title: {
//     fontSize: 15,
//     fontFamily: FONT.regular,
//   },
//   subtitle: {
//     color: COLORS.gray,
//     fontSize: SIZES.h8,
//     fontFamily: FONT.regular,
//   },
//   red: {
//     color: COLORS.expense,
//     fontSize: SIZES.h8,
//     fontFamily: FONT.medium,
//   },
//   blue: {
//     color: COLORS.income,
//     fontSize: SIZES.h8,
//     fontFamily: FONT.medium,
//   },
// });

import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { DateTransactionWithoutImage } from "./interface";
import { COLORS, FONT, SIZES } from "../../constants/theme";
import { router } from "expo-router";
import { supabase } from "../../lib/supabase";

const TransactionWithDateWithoutImage: React.FC<{
  transaction: DateTransactionWithoutImage;
  iconWidth?: number;
  sizeTitle?: number;
  sizeValue?: number;
  containerHeight?: number;
  showSubtitle?: boolean;
}> = ({
  transaction,
  showSubtitle = false,
  iconWidth = 34, // default value
  sizeTitle = 15, // default value
  sizeValue = SIZES.h8, // default value
  containerHeight = 65, // default value
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  if (!transaction) return <></>;

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

  const formatDate = (date) => {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }

    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );
    return formattedDate;
  };

  const handleLongPress = () => {
    setModalVisible(true);
  };

  const handleClone = async () => {
    setModalVisible(false);
    console.log("Cloning transaction:", transaction);
    // Implement cloning logic here

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
        style={[styles.container, { height: containerHeight }]}
        onPress={handleClick}
        onLongPress={handleLongPress}
      >
        <View style={styles.left}>
          <Image
            source={require("../../assets/images/wallet.png")}
            style={[styles.icon, { width: iconWidth, height: iconWidth }]}
          />
        </View>
        <View style={styles.center}>
          <Text style={[styles.title, { fontSize: sizeTitle }]}>
            {formatDate(transaction?.date)}
          </Text>

          {showSubtitle && (
            <Text style={styles.subtitle}>{transaction?.note}</Text>
          )}
        </View>
        <View style={styles.right}>
          <Text
            style={[
              transaction.value > 0 ? styles.blue : styles.red,
              { fontSize: sizeValue },
            ]}
          >
            {transaction?.value?.toLocaleString("en-US", {
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

export default TransactionWithDateWithoutImage;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 65,
    width: "100%",
    backgroundColor: COLORS.background,
    paddingLeft: "4%",
    paddingRight: "5%",
  },
  left: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  center: {
    flex: 7,
    justifyContent: "center",
    marginLeft: 15,
  },
  right: {
    flex: 4,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  icon: {
    width: 34,
    height: 34,
    borderRadius: 25,
  },
  title: {
    fontSize: 15,
    fontFamily: FONT.regular,
  },
  subtitle: {
    color: COLORS.gray,
    fontSize: SIZES.h8,
    fontFamily: FONT.regular,
  },
  red: {
    color: COLORS.expense,
    fontSize: SIZES.h8,
    fontFamily: FONT.medium,
  },
  blue: {
    color: COLORS.income,
    fontSize: SIZES.h8,
    fontFamily: FONT.medium,
  },
});
