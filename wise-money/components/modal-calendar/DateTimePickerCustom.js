import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { COLORS, icons } from "../../constants";
import InputTransaction from "../transaction/InputTransaction";

const formatDate = (dateTimeObj) => {
  const dayOfWeek = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  }).format(dateTimeObj);
  const dateOptions = { day: "2-digit", month: "2-digit", year: "numeric" };

  const formattedDate = dateTimeObj
    .toLocaleDateString("en-US", dateOptions)
    .replace(/\//g, "-");

  const dateParts = formattedDate.split("-");

  return `${dayOfWeek}, ${dateParts[1]}/${dateParts[0]}/${dateParts[2]}`;
};
const formatDateTime = (dateTimeObj) => {
  const formattedDate = formatDate(dateTimeObj);
  const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: false };

  const formattedTime = dateTimeObj.toLocaleTimeString("en-US", timeOptions);

  return `${formattedDate} - ${formattedTime}`;
};

const DateTimePickerCustom = ({
  dateTimeMode = false,
  defaultMode = "date",
  selectedDate,
  setSelectedDate,
  iconSvg,
}) => {
  const onChange = (event, selectedValue, currentMode) => {
    const currentValue = selectedValue;

    if (currentMode == "date") {
      setSelectedDate(currentValue);

      if (dateTimeMode && event.type !== "dismissed") {
        showMode("time");
      }
    } else if (currentMode == "time") {
      setSelectedDate((prevSelectedDate) => {
        // Create a new Date object to avoid mutating the original state
        const updatedDateTime = new Date(prevSelectedDate);
        // Update the time part of the new Date object
        updatedDateTime.setHours(currentValue.getHours());
        updatedDateTime.setMinutes(currentValue.getMinutes());
        return updatedDateTime;
      });
    }
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: selectedDate,
      onChange: (event, selectedValue) =>
        onChange(event, selectedValue, currentMode),
      mode: currentMode,
      is24Hour: true,
      positiveButton: { label: "SELECT TIME", textColor: COLORS.primary },
      negativeButton: { label: "CANCEL", textColor: COLORS.primary },
    });
  };

  const showDateTimepicker = () => {
    showMode(defaultMode);
  };

  return (
    <TouchableOpacity onPress={showDateTimepicker}>
      <InputTransaction
        iconSvg={iconSvg}
        title={
          dateTimeMode ? formatDateTime(selectedDate) : formatDate(selectedDate)
        }
        textInputTransaction={{
          fontFamily: "InterMedium",
          fontSize: 15,
          color: "#010101",
        }}
      />
    </TouchableOpacity>
  );
};

export default DateTimePickerCustom;

const styles = StyleSheet.create({});
