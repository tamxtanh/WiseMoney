import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import styles from './style'
import { DateTransaction } from './interface';


const TransactionWithDate: React.FC<{ transaction: DateTransaction }> = ({ transaction }) => {
    const handleClick = () => {
        // Handle click event here
        // Navigate to other page depending on type
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handleClick}>
            <View style={styles.left}>
                {/* <Image source={{ uri: transaction.image }} style={styles.icon} /> */}
                <Image source={Number(transaction.image)} style={styles.icon} />
            </View>
            <View style={styles.center}>
                <Text style={styles.title}>{transaction.category_name}</Text>
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



export default TransactionWithDate;
