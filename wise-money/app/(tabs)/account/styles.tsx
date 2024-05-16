import { COLORS, FONT, SIZES } from "../../../constants/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    width: "100%",
    height: "auto",
    padding: 20,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTitle: {
    fontFamily: FONT.bold,
    fontSize: 18,
    color: COLORS.white,
  },
  textName: {
    fontFamily: FONT.bold,
    fontSize: SIZES.h3,
  },

  infoContainer: {
    backgroundColor: "white",
    // alignSelf: "center",
    // marginTop: 10,
    paddingVertical: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: COLORS.gray,
    marginBottom: 10,
    alignSelf: "center",
  },

  scrollView: {
    flex: 1,
    marginBottom: SIZES.heightBottomNavigation,
    backgroundColor: "#F3F2F7",
  },
  container: {
    flex: 1,
    backgroundColor: "#F3F2F7",
  },

  otherUtilities: {
    marginTop: 15,
    backgroundColor: COLORS.background,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  lTitleBox: {
    fontSize: 16,
    fontFamily: "InterSemiBold",
    color: "#000000",
  },
  functionItem: {
    paddingVertical: 17,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  functionTitle: {
    fontSize: 15,
    fontFamily: FONT.medium,
    color: "#212121",
  },
  signOut: {
    marginVertical: 20,
    backgroundColor: "white",
    borderRadius: 50,
    width: "90%",
    height: "auto",
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  textSignOut: {
    color: "#ed5d5d",
    fontSize: 15,
  },
  separator: {
    height: 10,
    backgroundColor: "#F3F2F7",
    marginVertical: 10, // Adjust as needed for spacing
  },
});

export default styles;
