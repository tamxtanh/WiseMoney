import { COLORS, FONT, SIZES } from '../../constants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    scrollView: {
        padding: 20,
    },
    container: {
        flex: 1,
        paddingBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    selectButton: {
        padding: 10,
        backgroundColor: COLORS.primary,
        borderRadius: 5,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 16,
    },
    checkList: {
        marginBottom: 20,
    },
    checkItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    checkboxSelected: {
        backgroundColor: COLORS.primary,
    },
    checkboxText: {
        color: COLORS.white,
        fontSize: 16,
    },
    categoryTextContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    checkItemText: {
        fontSize: 16,
    },
    checkItemType: {
        fontSize: 16,
        color: 'gray',
    },
    calculateButton: {
        padding: 15,
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        alignItems: 'center',
    },
    calculateButtonText: {
        color: COLORS.white,
        fontSize: 18,
    },
});