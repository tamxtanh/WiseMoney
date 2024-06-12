import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { COLORS, SIZES } from '../../constants';
import { BudgetData } from './interface';
import { useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase';

interface Props {
    budget: BudgetData;
    onDelete: () => void;
}

const BudgetComponent: React.FC<Props> = ({ budget, onDelete }) => {
    const router = useRouter();
    const today = new Date();
    const totalDays = Math.floor((budget.end_date.getTime() - budget.start_date.getTime()) / (1000 * 60 * 60 * 24) + 1);
    let passedDays = Math.floor((today.getTime() - budget.start_date.getTime()) / (1000 * 60 * 60 * 24) + 1);

    if (today < budget.start_date) {
        passedDays = 0;
    } else if (today > budget.end_date) {
        passedDays = totalDays;
    }

    const progress = Math.min(budget.current / budget.amount, 1); // Ensure progress does not exceed 100%
    const goToDetails = () => {
        router.push('budget/' + budget.id);
    };

    const handleDelete = () => {
        Alert.alert(
            'Confirm Deletion',
            'Are you sure you want to delete this budget?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: onDelete }
            ]
        );
    };

    const formatDate = (date: Date) => date.toISOString().split('T')[0];

    return (
        <View style={styles.card}>
            <TouchableOpacity onPress={goToDetails} style={styles.touchable}>
                <View style={styles.container}>
                    <View style={styles.top}>
                        <View style={styles.left}>
                            <Image source={{ uri: budget.image_url }} style={styles.image} resizeMode="contain" />
                            <View style={styles.info}>
                                <Text style={styles.name}>{budget.name}</Text>
                                <Text style={styles.dates}>
                                    {formatDate(budget.start_date)} - {formatDate(budget.end_date)}
                                </Text>

                            </View>
                        </View>
                        <View style={styles.right}>
                            {today > budget.end_date && (
                                <View style={styles.expiryBadge}>
                                    <Text style={styles.expiryText}>Expired</Text>
                                </View>
                            )}
                            <Text style={styles.amount}>{budget.amount.toLocaleString('it-IT')}</Text>
                            <Text style={styles.currentAmount}>{budget.current.toLocaleString('it-IT')}</Text>
                        </View>
                    </View>
                    <View style={styles.progressContainer}>
                        <ProgressBar progress={progress} color={COLORS.primary} style={styles.progressBar} />
                    </View>
                    <View style={styles.daysContainer}>
                        <Text style={styles.daysText}>{passedDays}/{totalDays} days</Text>
                    </View>
                </View>
            </TouchableOpacity>

            {/* Delete Button */}
            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                <Text style={styles.deleteButtonText}>X</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.background,
        borderRadius: 10,
        padding: 10,
        margin: 5,
        shadowColor: '#000',
        elevation: 10,
    },
    touchable: {
        flex: 1,
    },
    container: {
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    image: {
        width: 45,
        height: 45,
        borderRadius: 100,
        marginRight: 10,
    },
    info: {
        flex: 1,
    },
    name: {
        fontFamily: 'InterMedium',
        fontSize: 16,
        color: COLORS.textColor2,
    },
    dates: {
        fontFamily: 'InterRegular',
        fontSize: 12,
        color: COLORS.textColor3,
        marginBottom: 5,
    },
    currentAmount: {
        fontFamily: 'InterRegular',
        fontSize: SIZES.h7,
        color: COLORS.greenTarget,
    },
    right: {
        alignItems: 'flex-end',
    },
    expiryBadge: {
        borderColor: COLORS.expenseChart,
        borderWidth: 1,
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: 5,
        marginBottom: 5,
        marginTop: -3,
    },
    expiryText: {
        fontFamily: 'InterRegular',
        fontSize: 10,
        color: COLORS.redTarget,
    },
    amount: {
        fontFamily: 'InterMedium',
        fontSize: 16,
        color: COLORS.textColor2,
        alignSelf: 'flex-end',
    },
    progressContainer: {
        marginTop: 10,
    },
    progressBar: {
        height: 10,
    },
    daysContainer: {
        backgroundColor: COLORS.gray2,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 2,
        alignSelf: 'flex-start',
        marginTop: 10,
    },
    daysText: {
        fontFamily: 'InterRegular',
        fontSize: 12,
        color: 'black',
    },
    deleteButton: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: COLORS.redTarget,
        width: 25,
        height: 25,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    deleteButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default BudgetComponent;
