import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { router, Stack } from "expo-router";
import InputTransaction from "../../../components/transaction/InputTransaction";
import { Link } from "expo-router";
import SupabaseSingleton from "../../../lib/supabaseSingleton";
import { COLORS, icons } from "../../../constants";

const Page = () => {
  const supabase = SupabaseSingleton.getInstance().getClient();
  const localParams = useLocalSearchParams();

  const [previousPage, setPreviousPage] = useState("");
  const [typeGroup, setTypeGroup] = useState("");
  const [categoryImgId, setCategoryImgId] = useState();
  const [categoryUrl, setCategoryUrl] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [parentId, setParentId] = useState();
  const [parentUrl, setParentUrl] = useState();
  const [parentName, setParentName] = useState();
  const [categoryDetails, setCetegoryDetails] = useState();

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

  const updateCategoryDetail = (data) => {
    setCategoryName(data.name);
    setCategoryUrl(data.icon_url);
    setCategoryImgId(data.icon_id);
    setParentName(data.group_name);
    setParentUrl(data.group_url);
    setParentId(data.group_id);
  };

  useEffect(() => {
    async function fetchDetailCategory(categoryId) {
      try {
        let { data, error } = await supabase.rpc("get_category_details", {
          category_id: categoryId,
        });

        if (error) throw error;
        else {
          updateCategoryDetail(data);
          setCetegoryDetails(data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchDetailCategory(localParams.id_category);
  }, []);

  const handleUpdate = () => {
    const updateCategoryRow = async (
      id,
      category_name,
      category_icon,
      category_group
    ) => {
      try {
        const { data, error } = await supabase
          .from("Category")
          .update({
            name: category_name,
            icon: category_icon,
            group: category_group,
          })
          .eq("id", id)
          .select();

        if (error) throw error;

        return data;
      } catch (error) {
        console.error(error.message);
      }
    };

    const updateCategoryRow2 = async (
      id,
      category_name,
      category_icon,
      category_group
    ) => {
      try {
        const { data, error } = await supabase
          .from("Category")
          .update({
            name: category_name,
            icon: category_icon,
            parent_category_id: category_group,
          })
          .eq("id", id)
          .select();

        if (error) throw error;

        return data;
      } catch (error) {
        console.error(error.message);
      }
    };

    const insertGroupRow = async (categoryId) => {
      try {
        const { data, error } = await supabase
          .from("Group")
          .insert([{ category: categoryId }])
          .single();

        if (error) {
          throw error;
        }

        return data;
      } catch (error) {
        console.error(error.message);
      }
    };

    let result;
    console.log("parentId", parentId);
    console.log("localParams.id_category", localParams.id_category);
    if (parentId != localParams.id_category) {
      if (parentId !== categoryDetails.group_id) {
        if (parentId === null) {
          // result = insertGroupRow(localParams.id_category);
          result = updateCategoryRow2(
            localParams.id_category,
            categoryName,
            categoryImgId,
            null
          );
        } else if (parentId !== null) {
          result = updateCategoryRow2(
            localParams.id_category,
            categoryName,
            categoryImgId,
            parentId
          );
        }
      } else {
        result = updateCategoryRow2(
          localParams.id_category,
          categoryName,
          categoryImgId
        );
      }
    } else {
      result = false;
    }

    if (result) {
      // Show success alert and navigate back after a short delay
      Alert.alert(null, "Update successful!", [
        {
          text: "OK",
          onPress: () => {
            router.back();
          },
        },
      ]);
    } else {
      // Show success alert and navigate back after a short delay
      Alert.alert(null, "Update failed!", [
        {
          text: "OK",
          onPress: () => {},
        },
      ]);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      null,
      "Are you sure you want to delete this category?",
      [
        {
          text: "No",
          style: "cancel",
          onPress: () => console.log("Delete cancelled"),
        },
        {
          text: "Yes",
          onPress: async () => {
            const result = await deleteCategoryRow(localParams.id_category);
            if (result) {
              Alert.alert(null, "The target was successfully deleted!", [
                {
                  text: "OK",
                  onPress: () => {
                    router.back();
                  },
                },
              ]);
            } else {
              Alert.alert(
                null,
                "Failed to delete the category. It might be referenced in another table.",
                [
                  {
                    text: "OK",
                  },
                ]
              );
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const deleteCategoryRow = async (id) => {
    try {
      const { error } = await supabase.from("Category").delete().eq("id", id);

      if (error) {
        // Return false to indicate the deletion was not successful
        return false;
      }
      return true; // Return true to indicate the deletion was successful
    } catch (error) {
      // Return false to indicate the deletion was not successful
      return false;
    }
  };

  console.log("previous", previousPage);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <View style={{ marginLeft: 0 }}>
              <Text style={{ fontSize: 20, fontFamily: "InterSemiBold" }}>
                Edit category
              </Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={handleDelete}>
              <icons.bin fill="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={{ flex: 1 }}>
        <View style={styles.inputTransaction}>
          <Link
            href={{
              pathname: "/iconList",
              params: {
                previousPage: `/update-category/${localParams.id_category}`,
              },
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

        <View>
          <Link
            href={{
              pathname: "/parentCategory",
              params: {
                previousPage: `/update-category/${localParams.id_category}`,
                type: typeGroup,
                categoryId: localParams.id_category,
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
                <Text style={styles.textInputTransaction2}>
                  Parent category
                </Text>
                <Text style={styles.textInputTransaction3}>
                  {parentName ? parentName : "Select category"}
                </Text>
              </View>
            </View>
          </Link>

          {parentId && (
            <View
              style={{
                backgroundColor: "#8A8A8C",
                borderRadius: 30,
                position: "absolute",
                right: 25,
                top: 32,
                padding: 2,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setParentId(null);
                  setParentUrl("");
                  setParentName("");
                }}
              >
                <icons.close fill="white" width={12} height={12} />
              </TouchableOpacity>
            </View>
          )}
        </View>
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
          onPress={handleUpdate}
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

export default Page;
