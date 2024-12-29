//app/savings/inputField.tsx
import React from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardTypeOptions } from 'react-native';

const InputField = ({ title, value, onChangeText, placeholder, keyboardType = 'numeric' as KeyboardTypeOptions }) => {
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{title}</Text>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                keyboardType={keyboardType}
                placeholderTextColor="#999" // Optional: Adjust placeholder text color
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 15, // Adds spacing between input fields
        width: '100%', // Ensures inputs take full container width
    },
    inputLabel: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333', // Darker text for better readability
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        backgroundColor: '#fff', // White background for better contrast
        color: '#000', // Black text for better readability
    },
});

export default InputField;