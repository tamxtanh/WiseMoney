import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { router, Stack } from "expo-router";
import { COLORS, icons } from "../../constants";
import * as Contacts from "expo-contacts";
import CustomTabBar from "../../components/tab-custom/CustomTabBar";
import CategoryContent from "../../components/tab-custom/CategoryContent";
import SupabaseSingleton from "../../lib/supabaseSingleton";

const CategoryList = () => {
  const supabase = SupabaseSingleton.getInstance().getClient();
  const { previousPage, type_page } = useLocalSearchParams();

  const [expenseData, setExpenseData] = useState({
    type: "expense",
    groupTree: [],
  });
  const [incomeData, setIncomeData] = useState({
    type: "income",
    groupTree: [],
  });
  const [debtLoanData, setDebtLoanData] = useState({
    type: "debtLoan",
    groupTree: [],
  });

  useEffect(() => {
    const getGroupTreeData = async (type, userId) => {
      try {
        let { data: tempt, error } = await supabase.rpc(
          "get_categories_composite",
          {
            category_type: type,
            user_id: userId,
          }
        );

        if (error) {
          throw error;
        }

        return tempt;
      } catch (error) {
        console.error(error);
      }
    };

    const fetchData = async () => {
      try {
        const expense = await getGroupTreeData("expense", 1);
        const income = await getGroupTreeData("income", 1);
        const debtLoan = await getGroupTreeData("debtLoan", 1);

        setExpenseData((prevExpenseData) => ({
          ...prevExpenseData,
          groupTree: expense,
        }));
        setIncomeData((prevExpenseData) => ({
          ...prevExpenseData,
          groupTree: income,
        }));
        setDebtLoanData((prevExpenseData) => ({
          ...prevExpenseData,
          groupTree: debtLoan,
        }));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    const channelsGroupTree = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Group" },
        async (payload) => {
          // console.log("Change received in Group!", payload);
          // Fetch data again when a change is received
          await fetchData();
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Category" },
        async (payload) => {
          console.log("Change received in Category!", payload);
          // Fetch data again when a change is received
          await fetchData();
        }
      )
      .subscribe();

    return () => {
      // Unsubscribe when the component unmounts
      channelsGroupTree.unsubscribe();
    };
  }, []);

  const nestedTabs = [
    {
      key: "1",
      title: "EXPENSE",
      content: expenseData,
    },
    {
      key: "2",
      title: "INCOME",
      content: incomeData,
    },
    {
      key: "3",
      title: "DEBT/LOAN",
      content: debtLoanData,
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <View style={{ marginLeft: 0 }}>
              <Text style={{ fontSize: 20, fontFamily: "InterSemiBold" }}>
                {type_page ? type_page : "Categories"}
              </Text>
            </View>
          ),
          // headerRight: () => (
          //   <TouchableOpacity onPress={() => router.push('/search/food')}>
          //     <icons.searchIcon fill="black" />
          //   </TouchableOpacity>
          // ),

          headerShadowVisible: false,
        }}
      />
      <View style={{ flex: 1 }}>
        <CustomTabBar
          widthOfPerTab={Dimensions.get("window").width / 3}
          nestedTabs={nestedTabs}
          TabContent={CategoryContent}
          selectedOption={previousPage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contactBtn: {
    paddingHorizontal: 40,
    paddingVertical: 15,
  },
});

export default CategoryList;
