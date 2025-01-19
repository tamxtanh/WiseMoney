import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  Alert
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { router, Stack } from "expo-router";
import { COLORS, icons } from "../../constants";
import SupabaseSingleton from "../../lib/supabaseSingleton";
import TargetItem from "../../components/target/TargetItem";
import { useKeyboard } from "../../context/KeyboardContext";
import * as DocumentPicker from "expo-document-picker";
import CsvAdapter from "../adapter/CsvAdapter";
import XlsAdapter from "../adapter/XlsAdapter";
const Page = () => {
  const supabase = SupabaseSingleton.getInstance().getClient();

  const [transactionList, setTransactionList] = useState([])
  const [file, setFile] = useState(undefined)


  const chooseFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // xlsx
          "application/vnd.ms-excel", // excel
          "text/csv", // csv
          "application/csv", // thêm loại MIME cho csv
          "application/vnd.ms-excel.sheet.macroenabled.12", // macro-enabled excel
        ],
        copyToCacheDirectory: true, // Copy file vào thư mục cache
      });


      if (result.assets !== null) {
        // Trường hợp chọn file thành công
        // console.log("File name:", result.assets[0].name);
        // console.log("URI:", result.assets[0].uri);
        setFile(result.assets[0])
        Alert.alert("File Selected", `Name: ${result.assets[0].name}`);

        let adapter;
        if (result.assets[0].name.endsWith(".csv")) {
          adapter = new CsvAdapter();
        } else if (result.assets[0].name.endsWith(".xls") || result.assets[0].name.endsWith(".xlsx")) {
          adapter = new XlsAdapter();
        } else {
          alert("Unsupported file format");
          return;
        }

        const parsedTransactions = await adapter.parseFile(result.assets[0].uri);
        console.log(parsedTransactions);

        setTransactionList(parsedTransactions);

      } else {
        // Trường hợp người dùng hủy
        Alert.alert("Canceled", "User canceled file picker");
      }
    } catch (err) {
      console.error("Error selecting file:", err);
      Alert.alert("Error", "Unable to select file");
    }


  };

  const handleSave = () => {
    const insertExpenseRow = async (formData) => {
      try {
        const { data, error } = await supabase
          .from("Expense")
          .insert([
            {
              category: formData.category,
              wallet: 1,
              amount: formData.amount,
              note: formData.note,
              name: formData.name,
              date: formData.date
            },
          ])
          .select("id")
          .single();

        if (error) throw error;

        return data.id;
      } catch (error) {
        console.error(error.message);
      }
    };

    const insertTransaction = async () => {
      try {
        transactionList.forEach(async (transaction) => {
          let id;
          id = await insertExpenseRow(transaction);
          // insertContact(id, "expense", contactContent);
        });

        Alert.alert(null, "Transaction recorded", [
          {
            text: "OK",
            onPress: () => {
              // Perform any additional actions, e.g., navigating to another screen
              console.log("Transaction successfully recorded");
            },
          },
        ]);

      } catch (error) {
        console.error("Error recording transaction: ", error.message);
        Alert.alert(null, "Failed to record the transaction");
      }
    };

    insertTransaction();
  };
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background1 }}>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <View style={{ marginLeft: 0 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "InterSemiBold",
                  color: "white",
                }}
              >
                Import Files
              </Text>
            </View>
          ),

          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTitleAlign: "center",
          headerTintColor: "white",
        }}
      />
      <View style={{ flex: 1 }}>
        <View style={{
          height: "20%",
          width: "100%",
          padding: "3%"
        }}>
          {
            !file ? (
              <TouchableOpacity style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                width: "100%",
                borderColor: "black",
                borderStyle: "dashed",
                borderWidth: 1,
              }}
                onPress={() => chooseFile()}>
                <Text>Chọn file</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                width: "100%",
                borderColor: "black",
                borderStyle: "dashed",
                borderWidth: 1,
              }}
                onPress={() => {
                  setFile(undefined)
                  setTransactionList([])
                }}>
                <Text>{file.name}</Text>
              </TouchableOpacity>

            )
          }

        </View>
        <View style={styles.saveBtn}>
          <TouchableOpacity
            style={{
              backgroundColor:
                !file ? "#dfdfdf" : COLORS.primary,
              alignItems: "center",
              justifyContent: "center",
              padding: 14,
              borderRadius: 7,
            }}
            disabled={!file}
            onPress={handleSave}
          >
            <Text
              style={{
                color: !file ? COLORS.textColor3 : "#FCFCFC",
                fontFamily: "InterSemiBold",
                fontSize: 18,
              }}
            >
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  saveBtn: {
    paddingTop: 5,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
});

export default Page;
