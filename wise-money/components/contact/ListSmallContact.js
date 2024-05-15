import { StyleSheet, Text, View } from "react-native";
import React from "react";

const getColorByFirstCharacter = (character) => {
  switch (character.toUpperCase()) {
    case "B":
      return "#ad61a6";
    case "C":
      return "#f06265";
    case "D":
      return "#f6845b";
    case "E":
      return "#e4c52e";
    case "G":
      return "#58a2bd";
    case "H":
      return "#f6845b";
    case "K":
      return "#38af93";
    case "L":
      return "#1c8d8c";
    case "M":
      return "#f8a43e";
    case "N":
      return "#ef6265";
    default:
      return "#66be73"; // Default color
  }
};

const ListSmallContact = ({ nameList }) => {
  // console.log("nameList", nameList);
  return (
    <View style={{ flexDirection: "row", gap: 15, flex: 1 }}>
      {nameList.map((item, index) => (
        <View key={index}>
          <SmallContact index={index} name={item} />
        </View>
      ))}
    </View>
  );
};

export default ListSmallContact;

const SmallContact = ({ name }) => {
  const firstCharacter = name?.charAt(0); // Get the first character of the name
  const charaterColor = getColorByFirstCharacter(firstCharacter);
  return (
    <View style={{ position: "relative" }}>
      <View
        style={{
          borderRadius: 30,
          paddingLeft: 40,
          paddingRight: 10,
          backgroundColor: "#E1E1E1",
          height: 30,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 13,
            fontFamily: "InterMedium",
            textAlign: "right",
          }}
        >
          {name}
        </Text>
      </View>
      <View
        style={{
          borderRadius: 20,
          position: "absolute",
          backgroundColor: charaterColor,
          width: 30,
          height: 30,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{ color: "white", fontSize: 18, fontFamily: "InterRegular" }}
        >
          {name ? name[0] : "T"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
