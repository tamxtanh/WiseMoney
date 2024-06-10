//components/budget/BudgetComponentList.tsx
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import BudgetComponent from './BudgetComponent';
import { BudgetData } from './interface';

const BudgetComponentList: React.FC<{ budgets: BudgetData[] }> = ({ budgets }) => {
    const renderItem = ({ item }: { item: BudgetData }) => {
        return (
            <View style={styles.cardContainer}>
                <BudgetComponent budget={item} />
            </View>
        );
    };

    return (
        <FlatList
            style={{ width: '100%' }}
            data={budgets}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
        />
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        marginBottom: 10,
    },
    listContainer: {
        padding: 5,
        // backgroundColor: 'red'
    },
});

export default BudgetComponentList;
