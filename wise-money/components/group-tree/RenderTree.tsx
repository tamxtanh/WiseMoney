import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { ItemTreeData } from "./interface";
import { FONT, SIZES } from "../../constants";

const RenderTree: React.FC<{
  data: ItemTreeData[];
  handlePress: (item: any) => void;
  level?: number; // Track tree depth
}> = ({ data, handlePress, level = 0 }) => {
  return data.map((item, index) => (
    <View
      style={[
        level === 0 ? styles.container : undefined,
        { marginLeft: level * 12 }, // Add dynamic left margin based on level
      ]}
      key={item.id}
    >
      {/* Render different UI for level 0 and deeper levels */}
      {level === 0 ? (
        <TouchableOpacity style={styles.top} onPress={() => handlePress(item)}>
          <View style={styles.groupImageContainer}>
            <Image source={{ uri: item.image_url }} style={styles.groupImage} />
          </View>
          <View style={styles.groupNameContainer}>
            <Text style={styles.groupName}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.itemRow}
          onPress={() => handlePress(item)}
        >
          <View style={styles.treeLineContainer}>
            <View
              style={[
                styles.verticalLine,
                index === 0 && { height: 30, marginTop: 30 },
              ]}
            />
            <View style={styles.horizontalLine} />
          </View>
          <View style={styles.categoryImageContainer}>
            <Image
              source={{ uri: item.image_url }}
              style={styles.categoryImage}
            />
          </View>
          <View style={styles.categoryNameContainer}>
            <Text style={styles.categoryName}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      )}

      {/* Render children recursively */}
      {item.children && item.children.length > 0 && (
        <RenderTree
          data={item.children}
          handlePress={handlePress}
          level={level + 1} // Increment level for child items
        />
      )}
    </View>
  ));
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 17,
    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: "white",
    marginBottom: 10,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    height: "auto",
    marginBottom: 5,
  },
  groupImageContainer: {
    marginRight: 15,
  },
  groupImage: {
    height: 38,
    width: 38,
    borderRadius: 1000,
  },
  groupNameContainer: {
    flex: 7,
  },
  groupName: {
    fontFamily: FONT.regular,
    fontSize: 17,
  },
  itemRow: {
    // backgroundColor: "red",
    flexDirection: "row",
    alignItems: "center",
  },
  categoryImageContainer: { marginRight: 15 },
  categoryImage: {
    borderRadius: 100,
    height: 30,
    width: 30,
    marginVertical: 14,
  },
  categoryNameContainer: {
    flex: 7,
  },
  categoryName: {
    fontFamily: FONT.regular,
    fontSize: 16,
  },
  treeLineContainer: {
    flex: 0,
    paddingLeft: 5,
    paddingRight: 5,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: -60,
  },
  verticalLine: {
    height: 60,
    borderLeftWidth: 1.2,
    borderColor: "#D9D9D9",
  },
  horizontalLine: {
    width: 12,
    borderTopWidth: 1.2,
    borderColor: "#D5D5D5",
  },
});

export default RenderTree;
