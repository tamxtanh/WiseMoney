import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { router, Stack } from "expo-router";
import { COLORS, icons } from "../../constants";
import InputTransaction from "../../components/transaction/InputTransaction";
import { Link } from "expo-router";
import { supabase } from "../../lib/supabase";

const NewCategory = () => {
  const localParams = useLocalSearchParams();

  const [previousPage, setPreviousPage] = useState("");
  const [typeGroup, setTypeGroup] = useState("");
  const [categoryImgId, setCategoryImgId] = useState();
  const [categoryUrl, setCategoryUrl] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [parentId, setParentId] = useState();
  const [parentUrl, setParentUrl] = useState();
  const [parentName, setParentName] = useState();

  useEffect(() => {
    if (typeof localParams?.type === "string") {
      setTypeGroup(localParams.type);
    }

    if (typeof localParams?.previousPage === "string") {
      setPreviousPage(localParams.previousPage);
    }

    if (typeof localParams?.imageId === "string") {
      setCategoryImgId(localParams.imageId);
    }

    if (typeof localParams?.source === "string") {
      setCategoryUrl(localParams.source);
    }

    if (typeof localParams?.parentId === "string") {
      setParentId(Number(localParams.parentId));
    }

    if (typeof localParams?.parentUrl === "string") {
      setParentUrl(localParams.parentUrl);
    }

    if (typeof localParams?.parentName === "string") {
      setParentName(localParams.parentName);
    }
  }, [localParams]);

  const handleSave = () => {
    const insertGroupRow = async (name, iconId, userId, type) => {
      try {
        const { data, error } = await supabase
          .from("Group")
          .insert([{ name: name, icon: iconId, user: userId, type: type }])
          .single();
        console.log("data", data);
        if (error) {
          throw error;
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    const insertCategoryRow = async (name, iconId, groupId, walletId = 1) => {
      try {
        const { data, error } = await supabase
          .from("Category")
          .insert([
            { name: name, icon: iconId, wallet: walletId, group: groupId },
          ])
          .select();

        if (error) {
          throw error;
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    if (parentId) {
      insertCategoryRow(categoryName, categoryImgId, parentId);
    } else {
      insertGroupRow(categoryName, categoryImgId, 1, typeGroup);
    }

    router.navigate({
      pathname: previousPage,
      // params: {
      //   contact: contactContent,
      // },
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <View style={{ marginLeft: 0 }}>
              <Text style={{ fontSize: 20, fontFamily: "InterSemiBold" }}>
                New category
              </Text>
            </View>
          ),
        }}
      />
      <View style={{ flex: 1 }}>
        <View style={styles.inputTransaction}>
          <Link
            href={{
              pathname: "/iconList",
              params: { previousPage: "newCategory" },
            }}
            style={[
              { padding: 0 },
              categoryUrl ? styles.iconImageBox : styles.iconSvgBox,
            ]}
          >
            <View style={[styles.iconBox]}>
              {categoryUrl ? (
                <Image
                  source={{ uri: categoryUrl }}
                  style={{
                    width: 38,
                    height: 38,
                  }}
                  resizeMode="contain"
                />
              ) : (
                <icons.questionMark />
              )}
            </View>
          </Link>

          <TextInput
            style={styles.textInputTransaction}
            placeholder="Select category"
            value={categoryName}
            onChangeText={(text) => setCategoryName(text)}
          />
        </View>

        <InputTransaction
          iconSvg={<icons.widgets />}
          title={typeGroup.charAt(0).toUpperCase() + typeGroup.slice(1)}
          textInputTransaction={styles.textInputTransaction3}
        />

        <Link
          href={{
            pathname: "/parentCategory",
            params: {
              previousPage: "newCategory",
              type: typeGroup,
            },
          }}
          style={[{ padding: 0 }, parentUrl ? styles.iconImageBox : null]}
        >
          <View
            style={[styles.inputTransaction, parentUrl ? { gap: 15 } : null]}
          >
            <View style={styles.iconBox}>
              {parentUrl ? (
                <Image
                  source={{ uri: parentUrl }}
                  style={{
                    width: 38,
                    height: 38,
                  }}
                  resizeMode="contain"
                />
              ) : (
                <icons.categoryGroup />
              )}
            </View>
            <View>
              <Text style={styles.textInputTransaction2}>Parent category</Text>
              <Text style={styles.textInputTransaction3}>
                {parentName ? parentName : "Select category"}
              </Text>
            </View>
          </View>
        </Link>
      </View>

      <View style={styles.saveBtn}>
        <TouchableOpacity
          style={{
            backgroundColor:
              !categoryUrl || !categoryName ? "#efefef" : COLORS.primary,
            alignItems: "center",
            justifyContent: "center",
            padding: 14,
            borderRadius: 7,
          }}
          disabled={!categoryUrl || !categoryName}
          onPress={handleSave}
        >
          <Text
            style={{
              color:
                !categoryUrl || !categoryName ? COLORS.textColor3 : "#FCFCFC",
              fontFamily: "InterSemiBold",
              fontSize: 18,
            }}
          >
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputTransaction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 19,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  iconBox: {
    padding: 5,
  },
  inputBox: {
    backgroundColor: "white",
  },

  textInputTransaction2: {
    fontFamily: "InterMedium",
    fontSize: 12,
    color: COLORS.textColor3,
  },
  textInputTransaction3: {
    fontFamily: "InterMedium",
    fontSize: 16,
    color: "#010101",
  },
  iconSvgBox: {
    backgroundColor: "#CCCCCC",
    borderRadius: 50,
  },
  iconImageBox: {
    marginLeft: -7,
    marginRight: -10,
  },
  textInputTransaction: {
    fontFamily: "InterMedium",
    color: "#010101",
    fontSize: 20,
    flex: 1,
  },
  photos: {
    flexDirection: "row",
    alignItems: "center",
  },
  saveBtn: {
    paddingTop: 5,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
});

export default NewCategory;
