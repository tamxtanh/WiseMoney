import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "../../constants";

const NumericKeyboard = ({ value, setValue }) => {
  const handleKeyPress = (key) => {
    switch (key) {
      case "C":
        setValue("");
        break;
      case "/":
      case "x":
      case "+":
      case "-":
      case "000":
        setValue((prevValue) => prevValue + "," + key);
        break;
      case "del":
        setValue((prevValue) => prevValue.slice(0, -1));
        break;
      case "Done":
        // Perform any action needed when "done" is pressed
        break;
      default:
        setValue((prevValue) => prevValue + key);
        break;
    }
  };

  const renderKey = (key) => {
    const isDoneButton = key === "Done";
    const calculateCell = (key) => {
      if (["C", "/", "x", "del", "-", "+"].includes(key)) {
        return true;
      } else {
        return false;
      }
    };

    const isCalculateCell = calculateCell(key);

    return (
      <TouchableOpacity
        key={key}
        style={[
          styles.key,
          isDoneButton && styles.doneButton,
          isCalculateCell && styles.calCell,
        ]}
        onPress={() => handleKeyPress(key)}
      >
        <Text
          style={[
            styles.keyText,
            isDoneButton && styles.textDoneButton,
            isCalculateCell && styles.textCalCell,
          ]}
        >
          {key}
        </Text>
      </TouchableOpacity>
    );
  };

  const keyLeft = [
    ["C", "/", "x"],
    ["7", "8", "9"],
    ["4", "5", "6"],
    ["1", "2", "3"],
    ["0", "000", "."],
  ];

  const keyRight = ["Del", "+", "-"];

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {keyLeft.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((key) => renderKey(key))}
          </View>
        ))}
      </View>

      <View style={styles.rightContainer}>
        <View style={{}}>
          {renderKey("del")}
          {renderKey("+")}
          <TouchableOpacity
            style={[styles.key, styles.calCell, { marginTop: -2 }]}
            onPress={() => handleKeyPress("-")}
          >
            <Text
              style={[styles.keyText, styles.textCalCell, { marginTop: -2 }]}
            >
              -
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 2 }}>{renderKey("Done")}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  leftContainer: {
    flex: 3 / 4,
    flexDirection: "column",
  },
  rightContainer: {
    flex: 1 / 4,
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  key: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#D5D4DB",
    backgroundColor: "white",
    padding: 7,
  },
  keyText: {
    fontSize: 20,
    color: COLORS.primary,
  },
  doneButton: {
    marginTop: -1,
    color: "white",
    backgroundColor: COLORS.primary,
  },
  textDoneButton: {
    marginTop: -5,
    color: "white",
  },
  calCell: {
    backgroundColor: "#EEEEEE",
  },
  textCalCell: {
    fontFamily: "InterSemiBold",
  },
});

export default NumericKeyboard;
