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
import { supabase } from "../../lib/supabase";
import TargetItem from "../../components/target/TargetItem";

const Page = () => {
  const [targetList, setTargetList] = useState(null);
  const getTargetList = async (walletId) => {
    try {
      let { data, error } = await supabase.rpc("get_target_data", {
        wallet_id: walletId,
      });

      if (error) throw error;
      else {
        setTargetList(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTargetList(1);
  }, []);

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
                Target
              </Text>
            </View>
          ),

          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          // headerShadowVisible: false,
          headerTitleAlign: "center",
        }}
      />
      <View style={{ flex: 1 }}>
        <ScrollView>
          {targetList?.map((item, index) => (
            <TargetItem key={index} targetData={item} />
          ))}
        </ScrollView>
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.fab}
        onPress={() => router.push("add-target")}
      >
        <icons.plus fill="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default Page;
