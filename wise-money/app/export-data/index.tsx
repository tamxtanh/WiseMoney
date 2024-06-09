import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import { Stack } from 'expo-router';
import { COLORS, FONT, icons } from '../../constants';
import { supabase } from '../../lib/supabase';
import ModalCalendar from '../../components/modal-calendar/ModalCalendar';
import DateRangePicker from '../../components/modal-calendar/DateRangePicker';
import * as XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import InputField from '../../components/interest-components/InputField';

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
    const [isCustomRange, setIsCustomRange] = useState<boolean>(false);
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
        const { data, error } = await supabase
            .rpc('get_user_categories', { user_id: userId });
        if (error) console.error(error);
        else {
            setCategories(data);
            setLoading(false);
        }
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

    const fetchCategoryData = async () => {
        let { data, error } = await supabase
            .rpc('get_category_items', {
                category_ids: selectedCategories,
                end_date: endDate,
                start_date: startDate
            });
        if (error) console.error(error);
        else {
            exportToXLSX(data);
        }
    };

    const exportToXLSX = async (data: any[]) => {
        const formattedData = data.map(item => ({
            Date: item.date,
            Category: item.category_name,
            Name: item.item_name,
            Amount: item.amount,
            Note: item.note,
            'Money Type': item.type_name,
            Contact: item.contact_name
        }));

        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

        const wbout = XLSX.write(workbook, { type: 'base64', bookType: 'xlsx' });

        const uri = FileSystem.documentDirectory + 'data.xlsx';

        await FileSystem.writeAsStringAsync(uri, wbout, {
            encoding: FileSystem.EncodingType.Base64
        });

        Sharing.shareAsync(uri);
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
        fetchCategoryData();
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

    const closeRangeCustom = () => {
        setIsCustomRange(false);
    };

    const openRangeCustom = () => {
        setIsCustomRange(true);
    };

    const formatCustomDate = (startDate: Date, endDate: Date) => {
        const dateOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };

        const formattedStartDate = startDate.toLocaleDateString('en-US', dateOptions).split('/');
        const formattedEndDate = endDate.toLocaleDateString('en-US', dateOptions).split('/');

        return `${formattedStartDate[1]}/${formattedStartDate[0]}/${formattedStartDate[2]} - ${formattedEndDate[1]}/${formattedEndDate[0]}/${formattedEndDate[2]}`;
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
                    <TouchableOpacity onPress={openRangeCustom}>
                        {/* <View style={styles.datePickerField}>
                            <Text style={styles.datePickerTitle}>Date Range</Text>
                            <Text style={styles.datePickerDescription}>
                                Select the date range for the data range
                            </Text>
                            <Text style={styles.datePickerValue}>
                                {formatCustomDate(startDate, endDate)}
                            </Text>
                        </View> */}
                        <InputField
                            title="Date Range"
                            description="Select the date range for the data export"
                            value={formatCustomDate(startDate, endDate)}
                            disabled={true}
                            inputIcon={<icons.calenderClock fill={'black'} />}
                        />
                    </TouchableOpacity>

                    <DateRangePicker
                        visible={isCustomRange}
                        close={closeRangeCustom}
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                        setRangeOption={undefined} />

                    <Text style={styles.title}>Select Categories</Text>
                    <View style={styles.buttonGroup}>
                        <TouchableOpacity style={styles.selectButton} onPress={selectAllCategories}>
                            <Text style={styles.buttonText}>Select All</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.selectButton} onPress={deselectAllCategories}>
                            <Text style={styles.buttonText}>Deselect All</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.calculateButton} onPress={handleExport}>
                        <Text style={styles.calculateButtonText}>Export</Text>
                    </TouchableOpacity>

                    {loading ? (
                        <ActivityIndicator size="large" color={COLORS.primary} />
                    ) : (
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
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

export default ExportData;
