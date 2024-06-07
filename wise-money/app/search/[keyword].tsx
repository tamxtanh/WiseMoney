import React, { useId } from 'react';
import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import TransactionListWithDateWithoutImage from '../../components/transaction/TransactionListWithDateWithoutImage';
import { TextInput, TouchableOpacity, View, StyleSheet, ScrollView, Text, ActivityIndicator } from 'react-native';
import { icons, COLORS } from '../../constants';
import { Stack, useRouter } from 'expo-router';
import { supabase } from "../../lib/supabase";
import { DateTransactionWithoutImage } from '../../components/transaction/interface';
import TransactionWithDateWithoutImage from '../../components/transaction/TransactionWithDateWithoutImage';


const SearchPage = () => {
    const router = useRouter()
    const route = useRoute();
    const { keyword } = route.params //This has compile error but can run without problem
    const decodedKeyword = decodeURIComponent(keyword);
    const [searchValue, setSearchValue] = useState('');
    const [transactions, setTransactions] = useState<DateTransactionWithoutImage[]>([]);
    const [userId, setUserId] = useState(0)
    const [isLoading, setIsLoading] = useState(true);

    const getId = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        let { data, error } = await supabase
            .rpc('get_user_id_by_email', {
                user_email: user.email
            })
        if (error) console.error(error)
        else {
            setUserId(data);
        }
    }

    const fetchTransactionsByKeyword = async () => {
        const search = async () => {
            let { data, error } = await supabase
                .rpc('search_transactions', {
                    keyword: decodedKeyword,
                    user_id: userId
                })
            if (error) console.error(error)
            else {
                setTransactions(data);
            }
            setIsLoading(false); // Set loading state to false once data is fetched
        }
        search();
    };

    useEffect(() => {
        const fetchData = async () => {
            await getId()
        }
        fetchData();
    }, [])

    useEffect(() => {
        fetchTransactionsByKeyword()
    }, [userId])
    const handleSearch = async () => {
        // Only navigate if searchValue is not empty
        if (searchValue.trim() !== '') {
            // await setSearchValue(searchValue.replace(' ', '&'))
            router.replace("/search/" + searchValue);
        }
    };

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <Stack.Screen
                    options={{
                        headerTitle: () => (
                            <View style={{ marginLeft: 0 }}>
                                <Text style={{ fontSize: 20, fontFamily: "InterSemiBold" }}>
                                    Result for "{decodedKeyword}"
                                </Text>
                            </View>
                        ),

                        headerShadowVisible: false,
                        headerStyle: {
                            backgroundColor: COLORS.primary,
                        },
                    }}
                />
                <View style={styles.searchRow}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search..."
                        value={searchValue}
                        onChangeText={text => setSearchValue(text)}
                    />
                    <TouchableOpacity onPress={handleSearch}>
                        <icons.searchIcon fill={COLORS.primary} />
                    </TouchableOpacity>
                </View>
                {isLoading ? (
                    <ActivityIndicator size="large" color={COLORS.primary} />
                ) : transactions == null || transactions.length === 0 ? (
                    <Text>No transaction found</Text>
                ) : transactions.map((item: any, index: number) => (
                    <TransactionWithDateWithoutImage key={index} transaction={item} showSubtitle={true} />
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: COLORS.background
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.background
    },
    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchInput: {
        width: '80%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: COLORS.gray,
        marginRight: 10,
        marginVertical: 10,
        shadowColor: COLORS.gray,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 100,
        elevation: 5,
    },

});

export default SearchPage;
