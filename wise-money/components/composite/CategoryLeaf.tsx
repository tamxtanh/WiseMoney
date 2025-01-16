import React from "react";
import { Text, Image, View, StyleSheet } from "react-native";
import { CategoryInterface } from "./CategoryInterface";

export class CategoryLeaf implements CategoryInterface {
  id: number;
  name: string;
  url: string;
  parent_id: number;

  constructor(id: number, name: string, url: string) {
    this.id = id;
    this.name = name;
    this.url = url;
  }

  render(): React.ReactNode {
    return (
      <View style={styles.itemRow}>
        <View style={styles.categoryImageContainer}>
          <Image source={{ uri: this.url }} style={styles.categoryImage} />
        </View>
        <Text style={styles.categoryName}>{this.name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  categoryName: {
    fontSize: 16,
  },
});
