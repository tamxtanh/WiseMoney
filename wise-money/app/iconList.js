import React, { useEffect } from "react";
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
import darkColors from "react-native-elements/dist/config/colorsDark";
import SupabaseSingleton from "../lib/supabaseSingleton";
import { useState } from "react";

const IconList = () => {
  const supabase = SupabaseSingleton.getInstance().getClient();
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    const getListIconSelect = async () => {
      try {
        let { data: Image, error } = await supabase
          .from("Image")
          .select("id, url")
          .eq("description", "iconSelect");

        if (error) {
          throw error;
        }

        setImageList(Image);
      } catch (error) {
        console.error("Error fetching image data:", error.message);
      }
    };

    getListIconSelect();
  }, []);

  const { previousPage } = useLocalSearchParams();

  const handlePress = (id, imagePath) => {
    router.navigate({
      pathname: previousPage,
      params: {
        source: imagePath,
        imageId: id,
      },
    });
  };

  const renderIconRow = ({ item: imageRow }) => {
    return (
      <View style={styles.rowContainer}>
        {imageRow.map((item, index) => (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => handlePress(item.id, item.url)}
            key={index}
          >
            <Image
              style={styles.icon}
              source={{ uri: item.url }} // Use image path directly
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

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
