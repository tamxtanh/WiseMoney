import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { COLORS, FONT, SIZES } from '../../constants';
import { BudgetData } from './interface';

const BudgetComponent: React.FC<{ budget: BudgetData }> = ({ budget }) => {
    const today = new Date();
    const totalDays = Math.floor((budget.end_date.getTime() - budget.start_date.getTime()) / (1000 * 60 * 60 * 24));
    let passedDays = Math.floor((today.getTime() - budget.start_date.getTime()) / (1000 * 60 * 60 * 24));

    if (today < budget.start_date) {
        passedDays = 0;
    } else if (today > budget.end_date) {
        passedDays = totalDays;
    }

    const progress = Math.min(passedDays / totalDays, 1); // Ensure progress does not exceed 100%

    return (
        <View style={[styles.container, { backgroundColor: budget.current > budget.amount ? COLORS.background : COLORS.gray2 }]}>
            <View style={styles.top}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: budget.image_url }} style={styles.roundImage} />
                </View>
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>{budget.name}</Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>{budget.current.toLocaleString('it-IT')} VND/{budget.amount.toLocaleString('it-IT')} VND</Text>
                </View>
            </View>
            <View style={styles.bottom}>
                <View style={{ flex: 8 }}>
                    <ProgressBar progress={progress} color={COLORS.primary} style={styles.progressBar} />
                </View>
                <View style={{ flex: 2 }}>
                    <Text style={styles.days}>{passedDays}/{totalDays} days</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 'auto',
        backgroundColor: COLORS.background,
        width: '100%',
        padding: 5
    },
    top: {
        height: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    },
    nameContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    amountContainer: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'flex-end',
        padding: 5
    },
    bottom: {
        height: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    roundImage: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 100,
    },
    name: {
        fontFamily: FONT.bold,
        fontSize: SIZES.h7,
    },
    amount: {
        fontFamily: FONT.regular,
        fontSize: SIZES.h7,
    },
    progressBar: {
        height: 10,
        marginRight: 5,
        marginLeft: 5
    },
    days: {
        fontFamily: FONT.regular,
        fontSize: SIZES.h8,
        alignSelf: 'flex-end',
    },
});

export default BudgetComponent;
