import React from 'react';
import { FlatList } from 'react-native';
import GroupTotal from './GroupTotal';
import { Group } from './interface';

const ListGroupTotal: React.FC<{ groups: Group[] }> = ({ groups }) => {
    const renderItem = ({ item }: { item: Group }) => {
        return <GroupTotal transaction={item} />;
    };

    return (
        <FlatList
            data={groups}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
        />
    );
};

export default ListGroupTotal;
