import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { StrategyFactory } from "./strategies";
import { SavingsCalculator } from "./savingCalculator";
import { styles } from "./styles";
import InputField from "./inputField";
import { Picker } from "@react-native-picker/picker";
import DatePickerField from "../../components/interest-components/DatePickerField";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Stack } from "expo-router";
import { COLORS } from "../../constants";

const Savings = () => {
    const [initialBalance, setInitialBalance] = useState("");
    const [interest, setInterest] = useState("");
    const [cycle, setCycle] = useState("Yearly");
    const [periodicAmount, setPeriodicAmount] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);
    const [summary, setSummary] = useState({
        finalBalance: "0",
        totalInterest: "0",
    });

    interface TableData {
        index: number;
        interest: string;
        totalBalance: string;
    }
    const [tableData, setTableData] = useState<TableData[]>([]);

    const handleCalculate = () => {
        if (!initialBalance || !interest) {
            Alert.alert("Error", "Initial Principal and Interest Rate are required.");
            return;
        }

        const principal = parseFloat(initialBalance);
        const rate = parseFloat(interest) / 100;
        const time = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24 * 365);
        const periodicDeposit = parseFloat(periodicAmount) || 0;

        if (time <= 0) {
            Alert.alert("Error", "End date must be after the start date.");
            return;
        }

        const strategy = StrategyFactory.getStrategy(cycle);
        const calculator = new SavingsCalculator(strategy);

        const result = calculator.calculate(principal, rate, time, periodicDeposit);

        setSummary({
            finalBalance: result.balance.toFixed(2),
            totalInterest: result.totalInterest.toFixed(2),
        });
        setTableData(result.resultTable.map((item, index) => ({
            index: index + 1,
            interest: item.interest,
            totalBalance: item.balance,
        })));
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
                                Savings Calculator
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
                    <InputField
                        title="Initial Principal"
                        value={initialBalance}
                        onChangeText={setInitialBalance}
                        placeholder="0"
                    />
                    <InputField
                        title="Interest Rate (%)"
                        value={interest}
                        onChangeText={setInterest}
                        placeholder="0"
                    />
                    <InputField
                        title="Periodic Deposit"
                        value={periodicAmount}
                        onChangeText={setPeriodicAmount}
                        placeholder="0"
                    />

                    <View style={styles.component}>
                        <Text style={styles.title}>Interest Cycle</Text>
                        <Picker
                            selectedValue={cycle}
                            onValueChange={(value) => setCycle(value)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Daily" value="daily" />
                            <Picker.Item label="Weekly" value="weekly" />
                            <Picker.Item label="Monthly" value="monthly" />
                            <Picker.Item label="Yearly" value="yearly" />
                        </Picker>
                    </View>

                    <DatePickerField
                        title="Start Date"
                        description="Select the start date for your savings"
                        date={startDate}
                        showPicker={showStartPicker}
                        setShowPicker={setShowStartPicker}
                    />
                    {showStartPicker && (
                        <DateTimePicker
                            value={startDate}
                            mode="date"
                            display="default"
                            onChange={(event, selectedDate) => {
                                setShowStartPicker(false);
                                if (selectedDate) setStartDate(selectedDate);
                            }}
                        />
                    )}
                    <DatePickerField
                        title="End Date"
                        description="Select the end date for your savings"
                        date={endDate}
                        showPicker={showEndPicker}
                        setShowPicker={setShowEndPicker}
                    />
                    {showEndPicker && (
                        <DateTimePicker
                            value={endDate}
                            mode="date"
                            display="default"
                            onChange={(event, selectedDate) => {
                                setShowEndPicker(false);
                                if (selectedDate) setEndDate(selectedDate);
                            }}
                        />
                    )}
                    <TouchableOpacity style={styles.calculateButton} onPress={handleCalculate}>
                        <Text style={styles.calculateButtonText}>Calculate</Text>
                    </TouchableOpacity>
                    <View style={styles.summary}>
                        <Text style={styles.summaryTitle}>Final Balance: {summary.finalBalance} VND</Text>
                        <Text style={styles.summaryTitle}>Total Interest: {summary.totalInterest} VND</Text>
                    </View>
                    <View style={styles.table}>
                        <Text style={styles.tableTitle}>Savings Table</Text>
                        <View style={styles.tableHeader}>
                            <Text style={styles.tableHeaderText}>Cycle</Text>
                            <Text style={styles.tableHeaderText}>Interest</Text>
                            <Text style={styles.tableHeaderText}>Total Balance</Text>
                        </View>
                        {tableData.map((row) => (
                            <View key={row.index} style={styles.tableRow}>
                                <Text style={styles.tableRowText}>{row.index}</Text>
                                <Text style={styles.tableRowText}>{parseFloat(row.interest).toLocaleString()}</Text>
                                <Text style={styles.tableRowText}>{parseFloat(row.totalBalance).toLocaleString()}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView >
        </View>
    );
};

export default Savings;
