import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import styles from './style'
import { CategoryTransaction } from './interface';

const TransactionWithName: React.FC<{ transaction: CategoryTransaction }> = ({ transaction }) => {
    const handleClick = () => {
        // Handle click event here
        // Navigate to other page depending on type
    };

    // useEffect(() => {
    //     console.log("transaction: ", transaction)

    // }, [])

    return (
        <TouchableOpacity style={styles.container} onPress={handleClick}>
            <View style={styles.left}>
                <Image source={{ uri: transaction.image_url }} style={styles.icon} />
            </View>
            <View style={styles.center}>
                <Text style={styles.title}>{transaction.category_name}</Text>
                <Text style={styles.subtitle}>{transaction.name}</Text>
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



export default TransactionWithName;
