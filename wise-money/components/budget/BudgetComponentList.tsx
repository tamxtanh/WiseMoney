import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import BudgetComponent from './BudgetComponent';
import { BudgetData } from './interface';
import { supabase } from '../../lib/supabase';

interface Props {
    budgets: BudgetData[];
    setBudgets: React.Dispatch<React.SetStateAction<BudgetData[]>>;
}

const BudgetComponentList: React.FC<Props> = ({ budgets, setBudgets }) => {
    const [refreshKey, setRefreshKey] = useState(0); // State to force refresh the list

    const onDeleteBudget = async (budgetId: number) => {

        let { data, error } = await supabase
            .rpc('delete_budget', {
                budget_id: budgetId
            })
        if (error) console.error(error)
        else {
            const updatedBudgets = budgets.filter(budget => budget.id !== budgetId);
            setBudgets(updatedBudgets);
            // Force re-render the list by updating refreshKey
            setRefreshKey(prevKey => prevKey + 1);
        }
    };

    const renderItem = ({ item }: { item: BudgetData }) => {
        return (
            <View style={styles.cardContainer}>
                <BudgetComponent key={item.id} budget={item} onDelete={() => onDeleteBudget(item.id)} />
            </View>
        );
    };

    return (
        <FlatList
            style={{ width: '100%' }}
            data={budgets}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            extraData={refreshKey} // Ensure re-render when refreshKey changes
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
