import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import TransactionWithDateWithoutImage from './TransactionWithDateWithoutImage';
import { DateTransactionWithoutImage, TransactionListByCategory } from './interface'
import { COLORS, FONT, SIZES } from '../../constants';



const TransactionListWithDateWithoutImage: React.FC<{ data: TransactionListByCategory }> = ({ data }) => {
    const renderItem = ({ item }: { item: DateTransactionWithoutImage }) => (
        <TransactionWithDateWithoutImage transaction={item} />
    );

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <View style={styles.left}>
                    <Image source={{ uri: data.image_url }} style={styles.image} />
                </View>
                <View style={styles.center}>
                    <Text style={styles.title}>{data.title}</Text>
                    <Text style={styles.subtitle}>{data.subtitle} transactions</Text>
                </View>
                <View style={styles.right}>
                    <Text style={styles.total}>
                        {data.total.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'VND',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                        })}
                    </Text>
                </View>
            </View>
            <View style={styles.separator} />
            <FlatList
                data={data.transactions}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background
    },
    top: {
        flexDirection: 'row',
        height: 'auto',
        width: '100%',
        padding: 10,
        backgroundColor: COLORS.background
    },
    left: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 0,
        marginRight: 10
    },
    center: {
        flex: 3,
        justifyContent: 'center',
    },
    right: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    title: {
        fontFamily: FONT.bold,
        fontSize: SIZES.h5,
    },
    subtitle: {
        fontSize: SIZES.h8,
        fontFamily: FONT.regular
    },
    total: {
        color: 'black',
    },
    separator: {
        height: 1,
        backgroundColor: COLORS.gray2,
        width: "93%",
        alignSelf: "center"
    }
});

export default TransactionListWithDateWithoutImage;
