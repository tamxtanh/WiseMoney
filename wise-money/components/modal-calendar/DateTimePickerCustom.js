import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  Platform,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useState } from "react";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { COLORS } from "../../constants";
import DateTimePicker from "@react-native-community/datetimepicker";

const DateTimePickerCustom = () => {
  //   const [date, setDate] = useState(new Date(1598051730000));

  //   console.log("date1", new Date(1598051730000));
  //   const onChange = (event, selectedDate) => {
  //     const currentDate = selectedDate;
  //     setDate(currentDate);
  //   };

  //   const showMode = (currentMode) => {
  //     DateTimePickerAndroid.open({
  //       value: date,
  //       onChange,
  //       mode: currentMode,
  //       is24Hour: true,
  //       positiveButton: { label: "SELECT TIME", textColor: COLORS.primary },
  //       negativeButton: { label: "CANCEL", textColor: COLORS.primary },
  //     });
  //   };

  //   const showDatepicker = () => {
  //     showMode("time");
  //     showMode("date");
  //   };

  //   const showTimepicker = () => {
  //     showMode("time");
  //   };

  //   return (
  //     <SafeAreaView>
  //       <Button onPress={showDatepicker} title="Show date picker!" />
  //       <Button onPress={showTimepicker} title="Show time picker!" />
  //       <Text>selected: {date.toLocaleString()}</Text>
  //     </SafeAreaView>
  //   );

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const [time, setTime] = useState(new Date());

  //   const onChange = (event, selectedDate) => {
  //     const currentDate = selectedDate || date;

  //     setDate(currentDate);
  //     setShow(Platform.OS === "ios" ? true : false);
  //   };

  const onChange = (event, selectedValue) => {
    setShow(Platform.OS === "ios");
    if (mode == "date") {
      const currentDate = selectedValue || new Date();
      setDate(currentDate);
      setMode("time");
      setShow(Platform.OS !== "ios"); // to show the picker again in time mode
    } else {
      const selectedTime = selectedValue || new Date();
      setTime(selectedTime);
      setShow(Platform.OS === "ios");
      setMode("date");
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatePicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const formatDate = (date, time) => {
    return `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()} ${time.getHours()}:${time.getMinutes()}`;
  };

  return (
    <View>
      <View>
        <TouchableOpacity onPress={showDatePicker}>
          <Text style={styles.title}>{formatDate(date, time)}</Text>
        </TouchableOpacity>
      </View>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default DateTimePickerCustom;

const styles = StyleSheet.create({});
