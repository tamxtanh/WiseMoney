import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { styles } from "./styles";
import { Stack } from "expo-router";
import { COLORS, FONT, icons } from "../../constants";
import SupabaseSingleton from "../../lib/supabaseSingleton";
import ModalCalendar from "../../components/modal-calendar/ModalCalendar";
import DateRangePicker from "../../components/modal-calendar/DateRangePicker";
import * as XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import InputField from "../../components/interest-components/InputField";
import DatePickerField from "../../components/interest-components/DatePickerField";

interface Category {
  id: number;
  name: string;
  type: string;
}

const ExportData: React.FC = () => {
  const supabase = SupabaseSingleton.getInstance().getClient();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState<boolean>(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserData();
      fetchCategories();
    };
    fetchData();
  }, [userId]);

  const fetchCategories = async () => {
    const { data, error } = await supabase.rpc("get_user_categories", {
      user_id: userId,
    });
    if (error) console.error(error);
    else {
      setCategories(data);
      setLoading(false);
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

  const fetchCategoryData = async () => {
    let { data, error } = await supabase.rpc("get_category_items", {
      category_ids: selectedCategories,
      end_date: endDate,
      start_date: startDate,
    });
    if (error) console.error(error);
    else {
      exportToXLSX(data);
    }
  };

  const exportToXLSX = async (data: any[]) => {
    const formattedData = data.map((item) => ({
      Date: item.date,
      Category: item.category_name,
      Name: item.item_name,
      Amount: item.amount,
      Note: item.note,
      "Money Type": item.type_name,
      Contact: item.contact_name,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    const wbout = XLSX.write(workbook, { type: "base64", bookType: "xlsx" });

    const uri = FileSystem.documentDirectory + "data.xlsx";

    await FileSystem.writeAsStringAsync(uri, wbout, {
      encoding: FileSystem.EncodingType.Base64,
    });

    Sharing.shareAsync(uri);
  };

  const handleExport = () => {
    if (startDate > endDate) {
      Alert.alert("Error", "Start date must be before end date.");
      return;
    }
    if (selectedCategories.length === 0) {
      Alert.alert("Error", "Please select at least one category.");
      return;
    }
    fetchDataAndExport();
  };

  const fetchDataAndExport = () => {
    fetchCategoryData();
  };

  const toggleCategory = (categoryId: number) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId)
      );
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const selectAllCategories = () => {
    const allCategoryIds = categories.map((category) => category.id);
    setSelectedCategories(allCategoryIds);
  };

  const deselectAllCategories = () => {
    setSelectedCategories([]);
  };

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
                Export Data
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
          <Text style={styles.title}>Select Date Range</Text>
          <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
            <DatePickerField
              title="Start Date"
              description="Select the start date for the data range"
              date={startDate}
              showPicker={showStartDatePicker}
              setShowPicker={setShowStartDatePicker}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
            <DatePickerField
              title="End Date"
              description="Select the end date for the data range"
              date={endDate}
              showPicker={showEndDatePicker}
              setShowPicker={setShowEndDatePicker}
            />
          </TouchableOpacity>

          <ModalCalendar
            visible={showStartDatePicker}
            close={() => setShowStartDatePicker(false)}
            selectedDate={startDate}
            setSelectedDate={setStartDate}
          />

          <ModalCalendar
            visible={showEndDatePicker}
            close={() => setShowEndDatePicker(false)}
            selectedDate={endDate}
            setSelectedDate={setEndDate}
          />

          <Text style={styles.title}>Select Categories</Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={styles.selectButton}
              onPress={selectAllCategories}
            >
              <Text style={styles.buttonText}>Select All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.selectButton}
              onPress={deselectAllCategories}
            >
              <Text style={styles.buttonText}>Deselect All</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.calculateButton}
            onPress={handleExport}
          >
            <Text style={styles.calculateButtonText}>Export</Text>
          </TouchableOpacity>

          {loading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : (
            <View style={styles.checkList}>
              {categories.map((category) => (
                <View key={category.id} style={styles.checkItemContainer}>
                  <TouchableOpacity
                    style={[
                      styles.checkbox,
                      selectedCategories.includes(category.id) &&
                      styles.checkboxSelected,
                    ]}
                    onPress={() => toggleCategory(category.id)}
                  >
                    {selectedCategories.includes(category.id) && (
                      <Text style={styles.checkboxText}>✔</Text>
                    )}
                  </TouchableOpacity>
                  <View style={styles.categoryTextContainer}>
                    <Text style={styles.checkItemText}>{category.name}</Text>
                    <Text style={styles.checkItemType}>{category.type}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default ExportData;
