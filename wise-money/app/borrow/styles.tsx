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
        paddingRight: 40,
    },
    inputIcon: {
        position: 'absolute',
        right: 10,
        fontSize: 18,
        color: '#666',
    },
    radioContainer: {
        flexDirection: 'column',  // Change to column
        justifyContent: 'flex-start',

    },
    radioOption: {
        marginVertical: 5,  // Add vertical margin for spacing
        padding: 10,        // Add padding for better touch area
        borderWidth: 1,     // Add border width
        borderColor: COLORS.gray, // Border color
        borderRadius: 5,    // Add border radius
        backgroundColor: COLORS.background, // Background color
    },
    radio: {
        fontSize: 16,
        color: COLORS.gray,
        paddingVertical: 10,
    },
    selectedRadio: {
        fontSize: 16,
        color: COLORS.primary,
        paddingVertical: 10,
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
    summary: {
        marginTop: 20,
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
        flexDirection: "row",
        paddingVertical: 2,
    },
    tableHeader: {
        flexDirection: "row",
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#f1f8ff",
        borderWidth: 1,
        borderColor: "#ccc",
    },
    tableCell: {
        flex: 1,
        textAlign: "center",
        padding: 8,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    tableTitle: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
    },
    tableHeaderText: {
        flex: 1,
        fontWeight: "bold",
        textAlign: "center",
        padding: 8,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    tableRowText: {
        flex: 1,
        textAlign: "center",
        padding: 8,
        borderWidth: 1,
        borderColor: "#ccc",
    },
});
