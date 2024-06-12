//app/budget/index.tsx
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { Stack, router } from "expo-router";
import { COLORS, icons } from "../../constants";
import BudgetComponentList from "../../components/budget/BudgetComponentList";
import { BudgetData } from "../../components/budget/interface";
import { styles } from "./styles";
import { supabase } from "../../lib/supabase";

const Budget = () => {
  const [budgets, setBudgets] = useState<BudgetData[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(0);
  const [categories, setCategories] = useState<number[]>([]);

  const getIdByEmail = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase.rpc("get_user_id_by_email", {
        user_email: user.email,
      });
      if (error) {
        console.error(error);
      } else {
        setUserId(data);
      }
    }
  };

  const fetchCategories = async () => {
    const { data, error } = await supabase.rpc("get_user_categories", {
      user_id: userId,
    });
    if (error) {
      console.error(error);
    } else {
      const categoryIds = data.map((category: { id: number }) => category.id);
      setCategories(categoryIds);
    }
  };

  const fetchBudgets = async () => {
    if (categories.length === 0) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.rpc("get_budgets", {
      category_id_list: categories,
    });
    if (error) {
      console.error(error);
    } else {
      const formattedData = data.map((budget: BudgetData) => ({
        ...budget,
        start_date: new Date(budget.start_date),
        end_date: new Date(budget.end_date),
      }));
      setBudgets(formattedData);
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getIdByEmail();
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (userId !== 0) {
      fetchCategories();
    }
  }, [userId]);

  useEffect(() => {
    if (categories.length > 0) {
      fetchBudgets();
    }
  }, [categories]);

  return (
    <View style={styles.container}>
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
                Budgets
              </Text>
            </View>
          ),
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTitleAlign: "center",
          headerTintColor: "white",
        }}
      />
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <>
          <BudgetComponentList budgets={budgets} />
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.fab}
            onPress={() => router.push("/budget/add")}
          >
            <icons.plus fill="white" />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default Budget;
