// app/exchange-rate/index.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ExchangeCurrency from '../../components/exchange-rate/ExchangeCurrency';
import SwapButton from '../../components/exchange-rate/SwapButton';

const currencyList = [
    { name: 'USD', icon: 'dollar' },
    { name: 'VND', icon: 'dong' },
    // Add more currencies as needed
];

const ExchangeRateScreen: React.FC = () => {
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('VND');
    const [fromValue, setFromValue] = useState('1');
    const [toValue, setToValue] = useState('');
    const [exchangeRate, setExchangeRate] = useState(25000); // Example rate

    useEffect(() => {
        // Fetch exchange rate when component mounts or currencies change
        // fetchExchangeRate();
    }, [fromCurrency, toCurrency]);

    const fetchExchangeRate = async () => {
        // Implement API call to get exchange rate
        // setExchangeRate(fetchedRate);
    };

    const calculateToValue = (value: string) => {
        const toValue = (parseFloat(value) * exchangeRate).toString();
        setToValue(toValue);
    };

    const handleSwap = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
        setFromValue(toValue);
        calculateToValue(toValue);
    };

    return (
        <View style={styles.container}>
            <ExchangeCurrency
                label="From"
                currencyList={currencyList}
                currentCurrency={fromCurrency}
                value={fromValue}
                onValueChange={(value) => {
                    setFromValue(value);
                    calculateToValue(value);
                }}
                onCurrencyChange={setFromCurrency}
            />
            <SwapButton onPress={handleSwap} />
            <ExchangeCurrency
                label="To"
                currencyList={currencyList}
                currentCurrency={toCurrency}
                value={toValue}
                onValueChange={() => { }} // No-op since it's not editable
                onCurrencyChange={setToCurrency}
            />
            <Text style={styles.exchangeRate}>
                1 {fromCurrency} = {exchangeRate} {toCurrency}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    exchangeRate: {
        textAlign: 'center',
        marginVertical: 20,
        fontSize: 18,
    },
});

export default ExchangeRateScreen;
