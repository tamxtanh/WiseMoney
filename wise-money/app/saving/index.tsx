import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ModalCalendar from '../../components/modal-calendar/ModalCalendar';
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
    const [resultTable, setResultTable] = useState<{ times: number; date: string; balance: string; total: string }[]>([]);

    const formatCurrency = (value: number) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const handleCalculate = () => {
        // Implement your calculation logic here
        setResultTable([
            { times: 1, date: '2024-01-31', balance: '10,000,000', total: '10,500,000' },
            { times: 2, date: '2024-02-29', balance: '20,000,000', total: '21,000,000' },
            // Add more rows as per the calculation
        ]);
    };

    return (
        <ScrollView style={styles.scrollView}>

            <View style={styles.container}>
                {/* Initial Balance Component */}
                <View style={styles.component}>
                    <Text style={styles.title}>Initial balance</Text>
                    <Text style={styles.description}>The initial amount of your saving money</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, styles.flex5]}
                            keyboardType="numeric"
                            value={initialBalance}
                            onChangeText={(text) => setInitialBalance(formatCurrency(text))}
                            placeholder="0"
                        />
                        <Text style={[styles.label, styles.flex1]}>VND</Text>
                    </View>
                </View>

                {/* Start Date Component */}
                <View style={styles.component}>
                    <Text style={styles.title}>Start date</Text>
                    <Text style={styles.description}>The date you first start saving</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, styles.flex5]}
                            value={startDate.toISOString().split('T')[0]}
                            editable={false}
                        />
                        <TouchableOpacity style={[styles.button, styles.flex1]} onPress={() => setShowStartDatePicker(true)}>
                            <Text style={styles.buttonText}>📅</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* End Date Component */}
                <View style={styles.component}>
                    <Text style={styles.title}>End date</Text>
                    <Text style={styles.description}>The date you want to withdraw your saving</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, styles.flex5]}
                            value={endDate.toISOString().split('T')[0]}
                            editable={false}
                        />
                        <TouchableOpacity style={[styles.button, styles.flex1]} onPress={() => setShowEndDatePicker(true)}>
                            <Text style={styles.buttonText}>📅</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Periodically Component */}
                <View style={styles.component}>
                    <Text style={styles.title}>Periodically</Text>
                    <Text style={styles.description}>The time that you will add your savings periodically</Text>
                    <View style={styles.inputContainer}>
                        <Picker
                            selectedValue={periodic}
                            style={styles.input}
                            onValueChange={(itemValue) => setPeriodic(itemValue)}
                        >
                            <Picker.Item label="Yearly" value="Yearly" />
                            <Picker.Item label="Monthly" value="Monthly" />
                            <Picker.Item label="Weekly" value="Weekly" />
                            <Picker.Item label="Daily" value="Daily" />
                        </Picker>
                    </View>
                </View>

                {/* Periodic Amount Component */}
                <View style={styles.component}>
                    <Text style={styles.title}>Amount of money</Text>
                    <Text style={styles.description}>The amount of money that you will save every periodic</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, styles.flex5]}
                            keyboardType="numeric"
                            value={periodicAmount}
                            onChangeText={(text) => setPeriodicAmount(formatCurrency(text))}
                            placeholder="0"
                        />
                        <Text style={[styles.label, styles.flex1]}>VND</Text>
                    </View>
                </View>

                {/* Interest Component */}
                <View style={styles.component}>
                    <Text style={styles.title}>Interest</Text>
                    <Text style={styles.description}>The predicted interest of your savings</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, styles.flex5]}
                            keyboardType="numeric"
                            value={interest}
                            onChangeText={setInterest}
                            placeholder="0"
                        />
                        <Text style={[styles.label, styles.flex1]}>%</Text>
                    </View>
                </View>

                {/* Tax Component */}
                <View style={styles.component}>
                    <Text style={styles.title}>Tax</Text>
                    <Text style={styles.description}>The personal tax bases on your interest amount</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, styles.flex5]}
                            keyboardType="numeric"
                            value={tax}
                            onChangeText={setTax}
                            placeholder="0"
                        />
                        <Text style={[styles.label, styles.flex1]}>%</Text>
                    </View>
                </View>

                {/* Calculate Button */}
                <TouchableOpacity style={styles.calculateButton} onPress={handleCalculate}>
                    <Text style={styles.calculateButtonText}>Calculate</Text>
                </TouchableOpacity>

                {/* Result Table */}
                {resultTable.length > 0 && (
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableHeader}>Times</Text>
                            <Text style={styles.tableHeader}>Date</Text>
                            <Text style={styles.tableHeader}>Balance (VND)</Text>
                            <Text style={styles.tableHeader}>Total (VND)</Text>
                        </View>
                        {resultTable.map((row, index) => (
                            <View key={index} style={styles.tableRow}>
                                <Text style={styles.tableCell}>{row.times}</Text>
                                <Text style={styles.tableCell}>{row.date}</Text>
                                <Text style={styles.tableCell}>{row.balance}</Text>
                                <Text style={styles.tableCell}>{row.total}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* ModalCalendar for Start Date */}
                <ModalCalendar
                    visible={showStartDatePicker}
                    close={() => setShowStartDatePicker(false)}
                    selectedDate={startDate}
                    setSelectedDate={setStartDate}
                />

                {/* ModalCalendar for End Date */}
                <ModalCalendar
                    visible={showEndDatePicker}
                    close={() => setShowEndDatePicker(false)}
                    selectedDate={endDate}
                    setSelectedDate={setEndDate}
                />
            </View>
        </ScrollView>
    );
};

export default Savings;

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: COLORS.background,
    },
    component: {
        marginBottom: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
    },
    flex5: {
        flex: 5,
    },
    flex1: {
        flex: 1,
        textAlign: 'center',
    },
    label: {
        paddingLeft: 10,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
    },
    calculateButton: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    calculateButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    table: {
        marginTop: 20,
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 10,
    },
    tableHeader: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tableCell: {
        flex: 1,
        textAlign: 'center',
    },
});
