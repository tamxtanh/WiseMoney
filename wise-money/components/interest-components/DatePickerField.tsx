//app/components/interest-components/DatePickerField.tsx
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants';

const DatePickerField = ({ title, description, date, showPicker, setShowPicker }) => {
    return (
        <View style={styles.component}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={date.toISOString().split('T')[0]}
                    editable={false}
                />
                <TouchableOpacity style={styles.iconContainer} onPress={() => setShowPicker(true)}>
                    <Text style={styles.inputIcon}>📅</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    component: {
        marginBottom: 20,
    },
    title: {
        fontSize: SIZES.h6,
        fontWeight: 'bold',
    },
    description: {
        fontSize: SIZES.h8,
        color: 'gray',
        marginBottom: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: 4,
    },
    input: {
        flex: 1,
        padding: 10,
        fontSize: SIZES.h6
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    inputIcon: {
        fontSize: SIZES.h6,
        color: 'gray',
    },
});

export default DatePickerField;
