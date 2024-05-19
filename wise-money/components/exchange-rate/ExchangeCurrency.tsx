// app/components/ExchangeCurrency.tsx
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface ExchangeCurrencyProps {
    label: string;
    currencyList: { name: string; icon: string }[];
    currentCurrency: string;
    value: string;
    onValueChange: (value: string) => void;
    onCurrencyChange: (currency: string) => void;
}

const ExchangeCurrency: React.FC<ExchangeCurrencyProps> = ({
    label,
    currencyList,
    currentCurrency,
    value,
    onValueChange,
    onCurrencyChange,
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.main}>
                <Picker
                    selectedValue={currentCurrency}
                    style={styles.picker}
                    onValueChange={onCurrencyChange}
                >
                    {currencyList.map((currency) => (
                        <Picker.Item key={currency.name} label={currency.name} value={currency.name} />
                    ))}
                </Picker>
                <TextInput
                    style={styles.input}
                    value={value}
                    editable={label === 'From'}
                    keyboardType="numeric"
                    onChangeText={onValueChange}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    main: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    picker: {
        flex: 1,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginLeft: 10,
    },
});

export default ExchangeCurrency;
