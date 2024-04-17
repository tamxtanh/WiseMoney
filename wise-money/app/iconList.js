import React from "react";
import { View, Image, FlatList, StyleSheet } from "react-native";

const imageList = [
  require("../assets/category/bar-graph.png"),
  require("../assets/category/barbell.png"),
  require("../assets/category/bill(1).png"),
  require("../assets/category/bill(2).png"),
  require("../assets/category/bill.png"),
];

const IconList = () => {
  const renderIconRow = ({ item }) => (
    <View style={styles.rowContainer}>
      {item.map((imagePath, index) => (
        <Image
          key={index}
          style={styles.icon}
          source={imagePath} // Use image path directly
        />
      ))}
    </View>
  );

  return (
    <FlatList
      data={chunkArray(imageList, 5)} // Split imageList into arrays of 5 items
      renderItem={renderIconRow}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

// Function to chunk array into arrays of specified size
const chunkArray = (array, size) => {
  return array.reduce((result, item, index) => {
    const chunkIndex = Math.floor(index / size);
    if (!result[chunkIndex]) {
      result[chunkIndex] = []; // Start a new chunk
    }
    result[chunkIndex].push(item);
    return result;
  }, []);
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  icon: {
    width: 50,
    height: 50,
  },
});

export default IconList;
