// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
// import { LoanCalculationStrategies } from "./strategies";
// import { styles } from "./styles";
// import InputField from "./inputField";
// import { COLORS } from "../../constants";
// import { Stack } from "expo-router";


// const Loan = () => {
//     const [loanAmount, setLoanAmount] = useState("");
//     const [interestRate, setInterestRate] = useState("");
//     const [loanTerm, setLoanTerm] = useState("");
//     const [calculationMethod, setCalculationMethod] = useState("EVEN_PRINCIPAL");
//     const [resultTable, setResultTable] = useState([]);
//     const [summary, setSummary] = useState({ totalLoanAmount: "0", totalLoanInterest: "0" });

//     const formatCurrency = (value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//     const parseCurrency = (value) => parseFloat(value.replace(/,/g, ""));

//     const handleCalculate = () => {
//         if (!loanAmount || !interestRate || !loanTerm) {
//             Alert.alert("Error", "Loan Amount, Interest Rate, and Loan Term are required.");
//             return;
//         }

//         const P = parseCurrency(loanAmount);
//         const r = parseFloat(interestRate);
//         const n = parseInt(loanTerm);

//         const strategy = LoanCalculationStrategies[calculationMethod];
//         const { result, totalInterest } = strategy.calculate(P, r, n);

//         setResultTable(result);
//         setSummary({
//             totalLoanAmount: formatCurrency(P.toFixed(2)),
//             totalLoanInterest: formatCurrency(totalInterest.toFixed(2)),
//         });
//     };

//     return (
//         <View style={{ flex: 1, backgroundColor: COLORS.white }}>
//             <Stack.Screen
//                 options={{
//                     headerTitle: () => (
//                         <View style={{ marginLeft: 0 }}>
//                             <Text
//                                 style={{
//                                     fontSize: 20,
//                                     fontFamily: "InterSemiBold",
//                                     color: "white",
//                                 }}
//                             >
//                                 Loan Calculator
//                             </Text>
//                         </View>
//                     ),

//                     headerShadowVisible: false,
//                     headerStyle: {
//                         backgroundColor: COLORS.primary,
//                     },
//                     headerTitleAlign: "center",
//                     headerTintColor: "white",
//                 }}
//             />
//             <View style={{ flex: 1, backgroundColor: "#fff" }}>
//                 <ScrollView style={styles.scrollView}>
//                     <View style={styles.container}>
//                         <InputField
//                             title="Loan Amount"
//                             value={formatCurrency(loanAmount)}
//                             onChangeText={(text) => setLoanAmount(text.replace(/,/g, ""))}
//                             placeholder="0"
//                             keyboardType="numeric"
//                         />
//                         <InputField
//                             title="Interest Rate"
//                             value={interestRate}
//                             onChangeText={setInterestRate}
//                             placeholder="0"
//                             keyboardType="numeric"
//                         />
//                         <InputField
//                             title="Loan Term"
//                             value={loanTerm}
//                             onChangeText={setLoanTerm}
//                             placeholder="0"
//                             keyboardType="numeric"
//                         />
//                         <View style={styles.radioContainer}>
//                             <TouchableOpacity
//                                 style={styles.radioOption}
//                                 onPress={() => setCalculationMethod("EVEN_PRINCIPAL")}
//                             >
//                                 <Text
//                                     style={
//                                         calculationMethod === "EVEN_PRINCIPAL" ? styles.selectedRadio : styles.radio
//                                     }
//                                 >
//                                     Even Principal Payments
//                                 </Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity
//                                 style={styles.radioOption}
//                                 onPress={() => setCalculationMethod("EVEN_TOTAL")}
//                             >
//                                 <Text
//                                     style={
//                                         calculationMethod === "EVEN_TOTAL" ? styles.selectedRadio : styles.radio
//                                     }
//                                 >
//                                     Even Total Payments
//                                 </Text>
//                             </TouchableOpacity>
//                         </View>
//                         <TouchableOpacity style={styles.calculateButton} onPress={handleCalculate}>
//                             <Text style={styles.calculateButtonText}>Calculate</Text>
//                         </TouchableOpacity>
//                         <View style={styles.summary}>
//                             <Text style={styles.summaryText}>
//                                 Loan Amount: {summary.totalLoanAmount}
//                             </Text>
//                             <Text style={styles.summaryText}>
//                                 Total Interest: {summary.totalLoanInterest}
//                             </Text>
//                         </View>

//                         <View style={styles.table}>
//                             <Text style={styles.tableTitle}>Savings Table</Text>
//                             <View style={styles.tableHeader}>
//                                 <Text style={styles.tableHeaderText}>Period</Text>
//                                 <Text style={styles.tableHeaderText}>Payment</Text>
//                                 <Text style={styles.tableHeaderText}>Ending Balance</Text>
//                             </View>
//                             {resultTable.map((row) => (
//                                 <View key={row.period} style={styles.tableRow}>
//                                     <Text style={styles.tableRowText}>{row.period}</Text>
//                                     <Text style={styles.tableRowText}>{formatCurrency(row.payment)}</Text>
//                                     <Text style={styles.tableRowText}>{formatCurrency(row.endingBalance)}</Text>
//                                 </View>
//                             ))}
//                         </View>
//                     </View>
//                 </ScrollView>
//             </View>
//         </View>
//     );
// };

