import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { router, Stack } from "expo-router";
import { COLORS, icons } from "../../constants";
import SupabaseSingleton from "../../lib/supabaseSingleton";
import TargetItem from "../../components/target/TargetItem";
import { useKeyboard } from "../../context/KeyboardContext";

const Page = () => {
  const supabase = SupabaseSingleton.getInstance().getClient();

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background1 }}>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <View style={{ marginLeft: 0 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "InterSemiBold",
                  color: "white",
                }}
              >
                Import Files
              </Text>
            </View>
          ),

          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTitleAlign: "center",
          headerTintColor: "white",
        }}
      />
      <View style={{ flex: 1 }}>{/* write code here */}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Page;
