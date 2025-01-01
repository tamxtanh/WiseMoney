import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { COLORS, icons } from "../../constants";
import GroupTree from "../../components/group-tree/GroupTree";
import { Stack, useLocalSearchParams, router } from "expo-router";
import { supabase } from "../../lib/supabase";

const ParentCategory = () => {
  const [groupData, setGroupData] = useState([]);

  const { previousPage, type, categoryId } = useLocalSearchParams();

  useEffect(() => {
    const getGroupTreeData = async (type, userId, categoryId) => {
      try {
        let { data: tempt, error } = await supabase.rpc("get_parent_category", {
          category_id: categoryId,
          group_type: type,
          user_id: userId,
        });

        if (error) {
          throw error;
        }
        // console.log("tempt", tempt);
        return tempt;
      } catch (error) {
        console.error(error);
      }
    };

    const fetchData = async () => {
      try {
        const data = await getGroupTreeData(type, 1, categoryId);

        setGroupData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handlePress = (item) => {
    router.navigate({
      pathname: previousPage,
      params: {
        parentId: item.id,
        parentUrl: item.image_url,
        parentName: item.name,
      },
    });
  };

  const data = [{ id: "1", name: "listCategory" }];

  const renderItem = ({ item }) => {
    switch (item.id) {
      case "1":
        return (
          <View
            style={{
              flex: 1,
            }}
          >
            {groupData?.map((item, index) => (
              <GroupTree key={index} data={item} handlePress={handlePress} />
            ))}
          </View>
        );
      // Add more cases for other item types
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <View style={{ marginLeft: 0 }}>
              <Text style={{ fontSize: 20, fontFamily: "InterSemiBold" }}>
                Select category
              </Text>
            </View>
          ),
        }}
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.containerSv}
      />
    </View>
  );
};

export default ParentCategory;

const styles = StyleSheet.create({
  containerSv: {
    flex: 1,
    backgroundColor: "#F3F2F7",
  },
  createCategory: {
    paddingHorizontal: 22,
    paddingVertical: 20,
    backgroundColor: "white",
    flexDirection: "row",
    gap: 30,
    alignItems: "center",
  },
  valueItemReport: {
    fontSize: 14,
    color: COLORS.primary,
    fontFamily: "InterSemiBold",
  },
});
