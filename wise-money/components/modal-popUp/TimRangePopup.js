import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import DateRangePicker from "../modal-calendar/DateRangePicker";

const TimRangePopup = ({
  isTimeRangeVisible,
  close,
  handleOpenCustomRange,
  setRangeOption,
}) => {
  const handleSelectOption = (item) => {
    close();
    setRangeOption(item);
  };
  return (
    <Modal
      visible={isTimeRangeVisible}
      transparent={true}
      onRequestClose={close}
    >
      <View
        style={{
          flex: 1,
          marginTop: 20,
          marginRight: 5,
          alignItems: "flex-end",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            elevation: 10,
            shadowColor: "black",
            shadowOpacity: 0.3,
            shadowOffset: { width: 0, height: 0 },
            shadowRadius: 5,
          }}
        >
          <View style={{ backgroundColor: "#E0E0E0" }}>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                paddingVertical: 15,
                paddingLeft: 20,
                paddingRight: 120,
              }}
              onPress={() => handleSelectOption("day")}
            >
              <Text>Day</Text>
            </TouchableOpacity>
          </View>

          <View style={{ backgroundColor: "#E0E0E0" }}>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                paddingVertical: 15,
                paddingLeft: 20,
                paddingRight: 120,
              }}
              onPress={() => handleSelectOption("week")}
            >
              <Text>Week</Text>
            </TouchableOpacity>
          </View>

          <View style={{ backgroundColor: "#E0E0E0" }}>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                paddingVertical: 15,
                paddingLeft: 20,
                paddingRight: 120,
              }}
              onPress={() => handleSelectOption("month")}
            >
              <Text>Month</Text>
            </TouchableOpacity>
          </View>

          {/* <View style={{ backgroundColor: "#E0E0E0" }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  paddingVertical: 15,
                  paddingLeft: 20,
                  paddingRight: 120,
                }}
                onPress={closeTimeRange}
              >
                <Text>Quarter</Text>
              </TouchableOpacity>
            </View>

            <View style={{ backgroundColor: "#E0E0E0" }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  paddingVertical: 15,
                  paddingLeft: 20,
                  paddingRight: 120,
                }}
                onPress={closeTimeRange}
              >
                <Text>Year</Text>
              </TouchableOpacity>
            </View> */}

          {/* <View style={{ backgroundColor: "#E0E0E0" }}>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                paddingVertical: 15,
                paddingLeft: 20,
                paddingRight: 120,
              }}
              onPress={() => handleSelectOption("all")}
            >
              <Text>All</Text>
            </TouchableOpacity>
          </View> */}

          <View style={{ backgroundColor: "#E0E0E0" }}>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                paddingVertical: 15,
                paddingLeft: 20,
                paddingRight: 120,
              }}
              onPress={handleOpenCustomRange}
            >
              <Text>Custom</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TimRangePopup;

const styles = StyleSheet.create({});