// export default Loan;

import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";

import { styles } from "./styles";
import InputField from "./inputField";
import { COLORS } from "../../constants";
import { Stack } from "expo-router";
import { LoanCalculatorContext } from "./loanCalculatorContext";
import { EvenPrincipalPaymentsStrategy } from "./evenPrincipalPaymentsStrategy";
import { EvenTotalPaymentsStrategy } from "./evenTotalPaymentsStrategy";


const Loan = () => {
    const [loanAmount, setLoanAmount] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [loanTerm, setLoanTerm] = useState("");
    const [calculationMethod, setCalculationMethod] = useState("EVEN_PRINCIPAL");
    const [resultTable, setResultTable] = useState([]);
    const [summary, setSummary] = useState({ totalLoanAmount: "0", totalLoanInterest: "0" });

    const formatCurrency = (value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const parseCurrency = (value) => parseFloat(value.replace(/,/g, ""));

    const loanCalculatorContext = new LoanCalculatorContext();

    const handleCalculate = () => {
        if (!loanAmount || !interestRate || !loanTerm) {
            Alert.alert("Error", "Loan Amount, Interest Rate, and Loan Term are required.");
            return;
        }

        const P = parseCurrency(loanAmount);
        const r = parseFloat(interestRate);
        const n = parseInt(loanTerm);

        const strategy =
            calculationMethod === "EVEN_PRINCIPAL"
                ? new EvenPrincipalPaymentsStrategy()
                : new EvenTotalPaymentsStrategy();

        loanCalculatorContext.setStrategy(strategy);
        const { result, totalInterest } = loanCalculatorContext.calculate(P, r, n);

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
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontFamily: "InterSemiBold",
                                    color: "white",
                                }}
                            >
                                Loan Calculator
                            </Text>
                        </View>
                    ),
                    headerShadowVisible: false,
                    headerStyle: { backgroundColor: COLORS.primary },
                    headerTitleAlign: "center",
                    headerTintColor: "white",
                }}
            />
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.container}>
                        <InputField
                            title="Loan Amount"
                            value={formatCurrency(loanAmount)}
                            onChangeText={(text) => setLoanAmount(text.replace(/,/g, ""))}
                            placeholder="0"
                            keyboardType="numeric"
                        />
                        <InputField
                            title="Interest Rate"
                            value={interestRate}
                            onChangeText={setInterestRate}
                            placeholder="0"
                            keyboardType="numeric"
                        />
                        <InputField
                            title="Loan Term"
                            value={loanTerm}
                            onChangeText={setLoanTerm}
                            placeholder="0"
                            keyboardType="numeric"
                        />
                        <View style={styles.radioContainer}>
                            <TouchableOpacity
                                style={styles.radioOption}
                                onPress={() => setCalculationMethod("EVEN_PRINCIPAL")}
                            >
                                <Text
                                    style={
                                        calculationMethod === "EVEN_PRINCIPAL" ? styles.selectedRadio : styles.radio
                                    }
                                >
                                    Even Principal Payments
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.radioOption}
                                onPress={() => setCalculationMethod("EVEN_TOTAL")}
                            >
                                <Text
                                    style={calculationMethod === "EVEN_TOTAL" ? styles.selectedRadio : styles.radio}
                                >
                                    Even Total Payments
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.calculateButton} onPress={handleCalculate}>
                            <Text style={styles.calculateButtonText}>Calculate</Text>
                        </TouchableOpacity>
                        <View style={styles.summary}>
                            <Text style={styles.summaryText}>
                                Loan Amount: {summary.totalLoanAmount}
                            </Text>
                            <Text style={styles.summaryText}>
                                Total Interest: {summary.totalLoanInterest}
                            </Text>
                        </View>

                        <View style={styles.table}>
                            <Text style={styles.tableTitle}>Loan Table</Text>
                            <View style={styles.tableHeader}>
                                <Text style={styles.tableHeaderText}>Period</Text>
                                <Text style={styles.tableHeaderText}>Payment</Text>
                                <Text style={styles.tableHeaderText}>Ending Balance</Text>
                            </View>
                            {resultTable.map((row) => (
                                <View key={row.period} style={styles.tableRow}>
                                    <Text style={styles.tableRowText}>{row.period}</Text>
                                    <Text style={styles.tableRowText}>{formatCurrency(row.payment)}</Text>
                                    <Text style={styles.tableRowText}>{formatCurrency(row.endingBalance)}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default Loan;
