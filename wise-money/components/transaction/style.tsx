import { fonts } from "react-native-elements/dist/config";
import { COLORS, FONT, SIZES } from "../../constants/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 65,
    width: "100%",
    backgroundColor: COLORS.background,
    paddingLeft: "4%",
    paddingRight: "5%",
  },
  left: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  center: {
    flex: 7,
    justifyContent: "center",
    marginLeft: 15,
  },
  right: {
    flex: 4,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  icon: {
    width: 38,
    height: 38,
    borderRadius: 25,
  },
  title: {
    fontSize: 16,
    fontFamily: FONT.medium,
  },
  subtitle: {
    color: COLORS.gray,
    fontSize: SIZES.h8,
    fontFamily: FONT.regular,
  },
  red: {
    color: COLORS.expense,
    fontSize: SIZES.h8,
    fontFamily: FONT.regular,
  },
  blue: {
    color: COLORS.income,
    fontSize: SIZES.h8,
    fontFamily: FONT.regular,
  },
});

export default styles;
