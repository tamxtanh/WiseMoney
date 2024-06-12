import { Modal, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import DateTimePickerCustom from "./DateTimePickerCustom";
import { COLORS, icons } from "../../constants";

const DateRangePicker = ({
  visible,
  close,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  setRangeOption,
}) => {
  const [temptStartDate, setTemptStartDate] = useState(startDate);
  const [temptEndDate, setTemptEndDate] = useState(endDate);

  useEffect(() => {
    setTemptStartDate(startDate);
  }, [startDate]);

  useEffect(() => {
    setTemptEndDate(endDate);
  }, [endDate]);

  const handleCancel = () => {
    close();
  };

  const handleSelect = () => {
    if (temptEndDate < temptStartDate) {
      alert("Ending date must be after starting date");
    } else {
      close();
      setRangeOption("custom");
      setStartDate(temptStartDate);
      setEndDate(temptEndDate);
    }
  };
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={{ fontSize: 20, fontFamily: "InterSemiBold" }}>
            Select Time
          </Text>
          <View style={{ marginTop: 10 }}>
            <Text
              style={{
                fontSize: 15,
                fontFamily: "InterMedium",
                color: COLORS.textColor3,
              }}
            >
              From
            </Text>
            <DateTimePickerCustom
              selectedDate={temptStartDate}
              setSelectedDate={setTemptStartDate}
              iconSvg={<icons.calenderClock />}
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text
              style={{
                fontSize: 15,
                fontFamily: "InterMedium",
                color: COLORS.textColor3,
              }}
            >
              To
            </Text>
            <DateTimePickerCustom
              selectedDate={temptEndDate}
              setSelectedDate={setTemptEndDate}
              iconSvg={<icons.calenderClock />}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              marginLeft: 80,
              gap: 15,
              paddingTop: 25,
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
      </View>
    </Modal>
  );
};

export default DateRangePicker;

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Màu nền với độ mờ 50%
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 5,
    elevation: 5,
    paddingLeft: 25,
    paddingRight: 15,
    paddingVertical: 20,
  },
  button: {
    padding: 10,
  },
  textButton: {
    color: COLORS.primary,
    fontFamily: "InterMedium",
    fontSize: 14,
  },
});
