import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { COLORS } from "../../constants";

const TabContent = ({ content }) => {
  return (
    <ScrollView style={styles.containerSv}>
      <View style={styles.initReport}>
        <View style={styles.itemReport}>
          <Text style={styles.titleItemReport}>Opening balance </Text>
          <Text style={styles.valueItemReport}>2,000,000</Text>
        </View>
        <View style={styles.itemReport}>
          <Text style={styles.titleItemReport}>Total income </Text>
          <Text style={styles.valueItemReport}>4,000,000</Text>
        </View>
        <View style={styles.itemReport}>
          <Text style={styles.titleItemReport}>Total expense </Text>
          <Text style={styles.valueItemReport}>1,000,000</Text>
        </View>
        <View style={styles.itemReport}>
          <Text
            style={{
              fontSize: 13,
              color: COLORS.textColor3,
              fontFamily: "InterBold",
            }}
          >
            Ending balance
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: "#000000",
              fontFamily: "InterBold",
            }}
          >
            5,000,000
          </Text>
        </View>

        <View style={styles.btnReportView}>
          <TouchableOpacity style={styles.btnReport}>
            <Text style={styles.textBtnReport}>
              View report for this period
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default TabContent;

const styles = StyleSheet.create({
  containerSv: {
    flex: 1,
    backgroundColor: "#F3F2F7",
  },
  initReport: {
    paddingHorizontal: 16,
    paddingTop: 25,
    paddingBottom: 20,
    backgroundColor: "white",
  },
  itemReport: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  titleItemReport: {
    fontFamily: "InterSemiBold",
    fontSize: 13,
    color: COLORS.textColor3,
  },
  valueItemReport: {
    fontFamily: "InterSemiBold",
    fontSize: 13,
    color: "#000000",
  },
  btnReportView: {
    alignItems: "center",
    justifyContent: "center",
  },
  btnReport: {
    marginTop: 25,
    backgroundColor: COLORS.lightMainColor,
    paddingHorizontal: 20,
    paddingVertical: 9,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  textBtnReport: {
    color: COLORS.primary,
    fontFamily: "InterSemiBold",
  },
});
