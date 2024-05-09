import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { router, Stack } from "expo-router";
import { COLORS } from "../constants";
import * as Contacts from "expo-contacts";

const Contact = () => {
  const { previousPage, oldContent } = useLocalSearchParams();

  const [contactContent, setContactContent] = useState(oldContent);

  const [contacts, setContacts] = useState([]);

  const handleDone = () => {
    router.navigate({
      pathname: previousPage,
      params: {
        contact: contactContent,
      },
    });
  };

  const handleContact = (name) => {
    // Add the name to contactContent with a comma and a space
    setContactContent((prevContent) => prevContent + name + ", ");
  };

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          setContacts(data);
        }
      }
    })();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <View style={{ marginLeft: 0 }}>
              <Text style={{ fontSize: 20, fontFamily: "InterSemiBold" }}>
                With
              </Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={handleDone}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "InterSemiBold",
                  color: COLORS.primary,
                }}
              >
                DONE
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <View
        style={{
          backgroundColor: "white",
          justifyContent: "center",
          borderBottomWidth: 2,
          borderColor: "#F1F1F1",
          paddingHorizontal: 40,
          paddingVertical: 16,

          //backgroundColor: "red",
        }}
      >
        <TextInput
          style={{
            backgroundColor: "white",
            fontSize: 18,
            color: COLORS.primary,
          }}
          placeholder="Type in a name or select one below"
          value={contactContent}
          onChangeText={(text) => {
            if (text.endsWith(",") && text.length < contactContent.length) {
              const names = text
                .split(", ")
                .map((name) => name.trim())
                .filter(Boolean);
              names.pop(); // Remove the last name

              if (names.length > 0) {
                setContactContent(names.join(", ") + ", ");
              } else {
                setContactContent("");
              }
            } else if (
              text.endsWith(",") &&
              text.length > contactContent.length
            ) {
              setContactContent(text + " ");
            } else {
              // If none of the above conditions are met, just update the contactNote
              setContactContent(text);
            }
          }}
          autoFocus
        />
      </View>
      <View style={{ paddingBottom: 10 }}>
        <FlatList
          data={contacts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity
                style={styles.contactBtn}
                onPress={() => handleContact(item.name)}
              >
                <Text
                  style={{
                    fontFamily: "InterRegular",
                    fontSize: 15,
                  }}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>

              {/* {item.phoneNumbers && item.phoneNumbers.length > 0 && (
                <Text>Phone: {item.phoneNumbers[0].number}</Text>
              )} */}
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contactBtn: {
    paddingHorizontal: 40,
    paddingVertical: 15,
  },
});

export default Contact;
