import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { styles } from './styles';
import { Stack } from 'expo-router';
import DatePickerField from '../../components/interest-components/DatePickerField';
import { COLORS } from '../../constants';
import { supabase } from '../../lib/supabase';
import ModalCalendar from '../../components/modal-calendar/ModalCalendar';

interface Category {
    id: number;
    name: string;
    type: string;
}

const ExportData: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [showStartDatePicker, setShowStartDatePicker] = useState<boolean>(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState<boolean>(false);
    const [userId, setUserId] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            await fetchUserData();
            fetchCategories();
        };
        fetchData();
    }, [userId]);

    const fetchCategories = async () => {
        const { data, error } = await supabase
            .rpc('get_user_categories', { user_id: userId });
        if (error) console.error(error);
        else setCategories(data);
    };

    const fetchUserData = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            const { data, error } = await supabase
                .rpc('get_user_id_by_email', { user_email: user.email });
            if (error) console.error(error);
            else setUserId(data);
        }
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

    const toggleCategory = (categoryId: number) => {
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
                        <TouchableOpacity style={styles.selectButton} onPress={selectAllCategories}>
                            <Text style={styles.buttonText}>Select All</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.selectButton} onPress={deselectAllCategories}>
                            <Text style={styles.buttonText}>Deselect All</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.checkList}>
                        {categories.map((category) => (
                            <View key={category.id} style={styles.checkItemContainer}>
                                <TouchableOpacity
                                    style={[styles.checkbox, selectedCategories.includes(category.id) && styles.checkboxSelected]}
                                    onPress={() => toggleCategory(category.id)}>
                                    {selectedCategories.includes(category.id) && <Text style={styles.checkboxText}>✔</Text>}
                                </TouchableOpacity>
                                <View style={styles.categoryTextContainer}>
                                    <Text style={styles.checkItemText}>{category.name}</Text>
                                    <Text style={styles.checkItemType}>{category.type}</Text>
                                </View>
                            </View>
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
