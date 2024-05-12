import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import DateRangePicker from "../modal-calendar/DateRangePicker";

const TransactionPopup = ({
  isPopupVisible,
  close,
  handleOpenTimeRange,
  setOptionPopup,
}) => {
  const handleSelectOption = (item) => {
    close();
    setOptionPopup(item);
  };
  return (
    <Modal visible={isPopupVisible} transparent={true}>
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
              style={{ backgroundColor: "white", padding: 15 }}
              onPress={handleOpenTimeRange}
            >
              <Text>Select time range</Text>
            </TouchableOpacity>
          </View>

          <View style={{ backgroundColor: "#E0E0E0" }}>
            <TouchableOpacity
              style={{ backgroundColor: "white", padding: 15 }}
              onPress={() => handleSelectOption("viewByTransac")}
            >
              <Text>View by transaction</Text>
            </TouchableOpacity>
          </View>

          <View style={{ backgroundColor: "#E0E0E0" }}>
            <TouchableOpacity
              style={{ backgroundColor: "white", padding: 15 }}
              onPress={() => handleSelectOption("viewByCateg")}
            >
              <Text>View by category</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TransactionPopup;

const styles = StyleSheet.create({});
