import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { icons } from "../../constants";

const NoteModal = ({ noteContent, setNoteContent, visible, setVisible }) => {
  const [temptNote, setTemptNote] = useState(noteContent);
  const handleSave = () => {
    setVisible(false);
    setNoteContent(temptNote);
  };
  return (
    <Modal visible={visible} style={styles.modal}>
      <View style={{ flex: 1, backgroundColor: "white", padding: 15 }}>
        <View
          style={{
            paddingLeft: 2,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 30,
            }}
          >
            <TouchableOpacity onPress={() => setVisible(false)}>
              <icons.arrowBack fill="black" />
            </TouchableOpacity>
            <Text style={{ fontSize: 20, fontFamily: "InterSemiBold" }}>
              Note
            </Text>
          </View>

          <TouchableOpacity onPress={handleSave}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "InterSemiBold",
                marginLeft: "auto",
                justifyContent: "flex-end",
              }}
            >
              SAVE
            </Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={{
            flex: 1,
            backgroundColor: "white",
            height: "100%",
            textAlignVertical: "top", // Ensures text starts from the top
            fontSize: 20,
          }}
          value={temptNote}
          onChangeText={(text) => setTemptNote(text)}
          multiline
          autoFocus
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    margin: 0, // This is the important style you need to set
    alignItems: undefined,
    justifyContent: undefined,
  },
});

export default NoteModal;
