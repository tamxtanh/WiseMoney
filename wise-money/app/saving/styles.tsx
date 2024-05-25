//app/saving/styles.tsx
import { COLORS, FONT } from '../../constants';
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
    component: {
        marginBottom: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    input: {
        flex: 5,
        borderWidth: 1,
        borderColor: COLORS.gray,
        padding: 10,
        borderRadius: 5,
        paddingRight: 40, // To make room for the icon
    },
    inputIcon: {
        position: 'absolute',
        right: 10,
        fontSize: 18,
        color: '#666',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    pickerContainer: {
        flex: 5,
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: 5,
    },
    picker: {
        flex: 1,
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
    summary: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
    },
    summaryText: {
        fontSize: 16,
    },
    summaryTitle: {
        fontWeight: 'bold'
    },
    table: {
        marginTop: 20,
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 10,
    },
    tableHeader: {
        flex: 7,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tableCell: {
        flex: 7,
        textAlign: 'center',
    },

});
