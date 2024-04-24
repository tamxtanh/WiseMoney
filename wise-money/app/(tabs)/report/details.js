import React, { useState } from "react";
import { Stack } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { icons, COLORS } from "../../../constants";
import CustomTabBar from "../../../components/tab-custom/CustomTabBar";
import ReportContent from "../../../components/tab-custom/ReportContent";

const Page = () => {
  const currentDate = new Date();

  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const nestedTabs = [];

  // Add months from this month of this year to this month of next year
  for (let i = 0; i <= 12; i++) {
    const month =
      currentMonth - i > 0 ? currentMonth - i : 12 + (currentMonth - i);
    const year = currentMonth - i > 0 ? currentYear : currentYear - 1;
    const monthYearString = `${month <= 9 ? "0" : ""}${month}/${year}`;

    nestedTabs.push({
      key: `${i + 1}`,
      title: `${monthYearString}`,
      content: `Hello, I'm the nested tab ${monthYearString}`,
    });
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerLeft: () => <icons.searchIcon fill="white" />,
          headerTitle: () => (
            <View style={{ marginLeft: 0 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "InterSemiBold",
                  color: "white",
                }}
              >
                Report
              </Text>
            </View>
          ),
          headerRight: () => (
            <View style={{ flexDirection: "row", gap: 12 }}>
              <icons.share2 />
              <icons.select fill="white" />
            </View>
          ),
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerShadowVisible: false,
          headerTitleAlign: "center",
        }}
      />
      <View
        style={{
          backgroundColor: "white",
          paddingTop: 17,
        }}
      >
        <Text
          style={{
            fontFamily: "InterSemiBold",
            fontSize: 18,
            textAlign: "center",
          }}
        >
          Total amount: 5,000,000 VNĐ
        </Text>
      </View>

      <CustomTabBar nestedTabs={nestedTabs} TabContent={ReportContent} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Page;
