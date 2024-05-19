// app/components/SwapButton.tsx
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

interface SwapButtonProps {
    onPress: () => void;
}

const SwapButton: React.FC<SwapButtonProps> = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Icon name="swap-vertical" type="material-community" size={30} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
});

export default SwapButton;
