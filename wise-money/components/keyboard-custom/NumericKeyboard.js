import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { COLORS } from "../../constants";
import { useKeyboard } from "../../context/KeyboardContext";

const NumericKeyboard = () => {
  const { isKeyboardVisible, inputValue, setInputValue, closeKeyboard } =
    useKeyboard();

  // Function to add commas to a number to separate every three digits
  const addCommasToNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const formatInputValue = (input) => {
    // Remove existing commas and leading zeros
    const sanitizedInput = input.replace(/,/g, "").replace(/^0+/, "");

    // Add commas for every three digits
    return sanitizedInput.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const getLastInput = (input) => {
    // Reverse the input value to find the first operator or non-digit character
    const reversedInput = input.split("").reverse().join("");
    const operatorIndex = reversedInput.search(/[-+x/]/);
    // Extract the last Input by slicing the reversed input value
    const lastInput = reversedInput
      .slice(0, operatorIndex)
      .split("")
      .reverse()
      .join("");
    return lastInput;
  };

  const handleKeyPress = (key) => {
    switch (key) {
      case "C":
        setInputValue("");
        break;
      case ".":
        const lastChar = inputValue.slice(-1);
        const lastCharIsOperator = "+-x/".includes(lastChar);

        if (lastCharIsOperator) {
          setInputValue((prevValue) => prevValue + "0.");
        } else {
          const lastInput = getLastInput(inputValue);
          const lastInputHasDot = /[.]/.test(lastInput);
          if (!lastInputHasDot) {
            setInputValue((prevValue) => prevValue + key);
          }
        }
        break;
      case "/":
      case "x":
      case "+":
      case "-":
        if (inputValue) {
          // Check if the last character is a digit or an operator
          const lastCharIsOperator = "+-x/".includes(inputValue.slice(-1));
          if (lastCharIsOperator) {
            // Replace the last character with the new operator
            setInputValue((prevValue) => prevValue.slice(0, -1) + key);
          } else {
            // Append the operator to the input value
            setInputValue((prevValue) => prevValue + key);
          }
        }
        break;
      case "del":
        const lastCharacter = inputValue.slice(-1);

        if (!isNaN(lastCharacter))
          setInputValue((prevValue) => {
            const deletedInput = prevValue.slice(0, -1);
            return formatInputValue(deletedInput.replace(/,/g, ""));
          });
        else {
          setInputValue((prevValue) => prevValue.slice(0, -1));
        }

        break;
      case "Done":
        const hasOperator = /[-+x/]/.test(inputValue);
        if (!hasOperator) {
          closeKeyboard();
        } else {
          try {
            const expression = inputValue.replace(/,/g, "").replace(/x/g, "*");
            let result = eval(expression); // Evaluate the expression

            // Check if the result has decimal digits
            if (result % 1 !== 0) {
              // If it has decimal digits, round it to 2 decimal places
              result = result.toFixed(2);
            }

            // Split the result into integer and decimal parts
            const [integerPart, decimalPart] = result.toString().split(".");

            // Add commas to the integer part
            const formattedIntegerPart = addCommasToNumber(integerPart);

            // Combine the integer and decimal parts
            const formattedResult = decimalPart
              ? `${formattedIntegerPart}.${decimalPart}`
              : formattedIntegerPart;

            console.log("result", formattedResult);
            setInputValue(formattedResult);
          } catch (error) {
            console.error("Error evaluating expression:", error); // Log the error message
          }
        }

        break;
      default:
        //setInputValue((prevValue) => prevValue + key);
        if (!isNaN(key) || key === ",") {
          // Check if there is a dot in the input value
          const lastInput = getLastInput(inputValue);
          if (lastInput.includes(".")) {
            // Check the number of digits after the dot
            const digitsAfterDot =
              lastInput.split(".")[1]?.length + key.length || 0;
            // Check if the number of digits after the dot exceeds 3
            if (digitsAfterDot <= 3) {
              setInputValue((prevValue) => prevValue + key);
            } else {
              alert("Maximum characters");
            }
          } else {
            // Format the input value and append the sanitized key
            setInputValue((prevValue) => formatInputValue(prevValue + key));
          }
        }

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

  return isKeyboardVisible ? (
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
        <View style={{ flex: 2, backgroundColor: "#077F08" }}>
          {renderKey("Done")}
        </View>
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#CCCCCC",
    flex: 1,
    flexDirection: "row",
    position: "absolute", // Position the keyboard container absolutely
    bottom: 0, // Align it to the bottom of the screen
    left: 0, // Ensure it starts from the left edge
    right: 0, // Ensure it ends at the right edge
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
    padding: 12,
  },
  keyText: {
    fontSize: 22,
    color: COLORS.primary,
  },
  doneButton: {
    marginTop: -1,
    color: "white",
    backgroundColor: COLORS.primary,
  },
  textDoneButton: {
    fontSize: 20,
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
