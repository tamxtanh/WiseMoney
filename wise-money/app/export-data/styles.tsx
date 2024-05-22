import { COLORS, FONT, SIZES } from '../../constants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: COLORS.background,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    datePickerContainer: {
        marginBottom: 20,
    },
    datePickerText: {
        fontSize: 16,
        color: COLORS.primary,
        marginBottom: 10,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    selectButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        padding: 10,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 16,
    },
    checkList: {
        marginBottom: 20,
    },
    checkItem: {
        padding: 10,
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: COLORS.white,
    },
    checkItemText: {
        fontSize: 16,
        color: COLORS.gray,
    },
    selectedCheckItem: {
        fontSize: 16,
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    calculateButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 20,
        width: '100%',
        height: 'auto',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    calculateButtonText: {
        fontFamily: FONT.bold,
        fontSize: 18,
        color: COLORS.white,
    },
});
