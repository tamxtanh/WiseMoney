//app/saving/index.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ModalCalendar from '../../components/modal-calendar/ModalCalendar';
import InputField from '../../components/interest-components/InputField';
import DatePickerField from '../../components/interest-components/DatePickerField';
import { styles } from './styles';
import { Stack } from 'expo-router';
import { COLORS } from '../../constants';

const Savings = () => {
    const [initialBalance, setInitialBalance] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [periodic, setPeriodic] = useState('Yearly');
    const [periodicAmount, setPeriodicAmount] = useState('');
    const [interest, setInterest] = useState('');
    const [tax, setTax] = useState('');
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [resultTable, setResultTable] = useState([]);
    const [summary, setSummary] = useState({
        finalBalance: '0',
        totalPrincipal: '0',
        totalInterest: '0',
        tax: '0',
        netInterest: '0',
    });

    const formatCurrency = (value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const parseCurrency = (value) => parseFloat(value.replace(/,/g, ''));

    const handleCalculate = () => {
        // Validation checks
        if (!initialBalance || !interest) {
            Alert.alert('Error', 'Initial Principal and Compound Interest Rate are required.');
            return;
        }

        if (endDate <= startDate) {
            Alert.alert('Error', 'Withdrawal Date must be after Deposit Date.');
            return;
        }
        const P = parseCurrency(initialBalance);
        const r = parseFloat(interest) / 100;
        const t = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24 * 365);
        const taxRate = parseFloat(tax) / 100;
        let periodicDeposit = parseCurrency(periodicAmount) || 0;

        let n;
        if (periodicDeposit === 0) {
            n = 12;
        }
        else {
            switch (periodic) {
                case 'Yearly':
                    n = 1;
                    break;
                case 'Quarterly':
                    n = 4;
                    break;
                case 'Monthly':
                    n = 12;
                    break;
                case 'Daily':
                    n = 365;
                    break;
                default:
                    n = 1;
            }
        }

        let balance = P;
        let result = [];
        let currentDate = new Date(startDate);
        let totalInterest = 0;

        for (let i = 1; i <= t * n; i++) {
            const interestEarned = balance * (r / n);
            balance += interestEarned;
            totalInterest += interestEarned;

            if (periodicDeposit > 0) balance += periodicDeposit;

            switch (periodic) {
                case 'Yearly':
                    currentDate.setFullYear(currentDate.getFullYear() + 1);
                    break;
                case 'Quarterly':
                    currentDate.setMonth(currentDate.getMonth() + 3);
                    break;
                case 'Monthly':
                    currentDate.setMonth(currentDate.getMonth() + 1);
                    break;
                case 'Daily':
                    currentDate.setDate(currentDate.getDate() + 1);
                    break;
                default:
                    break;
            }

            if (periodic === 'Daily') {
                if (i % 30 === 0) {
                    // Truncate decimal places for large numbers
                    const decimalPlaces = balance > 100000 ? 0 : 2;
                    const formattedBalance = formatCurrency(balance.toFixed(decimalPlaces));
                    const formattedTotal = formatCurrency(balance.toFixed(decimalPlaces));
                    result.push({
                        period: i / 30,
                        date: currentDate.toISOString().split('T')[0],
                        balance: formattedBalance,
                        total: formattedTotal,
                    });
                }
            } else {
                // Truncate decimal places for large numbers
                const decimalPlaces = balance > 100000 ? 0 : 2;
                const formattedBalance = formatCurrency(balance.toFixed(decimalPlaces));
                const formattedTotal = formatCurrency(balance.toFixed(decimalPlaces));
                result.push({
                    period: i,
                    date: currentDate.toISOString().split('T')[0],
                    balance: formattedBalance,
                    total: formattedTotal,
                });
            }
        }

        const taxAmount = totalInterest * taxRate || 0;
        const netInterest = totalInterest - taxAmount;
        const finalBalance = balance - taxAmount;

        setResultTable(result);
        setSummary({
            totalPrincipal: formatCurrency((P + periodicDeposit * t * n).toFixed(2)),
            totalInterest: formatCurrency(totalInterest.toFixed(2)),
            tax: formatCurrency(taxAmount.toFixed(2)),
            netInterest: formatCurrency(netInterest.toFixed(2)),
            finalBalance: formatCurrency(finalBalance.toFixed(2))
        });
    };

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            <Stack.Screen
                options={{
                    headerTitle: () => (
                        <View style={{ marginLeft: 0 }}>
                            <Text style={{ fontSize: 20, fontFamily: "InterSemiBold" }}>
                                Savings Calculator
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
                        title="Initial Principal"
                        description="The initial amount of your savings/investment"
                        value={formatCurrency(initialBalance)}
                        onChangeText={(text) => setInitialBalance(text.replace(/,/g, ''))}
                        placeholder="0"
                        keyboardType="numeric"
                        inputIcon="VND"
                    />

                    <DatePickerField
                        title="Deposit Date"
                        description="The date you start saving"
                        date={startDate}
                        showPicker={showStartDatePicker}
                        setShowPicker={setShowStartDatePicker}
                    />

                    <DatePickerField
                        title="Withdrawal Date"
                        description="The expected date to receive money"
                        date={endDate}
                        showPicker={showEndDatePicker}
                        setShowPicker={setShowEndDatePicker}
                    />

                    <View style={styles.component}>
                        <Text style={styles.title}>Periodic Deposit</Text>
                        <Text style={styles.description}>The term for adding principal</Text>
                        <View style={styles.inputContainer}>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={periodic}
                                    style={styles.picker}
                                    onValueChange={(itemValue) => setPeriodic(itemValue)}
                                >
                                    <Picker.Item label="Yearly" value="Yearly" />
                                    <Picker.Item label="Quarterly" value="Quarterly" />
                                    <Picker.Item label="Monthly" value="Monthly" />
                                    <Picker.Item label="Daily" value="Daily" />
                                </Picker>
                            </View>
                        </View>
                    </View>

                    <InputField
                        title="Periodic Amount"
                        description="The amount you plan to add to the principal"
                        value={formatCurrency(periodicAmount)}
                        onChangeText={(text) => setPeriodicAmount(text.replace(/,/g, ''))}
                        placeholder="0"
                        keyboardType="numeric"
                        inputIcon="VND"
                    />

                    <InputField
                        title="Compound Interest Rate"
                        description="The expected interest rate for your term"
                        value={interest}
                        onChangeText={setInterest}
                        placeholder="0"
                        keyboardType="numeric"
                        inputIcon="%"
                    />

                    <InputField
                        title="Personal Income Tax"
                        description="(If any)"
                        value={tax}
                        onChangeText={setTax}
                        placeholder="0"
                        keyboardType="numeric"
                        inputIcon="%"
                    />

                    <TouchableOpacity style={styles.calculateButton} onPress={handleCalculate}>
                        <Text style={styles.calculateButtonText}>Calculate</Text>
                    </TouchableOpacity>

                    <View style={styles.summary}>
                        <Text style={styles.summaryText}>
                            <Text style={styles.summaryTitle}>Final Balance: </Text>{summary.finalBalance} VND
                        </Text>
                        <Text style={styles.summaryText}>
                            <Text style={styles.summaryTitle}>Total Principal: </Text>{summary.totalPrincipal} VND
                        </Text>
                        <Text style={styles.summaryText}>
                            <Text style={styles.summaryTitle}>Total Interest: </Text>{summary.totalInterest} VND
                        </Text>
                        <Text style={styles.summaryText}>
                            <Text style={styles.summaryTitle}>Tax: </Text>{summary.tax} VND
                        </Text>
                        <Text style={styles.summaryText}>
                            <Text style={styles.summaryTitle}>Net Interest: </Text>{summary.netInterest} VND
                        </Text>
                    </View>

                    {resultTable.length > 0 ? (
                        <View style={styles.table}>
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableHeader, { flex: 3 }]}>Period</Text>
                                <Text style={styles.tableHeader}>Date</Text>
                                <Text style={styles.tableHeader}>Balance (VND)</Text>
                                <Text style={styles.tableHeader}>Total (VND)</Text>
                            </View>
                            {resultTable.map((row, index) => (
                                <View key={index} style={styles.tableRow}>
                                    <Text style={[styles.tableCell, { flex: 3 }]}>{row.period}</Text>
                                    <Text style={styles.tableCell}>{row.date}</Text>
                                    <Text style={styles.tableCell}>{row.balance}</Text>
                                    <Text style={styles.tableCell}>{row.total}</Text>
                                </View>
                            ))}
                        </View>
                    ) : (
                        <Text style={styles.summaryTitle}>There is no interest in this period!</Text>
                    )}

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
                </View>
            </ScrollView>
        </View>

    );
};

export default Savings;
