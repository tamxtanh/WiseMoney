// src/components/ExportDataScreen.tsx
import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Alert,
    ActivityIndicator,
} from "react-native";

import { Stack } from "expo-router";
import { COLORS } from "../../constants";
import { supabase } from "../../lib/supabase";
import { ExportReceiver } from "./receiver";

import { ExportCommand } from "./exportCommand";
import { styles } from "./styles";
import DatePickerField from "../../components/interest-components/DatePickerField";
import DateTimePicker from "@react-native-community/datetimepicker";
import { CommandInvoker } from "./invoker";



interface Category {
    id: number;
    name: string;
    type: string;
}

const ExportDataScreen: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [showStartDatePicker, setShowStartDatePicker] = useState<boolean>(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState<boolean>(false);
    const [userId, setUserId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    const receiver = new ExportReceiver();
    const invoker = new CommandInvoker();

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
        const { data, error } = await supabase.rpc("get_category_items", {
            category_ids: selectedCategories,
            end_date: endDate,
            start_date: startDate,
        });
        if (error) console.error(error);
        else {
            const exportCommand = new ExportCommand(receiver, data);
            invoker.addCommand(exportCommand);
            await invoker.executeCommands();
        }
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
        fetchCategoryData();
    };

    const toggleCategory = (categoryId: number) => {
        setSelectedCategories((prev) =>
            prev.includes(categoryId)
                ? prev.filter((id) => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    const selectAllCategories = () => {
        setSelectedCategories(categories.map((category) => category.id));
    };

    const deselectAllCategories = () => {
        setSelectedCategories([]);
    };

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            <Stack.Screen
                options={{
                    headerTitle: () => (
                        <View>
                            <Text style={{ fontSize: 20, color: "white" }}>Export Data</Text>
                        </View>
                    ),
                    headerStyle: { backgroundColor: COLORS.primary },
                    headerTitleAlign: "center",
                    headerTintColor: "white",
                }}
            />
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <Text style={styles.title}>Select Date Range</Text>
                    {/* Date Pickers */}
                    <DatePickerField
                        title="Start Date"
                        description="Select the end date for your savings"
                        date={startDate}
                        showPicker={showStartDatePicker}
                        setShowPicker={setShowStartDatePicker}
                    />
                    {showStartDatePicker && (
                        <DateTimePicker
                            value={startDate}
                            mode="date"
                            display="default"
                            onChange={(event, selectedDate) => {
                                setShowStartDatePicker(false);
                                if (selectedDate) setStartDate(selectedDate);
                            }}
                        />
                    )}
                    <DatePickerField
                        title="End Date"
                        description="Select the end date for your savings"
                        date={endDate}
                        showPicker={showEndDatePicker}
                        setShowPicker={setShowEndDatePicker}
                    />
                    {showEndDatePicker && (
                        <DateTimePicker
                            value={endDate}
                            mode="date"
                            display="default"
                            onChange={(event, selectedDate) => {
                                setShowEndDatePicker(false);
                                if (selectedDate) setEndDate(selectedDate);
                            }}
                        />
                    )}

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
                                    <Text style={styles.checkItemText}>{category.name}</Text>
                                </View>
                            ))}
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

export default ExportDataScreen;
