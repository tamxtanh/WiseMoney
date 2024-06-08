// app/budget/AddBudget.tsx
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import DatePickerField from '../../../components/interest-components/DatePickerField';
import InputField from '../../../components/interest-components/InputField';
import ModalCalendar from '../../../components/modal-calendar/ModalCalendar';
import CategorySelector from '../CategorySelector';
import { supabase } from '../../../lib/supabase';
import { COLORS, SIZES } from '../../../constants';
import { Stack, router } from 'expo-router';

interface Category {
    id: number;
    name: string;
    url: string;
}

const AddBudget: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [userId, setUserId] = useState<number | null>(null);

    const [budget, setBudget] = useState({
        name: '',
        start_date: new Date(),
        end_date: new Date(),
        amount: 0,
        category: 0,
    });

    const formatCurrency = (value: number) => String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const parseCurrency = (value: string) => parseFloat(value.replace(/,/g, ''));

    useEffect(() => {
        const fetchData = async () => {
            await fetchUserData();
            fetchCategories();
        };
        fetchData();
    }, [userId]);

    const fetchCategories = async () => {
        const { data, error } = await supabase
            .rpc('get_user_categories_by_type', {
                user_id: userId,
                p_type: 'expense',
            });
        if (error) console.error(error);
        else {
            setCategories(data);
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

    const createBudget = async () => {
        let { data, error } = await supabase
            .rpc('add_budget', {
                p_amount: budget.amount,
                p_category: budget.category,
                p_end_date: budget.end_date,
                p_name: budget.name,
                p_start_date: budget.start_date
            })
        if (error) console.error(error)
        else {
            router.back()
        }

    };

    const handleSave = () => {
        createBudget();
    };

    if (categories.length < 1) {
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
                            <Text style={{ fontSize: 20, fontFamily: "InterSemiBold" }}>
                                Create a new budget
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
                        onCategoryChange={(categoryId) => setBudget({ ...budget, category: categoryId })}
                        editable={true}
                    />

                    <DatePickerField
                        title="Start Date"
                        description="The start date of the budget"
                        date={budget.start_date}
                        showPicker={showStartDatePicker}
                        setShowPicker={setShowStartDatePicker}
                    />

                    <DatePickerField
                        title="End Date"
                        description="The end date of the budget"
                        date={budget.end_date}
                        showPicker={showEndDatePicker}
                        setShowPicker={setShowEndDatePicker}
                    />

                    <InputField
                        title="Amount"
                        description="Total budget amount"
                        value={formatCurrency(budget.amount)}
                        onChangeText={(text) => setBudget({ ...budget, amount: parseCurrency(text) })}
                        placeholder="0"
                        keyboardType="numeric"
                        inputIcon="VND"
                    />

                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                </View>

                <ModalCalendar
                    visible={showStartDatePicker}
                    close={() => setShowStartDatePicker(false)}
                    selectedDate={budget.start_date}
                    setSelectedDate={(date) => setBudget({ ...budget, start_date: date })}
                />

                <ModalCalendar
                    visible={showEndDatePicker}
                    close={() => setShowEndDatePicker(false)}
                    selectedDate={budget.end_date}
                    setSelectedDate={(date) => setBudget({ ...budget, end_date: date })}
                />
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
        alignItems: 'center',
        marginTop: 20,
    },
    saveButtonText: {
        color: COLORS.white,
        fontSize: SIZES.h6,
        fontWeight: 'bold',
    },
});

export default AddBudget;
