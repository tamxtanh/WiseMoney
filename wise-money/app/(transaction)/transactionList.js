import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { router, Stack } from "expo-router";

const Page = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 15 }}>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <View style={{ marginLeft: 0 }}>
              <Text style={{ fontSize: 20, fontFamily: "InterSemiBold" }}>
                Transaction list
              </Text>
            </View>
          ),
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Page;
