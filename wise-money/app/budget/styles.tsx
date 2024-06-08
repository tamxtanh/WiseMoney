import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background
    },
    fab: {
        position: "absolute",
        width: 60,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        right: 30,
        bottom: 30,
        backgroundColor: COLORS.primary,
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
});
