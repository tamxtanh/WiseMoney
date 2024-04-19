import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "../../constants";
import { useState } from "react";

const RadioTabList = ({ listTab, defaultSelected }) => {
  const [barStatus, setBarStatus] = useState(defaultSelected);

  return (
    <View style={styles.listTab}>
      {listTab.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.tabBtn,
            barStatus === item.title && styles.tabBtnActive,
          ]}
          onPress={() => setBarStatus(item.title)}
        >
          <Text
            style={[
              styles.textTab,
              barStatus === item.title && styles.textTabActive,
            ]}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default RadioTabList;

const styles = StyleSheet.create({
  listTab: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#EFEFEF",
    borderRadius: 7,
  },
  tabBtn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  textTab: {
    fontFamily: "InterSemiBold",
    fontSize: 15,
    textAlign: "center",
    color: COLORS.textColor3,
  },
  tabBtnActive: {
    backgroundColor: "#43C85F",
    borderRadius: 7,
  },
  textTabActive: {
    color: "white",
  },
});
