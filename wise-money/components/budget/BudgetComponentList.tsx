import React from 'react';
import { FlatList } from 'react-native';
import BudgetComponent from './BudgetComponent';
import { BudgetData } from './interface';

const BudgetComponentList: React.FC<{ budgets: BudgetData[] }> = ({ budgets }) => {
    const renderItem = ({ item }: { item: BudgetData }) => {
        return <BudgetComponent budget={item} />;
    };

    return (
        <FlatList
            data={budgets}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
        />
    );
};

export default BudgetComponentList;
