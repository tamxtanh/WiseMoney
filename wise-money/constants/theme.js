import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

const COLORS = {
  primary: "#2EB84B",
  secondary: "#444262",
  tertiary: "#FF7754",

  gray: "#83829A",
  gray2: "#C1C0C8",

  white: "#F3F4F8",
  lightWhite: "#FAFAFC",
  background: "white",

  lightMainColor: "#F0F9F1",

  white1: "#FCFCFC",
  red: "red",
  textColor1: "#91919F",
  textColor2: "#212325",
  textColor3: "#8A8A8C",

  whitee: "#ffffff",
  red: "red",
  income: "#30A0CC",
  expense: "#ED5D5D",
  expenseChart: "#f15b5b",
  expenseChartLight: "#ffabac",
};

const FONT = {
  regular: "InterRegular",
  medium: "InterMedium",
  bold: "InterBold",
  semiBold: "InterSemiBold",
};

const SIZES = {
  title: 30,
  h1: 28,
  h2: 26,
  h3: 24,
  h4: 22,
  h5: 20,
  h6: 18,
  h7: 16,
  h8: 14,
  h9: 12,
  h10: 10,
  width,
  height,
  heightBottomNavigation: 62,
};

const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

export { COLORS, FONT, SIZES, SHADOWS };
