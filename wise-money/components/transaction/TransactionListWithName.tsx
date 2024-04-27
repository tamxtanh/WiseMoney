import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import TransactionWithName from './TransactionWithName';
import { COLORS, FONT, SIZES } from '../../constants';
import { ListTransactionADay } from './interface'


const ListTransactionWithName: React.FC<{ listTransactions: ListTransactionADay }> = ({ listTransactions }) => {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    useEffect(() => {
        console.log(listTransactions)
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <View style={styles.left}>
                    <Text style={styles.big}>{listTransactions.date.getDay()}</Text>
                </View>
                <View style={styles.center}>
                    <Text style={styles.weekday}>{weekdays[listTransactions.date.getDay()]}</Text>
                    <Text style={styles.gray}>{listTransactions.date.toLocaleDateString()}</Text>
                </View>
                <View style={styles.right}>
                    <Text style={listTransactions.total < 0 ? styles.red : styles.green}>{listTransactions.total.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'VND',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                    })}</Text>
                </View>
            </View>
            <View style={styles.separator} />
            <FlatList
                data={listTransactions.transactions}
                renderItem={({ item }) => <TransactionWithName transaction={item} />}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        flexDirection: 'column',
        marginBottom: 14
    },
    top: {
        height: 70,
        flexDirection: 'row',
        // backgroundColor: 'green',
    },
    left: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    center: {
        flex: 5,
        justifyContent: 'center',
    },
    right: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    big: {
        fontSize: 40,
        fontFamily: FONT.bold
    },
    weekday: {
        fontSize: SIZES.h6,
        fontFamily: FONT.medium
    },
    gray: {
        color: COLORS.gray,
    },
    red: {
        color: COLORS.red,
    },
    green: {
        color: COLORS.primary,
    },
    separator: {
        height: 1,
        backgroundColor: COLORS.gray2,
        width: "93%",
        alignSelf: "center"
    }
});

export default ListTransactionWithName;
