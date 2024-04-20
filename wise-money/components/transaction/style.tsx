import { fonts } from "react-native-elements/dist/config";
import { COLORS, FONT, SIZES } from "../../constants/theme";
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 70,
        width: '100%',
        backgroundColor: COLORS.background,
        paddingLeft: "3%",
        paddingRight: "3%"
    },
    left: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    center: {
        flex: 7,
        justifyContent: 'center',
        marginLeft: 15
    },
    right: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    icon: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    title: {
        fontSize: SIZES.h6,
        fontFamily: FONT.medium
    },
    subtitle: {
        color: COLORS.gray,
        fontSize: SIZES.h8,
        fontFamily: FONT.regular
    },
    red: {
        color: COLORS.red,
        fontSize: SIZES.h7,
        fontFamily: FONT.regular
    },
    green: {
        color: COLORS.primary,
        fontSize: SIZES.h7,
        fontFamily: FONT.regular
    },
});

export default styles