import {
  Stack,
  useLocalSearchParams,
  Link,
  useGlobalSearchParams,
  router,
} from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { icons, COLORS, SIZES } from "../../../constants";
import InputTransaction from "../../../components/transaction/InputTransaction";
import { useState, useEffect, useRef } from "react";
import { useKeyboard } from "../../../context/KeyboardContext";
import { supabase } from "../../../lib/supabase";
import DateRangePicker from "../../../components/modal-calendar/DateRangePicker";

export default function Page() {
  const [category, setCategory] = useState();
  const [targetName, setTargetName] = useState();

  const [rangeOption, setRangeOption] = useState("month");
  const [customStartDate, setCustomStartDate] = useState(new Date());
  const [customEndDate, setCustomEndDate] = useState(new Date());
  const [isCustomRange, setIsCustomRange] = useState(null);

  const closeRangeCustom = () => {
    setIsCustomRange(false);
  };
  const openRangeCustom = () => {
    setIsCustomRange(true);
  };

  const formatCustomDate = (startDate, endDate) => {
    const dateOptions = { day: "2-digit", month: "2-digit", year: "numeric" };

    const formattedStartDate = startDate
      .toLocaleDateString("en-US", dateOptions)
      .split("/");

    const formattedEndDate = endDate
      .toLocaleDateString("en-US", dateOptions)
      .split("/");

    return `${formattedStartDate[1]}/${formattedStartDate[0]}/${formattedStartDate[2]} - ${formattedEndDate[1]}/${formattedEndDate[0]}/${formattedEndDate[2]}`;
  };

  const localParams = useGlobalSearchParams();

  const textInputRef = useRef(null);
  const { openKeyboard, inputValue, setInputValue } = useKeyboard();

  const formatDate = (dateObj) => {
    const year = dateObj.getUTCFullYear();
    const month = dateObj.getUTCMonth();
    const date = dateObj.getUTCDate();

    // Create a new Date object with only the date components
    return new Date(Date.UTC(year, month, date));
  };

  const formatAmount = (value) => {
    // Remove commas from the string
    const numberString = value.replace(/,/g, "");

    // Convert the string to a number
    return parseInt(numberString); // For integer value
  };

  const handleOpenKeyboard = () => {
    openKeyboard(); // Call the openKeyboard function from the context
    if (textInputRef.current) {
      textInputRef.current.blur();
    }
  };

  useEffect(() => {
    // Update contactContent
    if (typeof localParams.source === "string") {
      setCategory((prevCategory) => ({
        ...prevCategory,
        img: localParams.source,
      }));
    }

    // Update contactContent
    if (typeof localParams.imageId === "string") {
      setCategory((prevCategory) => ({
        ...prevCategory,
        id: localParams.imageId,
      }));
    }
  }, [localParams]);

  const handleSave = () => {
    const insertTargetRow = async (formData) => {
      try {
        const { data, error } = await supabase
          .from("Target")
          .insert([
            {
              icon: formData.iconId,
              wallet: formData.walletId,
              target: formData.target,
              start_date: formData.startDate,
              end_date: formData.endDate,
              name: formData.name,
            },
          ])
          .select("id")
          .single();

        if (error) throw error;

        return data.id;
      } catch (error) {
        console.error(error.message);
      }
    };

    let transactionData = {
      iconId: Number(category?.id),
      walletId: 1,
      target: formatAmount(inputValue),
      startDate: formatDate(customStartDate),
      endDate: formatDate(customEndDate),
      name: targetName,
    };

    console.log("transactionData", transactionData);

    insertTargetRow(transactionData);
    router.back();
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          // headerLeft: () => <icons.close fill="white" width={26} height={26} />,
          headerTitle: () => (
            <View style={{ marginLeft: 0 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "InterSemiBold",
                  color: "white",
                }}
              >
                Add Target
              </Text>
            </View>
          ),
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          //headerShadowVisible: false,
          headerTitleAlign: "center",
        }}
      />

      <ScrollView
        style={{ flex: 1, marginBottom: SIZES.heightBottomNavigation }}
      >
        <View style={[styles.inputAmount, styles.inputBox]}>
          <Text
            style={{
              marginBottom: 14,
              marginRight: 10,
              fontFamily: "InterMedium",
              fontSize: 14,
              textAlign: "right",
            }}
          >
            Amount
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 5,
            }}
          >
            <TextInput
              ref={textInputRef}
              style={{
                flex: 1,
                height: 40,
                borderColor: COLORS.primary,
                borderBottomWidth: 2,
                paddingBottom: 3,
                fontSize: 26,
                color: COLORS.primary,
                fontFamily: "InterSemiBold",
                textAlign: "right",
              }}
              placeholder="0"
              placeholderTextColor={COLORS.primary}
              value={inputValue}
              onChangeText={setInputValue}
              onFocus={handleOpenKeyboard}
              showSoftInputOnFocus={false}
            />

            <Text
              style={{
                //flex: 0.1,
                fontFamily: "InterSemiBold",
                fontSize: 20,
                marginRight: 10,
                textAlign: "right",
              }}
            >
              đ
            </Text>
          </View>
        </View>

        <View style={[styles.inforTransaction, styles.inputBox]}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 15,
              paddingHorizontal: 16,
              paddingVertical: 14,
            }}
          >
            <Link
              href={{
                pathname: "/iconList",
                params: { previousPage: "add-target" },
              }}
              style={{ padding: 0 }}
            >
              <View
                style={[
                  {
                    padding: 5,
                  },
                  category ? styles.iconImageBox : styles.iconSvgBox,
                ]}
              >
                {category?.img ? (
                  <Image
                    source={{ uri: category.img }}
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
              ref={textInputRef}
              style={{
                backgroundColor: "white",
                flex: 1,
                height: 40,
                borderColor: "#EEEEF0",
                borderBottomWidth: 1,
                fontSize: 20,
                fontFamily: "InterSemiBold",
              }}
              placeholder="Name"
              value={targetName}
              onChangeText={(text) => setTargetName(text)}
            />
          </View>

          <TouchableOpacity onPress={openRangeCustom}>
            <InputTransaction
              iconSvg={<icons.calenderClock />}
              title={
                customStartDate
                  ? formatCustomDate(customStartDate, customEndDate)
                  : "No remind"
              }
              textInputTransaction={{
                fontFamily: "InterMedium",
                fontSize: 15,
                color: customStartDate ? "#010101" : COLORS.textColor3,
              }}
            />
          </TouchableOpacity>
          <DateRangePicker
            visible={isCustomRange}
            close={closeRangeCustom}
            startDate={customStartDate}
            setStartDate={setCustomStartDate}
            endDate={customEndDate}
            setEndDate={setCustomEndDate}
            setRangeOption={setRangeOption}
          />
        </View>

        <View style={styles.saveBtn}>
          <TouchableOpacity
            style={{
              backgroundColor:
                !inputValue || !category || !targetName
                  ? "#dfdfdf"
                  : COLORS.primary,
              alignItems: "center",
              justifyContent: "center",
              padding: 14,
              borderRadius: 7,
            }}
            disabled={!inputValue || !category}
            onPress={handleSave}
          >
            <Text
              style={{
                color: !inputValue || !category ? COLORS.textColor3 : "#FCFCFC",
                fontFamily: "InterSemiBold",
                fontSize: 18,
              }}
            >
              Save
            </Text>
          </TouchableOpacity>
        </View>

        {/* <View style={styles.saveDeleteBtn}>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "center",
              padding: 14,
              borderRadius: 7,
              borderWidth: 1,
              borderColor: "#ED5D5D",
            }}
          >
            <Text
              style={{
                color: "#ED5D5D",
                fontFamily: "InterSemiBold",
                fontSize: 18,
              }}
            >
              Delete
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: COLORS.primary,
              alignItems: "center",
              justifyContent: "center",
              padding: 14,
              borderRadius: 7,
            }}
          >
            <Text
              style={{
                color: "#FCFCFC",
                fontFamily: "InterSemiBold",
                fontSize: 18,
              }}
            >
              Save
            </Text>
          </TouchableOpacity>
        </View> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F3F8",
    position: "relative",
  },
  inputBox: {
    backgroundColor: "white",
    marginBottom: 10,
  },
  inputAmount: {
    padding: 10,
    paddingBottom: 15,
  },
  textInputTransaction2: {
    fontFamily: "InterMedium",
    fontSize: 15,
    color: COLORS.textColor3,
  },
  textInputTransaction3: {
    fontFamily: "InterMedium",
    fontSize: 15,
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
    color: COLORS.textColor3,
    fontSize: 20,
  },
  photos: {
    flexDirection: "row",
    alignItems: "center",
  },
  photoBox: {
    borderRadius: 3,
    borderColor: "#999999",
    borderWidth: 0.2,
    flex: 1,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  hideDetail: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  saveBtn: {
    paddingTop: 5,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  saveDeleteBtn: {
    paddingTop: 5,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
});
