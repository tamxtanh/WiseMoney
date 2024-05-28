import React from 'react';
import { FlatList } from 'react-native';
import NotificationComponent from './NotificationComponent';
import { Notification } from './interface';
import { COLORS, SIZES } from '../../constants';

const NotificationComponentList: React.FC<{ notifications: Notification[] }> = ({ notifications }) => {
    const renderItem = ({ item }: { item: Notification }) => {
        return <NotificationComponent notification={item} />;
    };

    return (
        <FlatList
            style={{ flex: 1, backgroundColor: COLORS.background, margin: 0, padding: 0 }}
            data={notifications}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
        />
    );
};

export default NotificationComponentList;
