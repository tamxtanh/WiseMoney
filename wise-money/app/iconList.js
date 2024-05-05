import React from "react";
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { router } from "expo-router";

import { SIZES } from "../constants";

const imageList = [
  require("../assets/category/bar-graph.png"),
  require("../assets/category/barbell.png"),
  require("../assets/category/bill(1).png"),
  require("../assets/category/bill(2).png"),
  require("../assets/category/car-rent.png"),
  require("../assets/category/car.png"),
  require("../assets/category/celebration.png"),
  require("../assets/category/cutlery.png"),
  require("../assets/category/economic-growth.png"),
  require("../assets/category/education.png"),
  require("../assets/category/fitness(1).png"),
  require("../assets/category/fitness.png"),
  require("../assets/category/give.png"),
  require("../assets/category/graduation-cap.png"),
  require("../assets/category/green-home.png"),
  require("../assets/category/home(1).png"),
  require("../assets/category/home.png"),
  require("../assets/category/medical-report.png"),
  require("../assets/category/promoting.png"),
  require("../assets/category/restaurant.png"),
  require("../assets/category/saving.png"),
  require("../assets/category/scholarship.png"),
  require("../assets/category/shield.png"),
];

const IconList = () => {
  const { previousPage } = useLocalSearchParams();

  const handlePress = (imagePath) => {
    router.navigate({
      pathname: previousPage,
      params: {
        source: imagePath,
      },
    });
  };

  const renderIconRow = ({ item }) => (
    <View style={styles.rowContainer}>
      {item.map((imagePath, index) => (
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => handlePress(imagePath)}
          key={index}
        >
          <Image
            style={styles.icon}
            source={imagePath} // Use image path directly
          />
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <FlatList
      style={styles.flatList}
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
  flatList: {
    paddingVertical: 22,
    paddingHorizontal: 28,
    backgroundColor: "white",
  },
  rowContainer: {
    flexDirection: "row",
    marginBottom: 25,
  },
  iconButton: {
    marginRight: (SIZES.width - 28 * 2 - 55 * 5) / 4,
  },
  icon: {
    width: 55,
    height: 55,
  },
});

export default IconList;
