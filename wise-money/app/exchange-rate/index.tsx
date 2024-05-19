// app/exchange-rate/index.tsx
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';
import ExchangeCurrency from '../../components/exchange-rate/ExchangeCurrency';
import SwapButton from '../../components/exchange-rate/SwapButton';
import { Stack } from 'expo-router';
import { COLORS, icons } from '../../constants';

const ExchangeRateScreen: React.FC = () => {
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('VND');
    const [fromValue, setFromValue] = useState('1');
    const [toValue, setToValue] = useState('');
    const [exchangeRates, setExchangeRates] = useState<{ [key: string]: number }>({});
    const [currencyList, setCurrencyList] = useState<Array<{ code: string, name: string, flag: string }>>([]);

    useEffect(() => {
        fetchCurrencies();
        fetchExchangeRates();
    }, []);

    const fetchCurrencies = async () => {
        try {
            const response = await axios.get('https://openexchangerates.org/api/currencies.json');
            const currencies = Object.keys(response.data).map(key => ({
                code: key,
                name: response.data[key],
                flag: key.slice(0, 2).toLowerCase(), // Assuming the first two letters of the currency code can represent the flag (not always accurate, but works for most)
            }));
            setCurrencyList(currencies);
        } catch (error) {
            console.error('Error fetching currencies:', error);
        }
    };

    const fetchExchangeRates = async () => {
        try {
            const response = await axios.get('https://openexchangerates.org/api/latest.json', {
                params: {
                    app_id: '534f6bdce2f9446cacd3a0909b0682cf',
                },
            });
            setExchangeRates(response.data.rates);
        } catch (error) {
            console.error('Error fetching exchange rates:', error);
        }
    };

    const calculateToValue = (from: string, to: string, value: string) => {
        const fromRate = exchangeRates[from];
        const toRate = exchangeRates[to];
        if (fromRate && toRate) {
            return (parseFloat(value) * toRate / fromRate).toFixed(2);
        }
        return '';
    };

    const handleFromValueChange = (value: string) => {
        setFromValue(value);
        const calculatedToValue = calculateToValue(fromCurrency, toCurrency, value);
        setToValue(calculatedToValue);
    };

    const handleCurrencyChange = (label: string, currency: string) => {
        if (label === 'From') {
            setFromCurrency(currency);
            const calculatedToValue = calculateToValue(currency, toCurrency, fromValue);
            setToValue(calculatedToValue);
        } else {
            setToCurrency(currency);
            const calculatedToValue = calculateToValue(fromCurrency, currency, fromValue);
            setToValue(calculatedToValue);
        }
    };

    const handleSwap = () => {
        const tempCurrency = fromCurrency;
        setFromCurrency(toCurrency);
        setToCurrency(tempCurrency);

        const tempValue = fromValue;
        setFromValue(toValue);
        setToValue(tempValue);
    };

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            <Stack.Screen
                options={{
                    headerTitle: () => (
                        <View style={{ marginLeft: 0 }}>
                            <Text style={{ fontSize: 20, fontFamily: "InterSemiBold" }}>
                                Currency Exchange Rate
                            </Text>
                        </View>
                    ),

                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: COLORS.primary,
                    },
                }}
            />
            <View style={styles.container}>
                <ExchangeCurrency
                    label="From"
                    currencyList={currencyList}
                    currentCurrency={fromCurrency}
                    value={fromValue}
                    onValueChange={handleFromValueChange}
                    onCurrencyChange={(currency) => handleCurrencyChange('From', currency)}
                />
                <SwapButton onPress={handleSwap} />
                <ExchangeCurrency
                    label="To"
                    currencyList={currencyList}
                    currentCurrency={toCurrency}
                    value={toValue}
                    onValueChange={setToValue}
                    onCurrencyChange={(currency) => handleCurrencyChange('To', currency)}
                />
                <Text style={styles.exchangeRateText}>
                    {`1 ${fromCurrency} = ${(exchangeRates[toCurrency] / exchangeRates[fromCurrency]).toFixed(7)} ${toCurrency}`}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20
    },
    exchangeRateText: {
        marginTop: 20,
        fontSize: 18,
        textAlign: 'center',
    },
});

export default ExchangeRateScreen;
