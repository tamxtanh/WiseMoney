// app/budget/CategorySelector.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Modal, Image } from 'react-native';
import { COLORS, FONT, SIZES } from '../../constants';

interface Category {
    id: number;
    name: string;
    url: string;
}

interface CategorySelectorProps {
    label: string;
    categoryList: Category[];
    currentCategory: number;
    onCategoryChange: (category: number) => void;
    editable?: boolean; // New optional prop for editability
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
    label,
    categoryList,
    currentCategory,
    onCategoryChange,
    editable = true, // Default to true if not provided
}) => {
    const [query, setQuery] = useState('');
    const [selected, setSelected] = useState<Category | null>(null);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const selectedCategory = categoryList.find(category => category.id === currentCategory);
        setSelected(selectedCategory || null);
    }, [currentCategory, categoryList]);

    const filteredCategories = categoryList.filter(category =>
        category.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.main}>
                <TouchableOpacity
                    style={styles.inputContainer}
                    onPress={() => editable && setShowDropdown(true)}
                    disabled={!editable} // Disable touchable when not editable
                >
                    {selected && (
                        <>
                            <Image source={{ uri: selected.url }} style={styles.image} />
                            <Text style={styles.selectedText}>{selected.name}</Text>
                        </>
                    )}
                    <Text style={styles.dropdownIcon}>🔻</Text>
                </TouchableOpacity>
            </View>
            {showDropdown && (
                <Modal transparent={true} animationType="slide">
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search category"
                                value={query}
                                onChangeText={setQuery}
                            />
                            <FlatList
                                data={filteredCategories}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => {
                                        setQuery('');
                                        setSelected(item);
                                        onCategoryChange(item.id);
                                        setShowDropdown(false);
                                    }}>
                                        <View style={styles.categoryItem}>
                                            <Image source={{ uri: item.url }} style={styles.image} />
                                            <Text style={styles.categoryText}>{item.name}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                                style={styles.flatList}
                                ListEmptyComponent={<Text>No results</Text>}
                            />
                            <TouchableOpacity style={styles.closeButton} onPress={() => setShowDropdown(false)} >
                                <Text style={styles.buttonTitle}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        width: '100%',
    },
    label: {
        fontSize: SIZES.h5,
        fontWeight: 'bold',
        marginBottom: 5
    },
    main: {
        width: '100%',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        height: 'auto',
        width: '100%',
        justifyContent: 'space-between',
        backgroundColor: COLORS.white, // Ensuring background color for visibility
    },
    selectedText: {
        marginLeft: 10,
        fontSize: SIZES.h6,
        flex: 1,
    },
    dropdownIcon: {
        fontSize: SIZES.h6,
    },
    searchInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        height: 'auto',
        marginBottom: 10,
        fontSize: SIZES.h6,
    },
    categoryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    categoryText: {
        marginLeft: 10,
        fontSize: SIZES.h7,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: COLORS.white,
        padding: 20,
        marginHorizontal: 10,
        borderRadius: 10,
    },
    flatList: {
        maxHeight: 400,
    },
    closeButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 20,
        padding: 15,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonTitle: {
        fontFamily: FONT.bold,
        fontSize: SIZES.h7,
        color: COLORS.white,
    },
    image: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
});

export default CategorySelector;
