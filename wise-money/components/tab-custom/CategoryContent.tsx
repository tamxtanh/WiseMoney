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
import GroupTree from "../group-tree/GroupTree";
import { GroupTreeData } from "../group-tree/interface";
import { Link, router } from "expo-router";

const CategoryContent = ({ content, typeApi }) => {
  const data = [
    { id: "1", name: "createCategory" },
    { id: "2", name: "listCategory" },
  ];

  const handleOnPress = (item) => {
    if (typeApi === "account") {
      if (content?.type === "debtLoan") return;
      router.navigate({
        pathname: `/update-category/${item.id}`,
        params: {
          previousPage: "/category-list/Categories",
          type: content?.type,
        },
      });
    } else {
      let type;

      if (content?.type === "debtLoan") {
        if (item.name === "Debt") {
          type = "debt";
        } else if (item.name === "Loan") {
          type = "loan";
        }
      } else {
        type = content?.type;
      }

      router.navigate({
        pathname: typeApi,
        params: {
          categoryId: item.id,
          categoryImg: item.image_url,
          categoryName: item.name,
          typeCategory: type,
        },
      });
    }
  };

  const renderItem = ({ item }) => {
    switch (item.name) {
      case "createCategory":
        return content?.type !== "debtLoan" ? (
          <Link
            href={{
              pathname: "/newCategory",
              params: {
                previousPage:
                  typeApi === "account"
                    ? "/category-list/Categories"
                    : "/category-list/Select category",
                type: content?.type,
              },
            }}
            style={{
              padding: 0,
              margin: 0,
              backgroundColor: "white",
              marginBottom: 8,
            }}
          >
            <View style={styles.createCategory}>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: COLORS.primary,
                  width: 24,
                  height: 24,
                  borderRadius: 30,
                }}
              >
                <icons.plus fill="white" />
              </View>

              <Text style={styles.valueItemReport}>NEW CATEGORY</Text>
            </View>
          </Link>
        ) : null;
      case "listCategory":
        return (
          <View
            style={{
              flex: 1,
              marginTop: content?.type === "debtLoan" ? 10 : 0,
            }}
          >
            {content?.groupTree?.map((item, index) => (
              <GroupTree key={index} data={item} handlePress={handleOnPress} />
            ))}
          </View>
        );
      // Add more cases for other item types
      default:
        return null;
    }
  };

  return (
    // <ScrollView style={styles.containerSv}>
    //   <View style={styles.createCategory}>
    //     <View
    //       style={{
    //         alignItems: "center",
    //         justifyContent: "center",
    //         backgroundColor: COLORS.primary,
    //         width: 24,
    //         height: 24,
    //         borderRadius: 30,
    //       }}
    //     >
    //       <icons.plus fill="white" />
    //     </View>

    //     <Text style={styles.valueItemReport}>NEW CATEGORY</Text>
    //   </View>

    //   <GroupTree data={groupTreeExample} />
    // </ScrollView>

    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      style={styles.containerSv}
    />
  );
};

export default CategoryContent;

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
