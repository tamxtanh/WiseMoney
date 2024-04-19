import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import UtilityItem from "../home/utilityItem";

const UtilityItemList = ({ itemData, qualityPerRow }) => {
  const renderIconRow = ({ item }) => (
    <View style={styles.rowContainer}>
      {item.map((utilityItem, index) => (
        <UtilityItem
          key={index}
          title={utilityItem.title}
          icon={utilityItem.icon}
          colorBox={utilityItem.colorBox}
        />
      ))}
    </View>
  );

  return (
    <FlatList
      data={chunkArray(itemData, qualityPerRow)} // Split imageList into arrays of 5 items
      renderItem={renderIconRow}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

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

export default UtilityItemList;

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    marginTop: 15,
  },
});
