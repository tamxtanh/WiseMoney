// app/budget/TaxCalculation.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import InputField from '../../components/interest-components/InputField';
import { styles } from './styles';
import { Stack } from 'expo-router';
import { COLORS } from '../../constants';

const TaxCalculation = () => {
    const [amount, setAmount] = useState('');
    const [taxRate, setTaxRate] = useState('');
    const [taxAmount, setTaxAmount] = useState('');
    const [totalAmount, setTotalAmount] = useState('');

    const formatCurrency = (value: string) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const parseCurrency = (value: string) => parseFloat(value.replace(/,/g, ''));

    const handleCalculate = () => {
        if (!amount || !taxRate) {
            Alert.alert('Error', 'Amount and Tax Rate are required.');
            return;
        }

        const parsedAmount = parseCurrency(amount);
        const parsedTaxRate = parseFloat(taxRate) / 100;

        const calculatedTaxAmount = parsedAmount * parsedTaxRate;
        const calculatedTotalAmount = parsedAmount - calculatedTaxAmount;

        setTaxAmount(formatCurrency(calculatedTaxAmount.toFixed(2)));
        setTotalAmount(formatCurrency(calculatedTotalAmount.toFixed(2)));
    };

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            <Stack.Screen
                options={{
                    headerTitle: () => (
                        <View style={{ marginLeft: 0 }}>
                            <Text style={{ fontSize: 20, fontFamily: "InterSemiBold" }}>
                                Tax Calculator
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
                        title="Amount"
                        description="The total amount of money"
                        value={formatCurrency(amount)}
                        onChangeText={(text) => setAmount(text.replace(/,/g, ''))}
                        placeholder="0"
                        keyboardType="numeric"
                        inputIcon="VND"
                    />

                    <InputField
                        title="Tax Rate"
                        description="The tax rate"
                        value={taxRate}
                        onChangeText={setTaxRate}
                        placeholder="0"
                        keyboardType="numeric"
                        inputIcon="%"
                    />

                    <TouchableOpacity style={styles.calculateButton} onPress={handleCalculate}>
                        <Text style={styles.calculateButtonText}>Calculate</Text>
                    </TouchableOpacity>

                    <View style={styles.summary}>
                        <Text style={styles.summaryText}>
                            <Text style={styles.summaryTitle}>Tax Amount: </Text>{taxAmount} VND
                        </Text>
                        <Text style={styles.summaryText}>
                            <Text style={styles.summaryTitle}>Total Amount: </Text>{totalAmount} VND
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default TaxCalculation;
