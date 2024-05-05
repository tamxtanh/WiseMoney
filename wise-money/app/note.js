import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { router, Stack } from "expo-router";

const Note = () => {
  const { previousPage, oldContent } = useLocalSearchParams();

  const [noteContent, setNoteContent] = useState(oldContent);

  const handleSave = () => {
    router.navigate({
      pathname: previousPage,
      params: {
        note: noteContent,
      },
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 15 }}>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <View style={{ marginLeft: 0 }}>
              <Text style={{ fontSize: 20, fontFamily: "InterSemiBold" }}>
                Note
              </Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={handleSave}>
              <Text style={{ fontSize: 14, fontFamily: "InterSemiBold" }}>
                SAVE
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <TextInput
        style={{
          flex: 1,
          backgroundColor: "white",
          height: "100%",
          textAlignVertical: "top", // Ensures text starts from the top
          fontSize: 20,
        }}
        value={noteContent}
        onChangeText={(text) => setNoteContent(text)}
        multiline
        autoFocus
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Note;
