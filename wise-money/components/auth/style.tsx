import { COLORS } from "../../constants/theme";
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    container: {
        padding: 25,
        flex: 1,
        backgroundColor: COLORS.background
    },
    card: {
        borderRadius: 20,
        backgroundColor: 'white',
        padding: 20,
        marginTop: 20,
        borderColor: COLORS.gray,
        borderWidth: 1
    },
    oneRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline'
    },
    fontSize: {
        fontSize: 18
    },
    formCenter: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    mt20: {
        marginTop: 20,
    },
    button: {
        backgroundColor: COLORS.primary,
        borderRadius: 20,
        width: 328,
        height: 56
    }
})

export default styles