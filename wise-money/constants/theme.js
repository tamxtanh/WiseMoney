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
<<<<<<< HEAD
  white1: "#FCFCFC",
  red: "red",
  textColor1: "#91919F",
  textColor2: "#212325",
=======
  whitee: "#ffffff",
  red: "red",
>>>>>>> f32b31fe76c528be2c5479562ff57267ff4e4fce
};

const FONT = {
  regular: "DMRegular",
  medium: "DMMedium",
  bold: "DMBold",
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
