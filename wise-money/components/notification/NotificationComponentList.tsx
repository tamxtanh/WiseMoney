import React from 'react';
import { FlatList } from 'react-native';
import NotificationComponent from './NotificationComponent';
import { Notification } from './interface';

const NotificationComponentList: React.FC<{ notifications: Notification[] }> = ({ notifications }) => {
    const renderItem = ({ item }: { item: Notification }) => {
        return <NotificationComponent notification={item} />;
    };

    return (
        <FlatList
            style={{ marginBottom: '11%' }}
            data={notifications}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
        />
    );
};

export default NotificationComponentList;
