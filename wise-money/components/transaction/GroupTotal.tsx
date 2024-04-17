import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import styles from './style'
import { SIZES } from '../../constants';
import { Group } from './interface';

const GroupTotal: React.FC<{ transaction: Group }> = ({ transaction }) => {
    const handleClick = () => {
        // Handle click event here
        // Navigate to other page depending on type
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handleClick}>
            <View style={styles.left}>
                <Image source={{ uri: transaction.image }} style={styles.icon} />
            </View>
            <View style={styles.center}>
                <Text style={[styles.title, { fontSize: SIZES.h4 }]}>{transaction.name}</Text>
            </View>
            <View style={styles.right}>
                <Text style={transaction.type === 'DEBT' || transaction.type === 'EXPENSE' ? styles.red : styles.green}>{transaction.value.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'VND',
                    maximumFractionDigits: 0,
                })}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default GroupTotal;
