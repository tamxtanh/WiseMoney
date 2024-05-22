import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { styles } from './styles';
import { Stack } from 'expo-router';
import DatePickerField from '../../components/interest-components/DatePickerField';
import { COLORS } from '../../constants';

interface Category {
    id: string;
    name: string;
}

const ExportData: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [showStartDatePicker, setShowStartDatePicker] = useState<boolean>(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState<boolean>(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        // Empty function, you will handle fetching categories
    };

    const handleExport = () => {
        if (startDate > endDate) {
            Alert.alert('Error', 'Start date must be before end date.');
            return;
        }
        if (selectedCategories.length === 0) {
            Alert.alert('Error', 'Please select at least one category.');
            return;
        }
        fetchDataAndExport();
    };

    const fetchDataAndExport = () => {
        // Empty function, you will handle fetching data and exporting to Excel
    };

    const toggleCategory = (categoryId: string) => {
        if (selectedCategories.includes(categoryId)) {
            setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
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
                            <Text style={{ fontSize: 20, fontFamily: "InterSemiBold" }}>
                                Export Data
                            </Text>
                        </View>
                    ),
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: COLORS.primary,
                    },
                }}
            />
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <Text style={styles.title}>Select Date Range</Text>
                    <DatePickerField
                        title="Start Date"
                        description="Select the start date for the data range"
                        date={startDate}
                        showPicker={showStartDatePicker}
                        setShowPicker={setShowStartDatePicker}
                    />
                    <DatePickerField
                        title="End Date"
                        description="Select the end date for the data range"
                        date={endDate}
                        showPicker={showEndDatePicker}
                        setShowPicker={setShowEndDatePicker}
                    />

                    <Text style={styles.title}>Select Categories</Text>
                    <View style={styles.buttonGroup}>
                        <TouchableOpacity style={styles.selectButton} onPress={selectAllCategories}>
                            <Text style={styles.buttonText}>Select All</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.selectButton} onPress={deselectAllCategories}>
                            <Text style={styles.buttonText}>Deselect All</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.checkList}>
                        {categories.map((category) => (
                            <TouchableOpacity key={category.id} style={styles.checkItem} onPress={() => toggleCategory(category.id)}>
                                <Text style={selectedCategories.includes(category.id) ? styles.selectedCheckItem : styles.checkItemText}>
                                    {category.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <TouchableOpacity style={styles.calculateButton} onPress={handleExport}>
                        <Text style={styles.calculateButtonText}>Export</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default ExportData;
