import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Notification } from './interface';
import { COLORS, FONT, SIZES } from '../../constants';


const NotificationComponent: React.FC<{ notification: Notification }> = ({ notification }) => {
    const handleClick = () => {
        // Handle click event here
        // Navigate to other page depending on type
    };

    const formatDate = (date: Date) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    };

    return (
        <TouchableOpacity style={[styles.container, { backgroundColor: notification.is_read ? COLORS.white : COLORS.gray2 }]} onPress={handleClick}>
            <View style={styles.left}>
                <Image source={{ uri: notification.image_url.toString() }} style={styles.roundImage} />
            </View>
            <View style={styles.center}>
                <Text style={styles.name}>{notification.name}</Text>
                <Text style={styles.description} numberOfLines={2}>{notification.description}</Text>
                <Text style={styles.time}>{formatDate(notification.time)}</Text>
            </View>
            <TouchableOpacity style={styles.right}>
                <Text style={styles.more}>...</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 'auto',
        flexDirection: 'row',
        paddingBottom: 5,
        paddingTop: 5
    },
    left: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    },
    center: {
        flex: 6,
        justifyContent: 'flex-start',
    },
    right: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    roundImage: {
        width: 80,
        height: 80,
        borderRadius: 100,
    },
    name: {
        fontFamily: FONT.bold,
        fontSize: SIZES.h7,
    },
    description: {
        fontSize: SIZES.h8
    },
    time: {
        fontSize: SIZES.h9,
        fontFamily: FONT.medium,
        color: COLORS.gray,
    },
    more: {
        fontSize: SIZES.h1,
    },
});

export default NotificationComponent;
