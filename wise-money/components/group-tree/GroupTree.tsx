import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { GroupTreeData } from './interface';
import { FONT, SIZES } from '../../constants';

const GroupTree: React.FC<{ data: GroupTreeData }> = ({ data }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.top}>
                <View style={styles.groupImageContainer}>
                    <Image source={{ uri: data.image_url }} style={styles.groupImage} />
                </View>
                <View style={styles.groupNameContainer}>
                    <Text style={styles.groupName}>{data.name}</Text>
                </View>
                <View style={styles.dotsContainer}>
                    <TouchableOpacity>
                        <Text style={styles.dots}>...</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>

            <FlatList
                data={data.list}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.itemRow}>
                        <View style={styles.treeLineContainer}>
                            <View style={styles.verticalLine} />
                            <View style={styles.horizontalLine} />
                        </View>
                        <View style={styles.categoryImageContainer}>
                            <Image source={{ uri: item.image_url }} style={styles.categoryImage} />
                        </View>
                        <View style={styles.categoryNameContainer}>
                            <Text style={styles.categoryName}>{item.name}</Text>
                        </View>
                        <View style={styles.dotsContainer}>
                            <TouchableOpacity >
                                <Text style={styles.dots}>...</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '40%',
        marginLeft: 5,
        marginTop: 5,
        marginBottom: 5
    },
    top: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 'auto',

    },
    groupImageContainer: {
        flex: 2,
        // backgroundColor: 'green',
        paddingRight: 25
    },
    groupImage: {
        height: 50,
        width: 50,
        borderRadius: 1000
    },
    groupNameContainer: {
        flex: 7
    },
    groupName: {
        fontFamily: FONT.medium,
        fontSize: SIZES.h4,
        marginLeft: -15,
    },
    dotsContainer: {
        flex: 1
    },
    dots: {
        fontFamily: FONT.bold,
        fontSize: SIZES.h5,
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 'auto',
    },
    categoryImageContainer: {
        flex: 2,
    },
    categoryImage: {
        borderRadius: 100,
        height: 40,
        width: 40,
        marginTop: 10,
        marginBottom: 10
    },
    categoryNameContainer: {
        flex: 7,
    },
    categoryName: {
        fontFamily: FONT.regular,
        fontSize: SIZES.h6,
        marginLeft: -15
    },
    treeLineContainer: {
        flex: 0,
        paddingLeft: 15,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        // paddingBottom: 0,
        // paddingTop: 0,
        // backgroundColor: 'green',
        marginTop: -50
    },
    verticalLine: {
        height: 60,
        borderLeftWidth: 2,
        borderColor: 'gray'
    },
    horizontalLine: {
        width: 15,
        borderTopWidth: 2,
        borderColor: 'gray',
        // marginTop: -50
    },
});

export default GroupTree;
