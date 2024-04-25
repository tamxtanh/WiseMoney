import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Button,
} from "react-native";
import { Calendar } from "react-native-calendars";
import RNPickerSelect from "react-native-picker-select";
import { COLORS, icons } from "../../constants";
import DateTimePicker from '@react-native-community/datetimepicker';

const CustomArrow = ({ direction }) => {
  const icon =
    direction === "left"
      ? icons.arrowLeft({ fill: "#1C1B1F" })
      : icons.arrowRight({ fill: "#1C1B1F" });
  return <View>{icon}</View>;
};

const formatYMD = (date) => {
  return new Date(date).toISOString().substring(0, 10);
};

const changeYearOfDate = (year, date) => {
  const month = date.getMonth() + 1; // Adding 1 to convert from zero-based index to 1-based index
  const day = date.getDate();
  return year + "-" + month + "-" + day;
};

const ModalCalendar = ({
  visible,
  close,
  selectedDate,
  setSelectedDate,
  timePicker = false,
}) => {
  const [openTimePicker, setOpenTimePicker] = useState(false);

  const [selectedYear, setSelectedYear] = useState(selectedDate.getFullYear());
  const [initialDate, setInitialDate] = useState(formatYMD(selectedDate));
  const [calendarKey, setCalendarKey] = useState(0);
  const [markedDates, setMarkedDates] = useState({
    [formatYMD(selectedDate)]: { selected: true },
  });

  const [temptSelectedDate, setTemptSelectedData] = useState(selectedDate);

  const markDate = (date) => {
    const dateString = formatYMD(date);
    setMarkedDates({ [dateString]: { selected: true } });
  };

  useEffect(() => {
    if (!selectedYear || selectedYear === selectedDate.getFullYear()) {
      return;
    } else {
      const currentDate = changeYearOfDate(selectedYear, selectedDate);
      setTemptSelectedData(new Date(currentDate));
      setInitialDate(currentDate);
      markDate(currentDate);
    }
    setCalendarKey(calendarKey + 1); // Update key to force rerender
  }, [selectedYear]);

  const handleYearChange = (year) => {
    setSelectedYear(parseInt(year)); // Parse the year to ensure it's a number
  };

  const handleDateChange = (date) => {
    markDate(date);
    setTemptSelectedData(new Date(date));
  };

  const handleCancel = () => {
    close();
    setMarkedDates({ [formatYMD(selectedDate)]: { selected: true } });
    setInitialDate(formatYMD(selectedDate));
    setSelectedYear(selectedDate.getFullYear());
  };

  const handleSelect = () => {
    
    setSelectedDate(temptSelectedDate);
    setMarkedDates({ [formatYMD(temptSelectedDate)]: { selected: true } });
    setInitialDate(formatYMD(temptSelectedDate));
    if (timePicker){
        setOpenTimePicker(true)
    } else{
        close();
    }
  };

  const yearItems = Array.from({ length: 100 }, (_, i) => ({
    label: `${2024 - i}`,
    value: 2024 - i,
  }));

  const handleDatePicked = (date) => {
    console.log("A date has been picked: ", date);
    hideDateTimePicker();
  };

  const hideDateTimePicker = () => {
    setOpenTimePicker(false);
    close();
  };

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        {!openTimePicker ? (
          <View style={styles.modalView}>
            <RNPickerSelect
              onValueChange={handleYearChange}
              items={yearItems}
              style={pickerSelectStyles}
              placeholder={{ label: "Select a year", value: null }}
              value={selectedYear}
            />

            <Calendar
              key={calendarKey} // Key to force rerender
              style={styles.calendar}
              current={initialDate}
              onDayPress={(day) => handleDateChange(day.dateString)}
              theme={theme}
              markedDates={markedDates}
              renderArrow={(direction) => <CustomArrow direction={direction} />}
            />
            <View
              style={{
                flexDirection: "row",
                marginLeft: 80,
                gap: 20,
                paddingHorizontal: 20,
                paddingTop: 20,
              }}
            >
              <TouchableOpacity onPress={handleCancel} style={styles.button}>
                <Text style={styles.textButton}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSelect} style={styles.button}>
                <Text style={styles.textButton}>SELECT TIME</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
            <View>

            </View>
        //   <DateTimePicker
        //     isVisible={openTimePicker}
        //     onConfirm={handleDatePicked}
        //     onCancel={hideDateTimePicker}
        //   />
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Màu nền với độ mờ 50%
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 7,
    paddingBottom: 14,
    elevation: 5,
  },
  calendar: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    height: 350,
  },
  button: {
    padding: 10,
  },
  textButton: {
    color: COLORS.primary,
    fontFamily: "InterMedium",
    fontSize: 14,
  },
  header: {
    // backgroundColor: COLORS.primary,
    // borderTopLeftRadius: 7,
    // borderTopRightRadius: 7,
  },
});

const theme = {
  textSectionTitleColor: COLORS.secondary,
  selectedDayBackgroundColor: COLORS.primary,
  selectedDayTextColor: "white",
  todayTextColor: COLORS.primary,
  dayTextColor: COLORS.secondary,
  textDisabledColor: COLORS.gray2,
};

const pickerSelectStyles = StyleSheet.create({
  // inputIOS: {
  //     fontSize: 16,
  //     paddingVertical: 12,
  //     paddingHorizontal: 10,
  //     borderRadius: 7,
  //     color: 'black',
  //     paddingRight: 30, // to ensure the text is never behind the icon
  // },
  // inputAndroid: {
  //     fontSize: 16,
  //     paddingHorizontal: 10,
  //     paddingVertical: 8,
  //     borderRadius: 7,
  //     color: 'black',
  //     paddingRight: 30, // to ensure the text is never behind the icon
  // },
});

export default ModalCalendar;
