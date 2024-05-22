import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import InputField from '../../components/interest-components/InputField';
import { styles } from './styles';
import { Stack } from 'expo-router';
import { COLORS } from '../../constants';

const Loan = () => {
    const [loanAmount, setLoanAmount] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [loanTerm, setLoanTerm] = useState('');
    const [calculationMethod, setCalculationMethod] = useState('Even Principal Payments');
    const [resultTable, setResultTable] = useState([]);
    const [summary, setSummary] = useState({
        totalLoanAmount: '0',
        totalLoanInterest: '0',
    });

    const formatCurrency = (value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const parseCurrency = (value) => parseFloat(value.replace(/,/g, ''));

    const handleCalculate = () => {
        if (!loanAmount || !interestRate || !loanTerm) {
            Alert.alert('Error', 'Loan Amount, Interest Rate, and Loan Term are required.');
            return;
        }

        const P = parseCurrency(loanAmount);
        const r = parseFloat(interestRate) / 100 / 12;
        const n = parseInt(loanTerm);
        let balance = P;
        let result = [];
        let totalInterest = 0;

        if (calculationMethod === 'Even Principal Payments') {
            const principalPayment = P / n;
            for (let i = 1; i <= n; i++) {
                const interestPayment = balance * r;
                const monthlyPayment = principalPayment + interestPayment;
                balance -= principalPayment;
                totalInterest += interestPayment;
                result.push({
                    period: i,
                    payment: formatCurrency(monthlyPayment.toFixed(2)),
                    endingBalance: formatCurrency(balance.toFixed(2)),
                });
            }
        } else {
            const monthlyPayment = (P * r) / (1 - (1 + r) ** -n);
            for (let i = 1; i <= n; i++) {
                const interestPayment = balance * r;
                const principalPayment = monthlyPayment - interestPayment;
                balance -= principalPayment;
                totalInterest += interestPayment;
                result.push({
                    period: i,
                    payment: formatCurrency(monthlyPayment.toFixed(2)),
                    endingBalance: formatCurrency(balance.toFixed(2)),
                });
            }
        }

        setResultTable(result);
        setSummary({
            totalLoanAmount: formatCurrency(P.toFixed(2)),
            totalLoanInterest: formatCurrency(totalInterest.toFixed(2)),
        });
    };

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            <Stack.Screen
                options={{
                    headerTitle: () => (
                        <View style={{ marginLeft: 0 }}>
                            <Text style={{ fontSize: 20, fontFamily: "InterSemiBold" }}>
                                Loan Calculator
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
                        title="Loan Amount"
                        description="The total amount of the loan"
                        value={formatCurrency(loanAmount)}
                        onChangeText={(text) => setLoanAmount(text.replace(/,/g, ''))}
                        placeholder="0"
                        keyboardType="numeric"
                        inputIcon="VND"
                    />

                    <InputField
                        title="Interest Rate"
                        description="The annual interest rate for the loan"
                        value={interestRate}
                        onChangeText={setInterestRate}
                        placeholder="0"
                        keyboardType="numeric"
                        inputIcon="%/year"
                    />

                    <InputField
                        title="Loan Term"
                        description="The term of the loan in months"
                        value={loanTerm}
                        onChangeText={setLoanTerm}
                        placeholder="0"
                        keyboardType="numeric"
                        inputIcon="month(s)"
                    />

                    <View style={styles.component}>
                        <Text style={styles.title}>Calculation Method</Text>
                        <Text style={styles.description}>Choose the method to calculate loan payments</Text>
                        <View style={styles.inputContainer}>
                            <View style={styles.radioContainer}>
                                <TouchableOpacity style={styles.radioOption} onPress={() => setCalculationMethod('Even Principal Payments')}>
                                    <Text style={calculationMethod === 'Even Principal Payments' ? styles.selectedRadio : styles.radio}>
                                        Even Principal Payments
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.radioOption} onPress={() => setCalculationMethod('Even Total Payments')}>
                                    <Text style={calculationMethod === 'Even Total Payments' ? styles.selectedRadio : styles.radio}>
                                        Even Total Payments
                                    </Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>

                    <TouchableOpacity style={styles.calculateButton} onPress={handleCalculate}>
                        <Text style={styles.calculateButtonText}>Calculate</Text>
                    </TouchableOpacity>

                    <View style={styles.summary}>
                        <Text style={styles.summaryText}>
                            <Text style={styles.summaryTitle}>Loan Amount: </Text>{summary.totalLoanAmount} VND
                        </Text>
                        <Text style={styles.summaryText}>
                            <Text style={styles.summaryTitle}>Total Loan Interest: </Text>{summary.totalLoanInterest} VND
                        </Text>
                    </View>

                    {resultTable.length > 0 ? (
                        <View style={styles.table}>
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableHeader, { flex: 3 }]}>Period</Text>
                                <Text style={styles.tableHeader}>Payment (VND)</Text>
                                <Text style={styles.tableHeader}>Ending Balance (VND)</Text>
                            </View>
                            {resultTable.map((row, index) => (
                                <View key={index} style={styles.tableRow}>
                                    <Text style={[styles.tableCell, { flex: 3 }]}>{row.period}</Text>
                                    <Text style={styles.tableCell}>{row.payment}</Text>
                                    <Text style={styles.tableCell}>{row.endingBalance}</Text>
                                </View>
                            ))}
                        </View>
                    ) : (
                        <Text style={styles.summaryTitle}>No loan calculation available!</Text>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

export default Loan;
