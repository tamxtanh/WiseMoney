import React, { useEffect, useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { COLORS, SIZES } from "../../constants";
import InputField from "../../components/interest-components/InputField";
import CategorySelector from "./CategorySelector";
import { supabase } from "../../lib/supabase";
import { Stack } from "expo-router";
import DateRangePicker from "../../components/modal-calendar/DateRangePicker";
import { icons } from "../../constants"; // Ensure you have icons imported

interface Category {
  id: number;
  name: string;
  url: string;
}

interface BudgetData {
  id: number;
  name: string;
  start_date: Date;
  end_date: Date;
  amount: number;
  current: number;
  is_done: boolean;
  category: number;
}

const BudgetDetail: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params as { id: number };

  const [budget, setBudget] = useState<BudgetData | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isCustomRange, setIsCustomRange] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  const formatCurrency = (value: number) =>
    String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const parseCurrency = (value: string) => parseFloat(value.replace(/,/g, ""));

  useEffect(() => {
    fetchBudgetById();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserData();
      fetchCategories();
    };
    fetchData();
  }, [userId]);

  const fetchCategories = async () => {
    const { data, error } = await supabase.rpc("get_user_categories_by_type", {
      user_id: userId,
      p_type: "expense",
    });
    if (error) console.error(error);
    else {
      setCategories(data);
    }
  };

  const fetchUserData = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase.rpc("get_user_id_by_email", {
        user_email: user.email,
      });
      if (error) console.error(error);
      else setUserId(data);
    }
  };

  const fetchBudgetById = async () => {
    let { data, error } = await supabase
      .from("Budget")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching row:", error);
    } else {
      if (data) {
        const budgetData = data;
        setBudget({
          ...budgetData,
          start_date: new Date(budgetData.start_date),
          end_date: new Date(budgetData.end_date),
        });
      }
    }
  };

  const updateBudget = async () => {
    let { data, error } = await supabase.rpc("update_budget", {
      p_amount: budget.amount,
      p_end_date: budget.end_date,
      p_id: budget.id,
      p_name: budget.name,
      p_start_date: budget.start_date,
    });
    if (error) console.error(error);
    else console.log(data);
  };

  const handleSave = () => {
    updateBudget();
  };

  const closeRangeCustom = () => {
    setIsCustomRange(false);
  };

  const openRangeCustom = () => {
    setIsCustomRange(true);
  };

  const formatCustomDate = (startDate, endDate) => {
    const dateOptions = { day: "2-digit", month: "2-digit", year: "numeric" };

    const formattedStartDate = startDate
      .toLocaleDateString("en-US", dateOptions)
      .split("/");
    const formattedEndDate = endDate
      .toLocaleDateString("en-US", dateOptions)
      .split("/");

    return `${formattedStartDate[1]}/${formattedStartDate[0]}/${formattedStartDate[2]} - ${formattedEndDate[1]}/${formattedEndDate[0]}/${formattedEndDate[2]}`;
  };

  if (!budget && categories.length < 1) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
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
                {budget.name}
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
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <InputField
            title="Budget Name"
            description="Enter the name of the budget"
            value={budget.name}
            onChangeText={(text) => setBudget({ ...budget, name: text })}
            placeholder="Budget Name"
            keyboardType="default"
            inputIcon=""
          />

          <CategorySelector
            label="Category"
            categoryList={categories}
            currentCategory={budget.category}
            onCategoryChange={(categoryId) =>
              setBudget({ ...budget, category: categoryId })
            }
            editable={false}
          />

          <TouchableOpacity onPress={openRangeCustom}>
            <InputField
              title="Date Range"
              description="Select the date range for the budget"
              value={formatCustomDate(budget.start_date, budget.end_date)}
              // onPress={openRangeCustom}
              disabled={true}
              inputIcon={<icons.calenderClock fill={"black"} />} // Adjust icon usage as needed
            />
          </TouchableOpacity>
          <DateRangePicker
            visible={isCustomRange}
            close={closeRangeCustom}
            startDate={budget.start_date}
            setStartDate={(date) => setBudget({ ...budget, start_date: date })}
            endDate={budget.end_date}
            setEndDate={(date) => setBudget({ ...budget, end_date: date })}
            setRangeOption={undefined}
          />

          <InputField
            title="Amount"
            description="Total budget amount"
            value={formatCurrency(budget.amount)}
            onChangeText={(text) =>
              setBudget({ ...budget, amount: parseCurrency(text) })
            }
            placeholder="0"
            keyboardType="numeric"
            inputIcon="VND"
          />

          <InputField
            title="Current Spending"
            description="Current amount spent"
            value={formatCurrency(budget.current)}
            onChangeText={(text) =>
              setBudget({ ...budget, current: parseCurrency(text) })
            }
            placeholder="0"
            keyboardType="numeric"
            inputIcon="VND"
            disabled={true}
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 20,
  },
  scrollView: {
    backgroundColor: COLORS.white,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: SIZES.h6,
    fontWeight: "bold",
  },
});

export default BudgetDetail;
