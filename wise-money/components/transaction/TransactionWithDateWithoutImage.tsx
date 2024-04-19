import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { DateTransactionWithoutImage } from './interface';
import { COLORS, FONT, SIZES } from "../../constants/theme";

const TransactionWithDateWithoutImage: React.FC<{ transaction: DateTransactionWithoutImage }> = ({ transaction }) => {
    const handleClick = () => {
        // Handle click event here
        // Navigate to other page depending on type
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handleClick}>
            <View style={[styles.left]}>
                <Text style={styles.title}>{transaction.name}</Text>
                <Text style={styles.subtitle}>{transaction.date.toLocaleDateString()}</Text>
            </View>
            <View style={styles.right}>
                <Text style={transaction.type === 'DEBT' || transaction.type === 'EXPENSE' ? styles.red : styles.green}>{transaction.value.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'VND',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                })}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default TransactionWithDateWithoutImage;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 'auto',
        marginBottom: 10,
        marginTop: 5,
        width: '100%',
        backgroundColor: COLORS.background,
        paddingLeft: "3%",
        paddingRight: "3%"
    },
    left: {
        flex: 7,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    right: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    icon: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    title: {
        fontSize: SIZES.h6,
        fontFamily: FONT.medium
    },
    subtitle: {
        color: COLORS.gray,
        fontSize: SIZES.h8,
        fontFamily: FONT.regular
    },
    red: {
        color: COLORS.red,
    },
    green: {
        color: COLORS.primary,
    },
});
