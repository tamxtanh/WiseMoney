import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { GroupTreeData } from "./interface";
import { FONT, SIZES } from "../../constants";
import { router } from "expo-router";

const GroupTree: React.FC<{
  data: GroupTreeData;
  handlePress: (item: any) => void;
}> = ({ data, handlePress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.top} onPress={() => handlePress(data)}>
        <View style={styles.groupImageContainer}>
          <Image source={{ uri: data.image_url }} style={styles.groupImage} />
        </View>
        <View style={styles.groupNameContainer}>
          <Text style={styles.groupName}>{data.name}</Text>
        </View>
        {/* <View style={styles.dotsContainer}>
          <TouchableOpacity>
            <Text style={styles.dots}>...</Text>
          </TouchableOpacity>
        </View> */}
      </TouchableOpacity>

      {data.list?.map((item, index) => (
        <TouchableOpacity
          key={index}
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
          {/* <View style={styles.dotsContainer}>
            <TouchableOpacity>
              <Text style={styles.dots}>...</Text>
            </TouchableOpacity>
          </View> */}
        </TouchableOpacity>
      ))}
      {/* <FlatList
        data={data.list}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemRow}>
            <View style={styles.treeLineContainer}>
              <View style={styles.verticalLine} />
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
            <View style={styles.dotsContainer}>
              <TouchableOpacity>
                <Text style={styles.dots}>...</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      /> */}
    </View>
  );
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
    // flex: 2,
    // backgroundColor: 'green',
    //paddingRight: 25,
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
    //marginLeft: -15,
  },
  dotsContainer: {
    flex: 1,
  },
  dots: {
    fontFamily: FONT.bold,
    fontSize: SIZES.h5,
  },
  itemRow: {
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
    //marginLeft: -15,
  },
  treeLineContainer: {
    flex: 0,
    paddingLeft: 5,
    paddingRight: 5,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    // paddingBottom: 0,
    // paddingTop: 0,
    // backgroundColor: 'green',
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
    // marginTop: -50
  },
});

export default GroupTree;
