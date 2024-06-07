import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "../../constants";
import { useState } from "react";

const IconRadioTabs = ({ listTab, defaultSelected, setPeriodValue }) => {
  const [barStatus, setBarStatus] = useState(defaultSelected);

  const handleOnPress = (item) => {
    setBarStatus(item.value);
    setPeriodValue(item.value);
  };

  return (
    <View style={styles.listTab}>
      {listTab.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.tabBtn,
            barStatus === item.value &&
              (index === 0
                ? styles.tabBtnActiveFirst
                : styles.tabBtnActiveSecond),
          ]}
          onPress={() => handleOnPress(item)}
        >
          {React.cloneElement(item.icon, {
            fill: barStatus === item.value ? COLORS.primary : "#ABABAB",
          })}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default IconRadioTabs;

const styles = StyleSheet.create({
  listTab: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 0.8,
    borderColor: "#EEEEF0",
    alignSelf: "center",
    width: "28%",
  },
  tabBtn: {
    justifyContent: "center",
    alignItems: "center",
    padding: 7,
    flex: 1,
  },

  tabBtnActiveFirst: {
    backgroundColor: COLORS.lightMainColor,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderColor: COLORS.primary,
    borderWidth: 1.2,
  },
  tabBtnActiveSecond: {
    backgroundColor: COLORS.lightMainColor,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderColor: COLORS.primary,
    borderWidth: 1.2,
  },
});
