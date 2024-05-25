// app/components/ExchangeCurrency.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Modal } from 'react-native';
import { currencyFlags } from '../../constants/icons';
import { COLORS, FONT, SIZES } from '../../constants';

interface ExchangeCurrencyProps {
    label: string;
    currencyList: { code: string; name: string; flag: string }[];
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
    const [query, setQuery] = useState('');
    const [selected, setSelected] = useState(currentCurrency);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        setSelected(currentCurrency);
    }, [currentCurrency]);

    const filteredCurrencies = currencyList.filter(currency =>
        currency.name.toLowerCase().includes(query.toLowerCase()) ||
        currency.code.toLowerCase().includes(query.toLowerCase())
    );

    const getFlagEmoji = (currencyCode: string) => {
        return currencyFlags[currencyCode] || "🏳️"; // Default to white flag if not found
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.main}>
                <TouchableOpacity onPress={() => setShowDropdown(true)}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.flag}>{getFlagEmoji(currentCurrency)} {selected} 🔻</Text>
                    </View>
                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                    value={value}
                    editable={label === 'From'}
                    keyboardType="numeric"
                    onChangeText={onValueChange}
                />
            </View>
            {showDropdown && (
                <Modal transparent={true} animationType="slide">
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <TextInput
                                style={styles.currencyInput}
                                placeholder="Search currency"
                                value={query}
                                onChangeText={setQuery}
                            />
                            <FlatList
                                data={filteredCurrencies}
                                keyExtractor={(item) => item.code}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => {
                                        setQuery('');
                                        setSelected(item.code);
                                        onCurrencyChange(item.code);
                                        setShowDropdown(false);
                                    }}>
                                        <View style={styles.currencyItem}>
                                            <Text style={styles.flag}>{getFlagEmoji(item.code)}</Text>
                                            <Text style={styles.currencyText}>{item.name} ({item.code})</Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                                style={styles.flatList}
                                ListEmptyComponent={<Text>No results</Text>}
                            />
                            <TouchableOpacity style={styles.close} onPress={() => setShowDropdown(false)} >
                                <Text style={styles.buttonTitle}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        padding: 20,
        margin: 20,
        backgroundColor: COLORS.white, // Assuming you have COLORS defined for background color
        borderRadius: 5,
        elevation: 3, // For shadow on Android
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2, // Adjust shadow blur as needed
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    main: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    flag: {
        fontSize: SIZES.h3,
        marginRight: 10,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        height: 40,
    },
    currencyInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        height: 'auto',
        width: '100%',
        marginBottom: 10,
        fontSize: SIZES.h6,
    },
    currencyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    currencyText: {
        marginLeft: 10,
        fontSize: SIZES.h7,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: COLORS.white,
        padding: 20,
        marginHorizontal: 10,
        borderRadius: 10,
    },
    flatList: {
        maxHeight: 400,
    },
    close: {
        backgroundColor: COLORS.primary,
        borderRadius: 20,
        width: 'auto',
        height: 'auto',
        padding: 15,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonTitle: {
        fontFamily: FONT.bold,
        fontSize: SIZES.h7,
        color: COLORS.white,
    },
});

export default ExchangeCurrency;
