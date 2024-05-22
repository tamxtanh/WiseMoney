//app/components/interest-components/InputField.tsx
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants';

const InputField = ({ title, description, value, onChangeText, placeholder, keyboardType, inputIcon }) => {
    return (
        <View style={styles.component}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    keyboardType={keyboardType}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                />
                <View style={styles.iconContainer}>
                    <Text style={styles.inputIcon}>{inputIcon}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    component: {
        marginBottom: 20,
    },
    title: {
        fontSize: SIZES.h5,
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
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputIcon: {
        fontSize: SIZES.h6,
        color: 'gray',
    },
});

export default InputField;
