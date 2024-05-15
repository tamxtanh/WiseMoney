import { COLORS, FONT, SIZES } from "../../../constants/theme"
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({


    button: {
        backgroundColor: COLORS.primary,
        borderRadius: 20,
        width: '100%',
        height: 'auto',
        padding: 20,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonTitle: {
        fontFamily: FONT.bold,
        fontSize: 18,
        color: COLORS.white,
    },
    textName: {
        fontFamily: FONT.bold,
        fontSize: SIZES.h3
    },

    infoContainer: {
        alignSelf: 'center',
        marginTop: 10,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: COLORS.gray,
        marginBottom: 10,
        alignSelf: 'center'
    },

    scrollView: {
        flex: 1,
        marginBottom: SIZES.heightBottomNavigation,
        backgroundColor: COLORS.background
    },
    container: {
        flex: 1,
    },

    otherUtilities: {
        backgroundColor: COLORS.background,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    lTitleBox: {
        fontSize: 16,
        fontFamily: "InterSemiBold",
        color: "#000000",
    },
    functionItem: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    functionTitle: {
        fontSize: SIZES.h7,
        fontFamily: FONT.medium
    },
    signOut: {
        backgroundColor: COLORS.primary,
        borderRadius: 20,
        width: '70%',
        height: 'auto',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    separator: {
        height: 10,
        backgroundColor: COLORS.gray2,
        marginVertical: 10 // Adjust as needed for spacing
    }
})

export default styles