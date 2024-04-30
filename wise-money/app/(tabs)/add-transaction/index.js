import {
  Stack,
  useLocalSearchParams,
  Link,
  useGlobalSearchParams,
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
import { CheckBox } from "react-native-elements";
import NumericKeyboard from "../../../components/keyboard-custom/NumericKeyboard";
import { useState, useEffect, useRef } from "react";
import {
  handlePickImage,
  handleTakePhoto,
} from "../../../components/image-function/ImageHandler";
import DateTimePickerCustom from "../../../components/modal-calendar/DateTimePickerCustom";
import { useKeyboard } from "../../../context/KeyboardContext";

export default function Page() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [noteContent, setNoteContent] = useState("");

  const [transactDate, setTransactDate] = useState(new Date());
  const [remindDate, setRemindDate] = useState(new Date());

  const localParams = useGlobalSearchParams();

  const [imageSource, setImageSource] = useState();

  const textInputRef = useRef(null);
  const { openKeyboard, inputValue, setInputValue } = useKeyboard();

  const handleOpenKeyboard = () => {
    openKeyboard(); // Call the openKeyboard function from the context
    if (textInputRef.current) {
      textInputRef.current.blur();
    }
  };

  useEffect(() => {
    // Check if localParams.source is a string and update imageSource
    if (typeof localParams?.source === "string") {
      setImageSource(Number(localParams.source));
    }

    // Update noteContent
    if (typeof localParams.note === "string") {
      setNoteContent(localParams.note);
    }
  }, [localParams.source, localParams.note]);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerLeft: () => <icons.close fill="white" />,
          headerTitle: () => (
            <View style={{ marginLeft: 0 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "InterSemiBold",
                  color: "white",
                }}
              >
                Add Transactions
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
          <Link
            href={{
              pathname: "/iconList",
              params: { previousPage: "add-transaction" },
            }}
            style={{ padding: 0 }}
          >
            <InputTransaction
              iconSvg={
                imageSource ? (
                  <Image
                    source={imageSource}
                    style={{
                      width: 38,
                      height: 38,
                    }}
                    resizeMode="contain"
                  />
                ) : (
                  <icons.questionMark />
                )
              }
              title="Select category"
              iconBoxStyle={
                imageSource ? styles.iconImageBox : styles.iconSvgBox
              }
              textInputTransaction={styles.textInputTransaction}
            />
          </Link>

          <Link
            href={{
              pathname: "/note",
              params: {
                previousPage: "add-transaction",
                oldContent: noteContent,
              },
            }}
            style={{ padding: 0 }}
          >
            <InputTransaction
              iconSvg={<icons.notes />}
              title={noteContent ? noteContent : "Write note"}
              textInputTransaction={styles.textInputTransaction2}
            />
          </Link>

          <DateTimePickerCustom
            selectedDate={transactDate}
            setSelectedDate={setTransactDate}
            iconSvg={<icons.calenderClock />}
          />

          <InputTransaction
            iconSvg={<icons.wallet2 />}
            title="First Wallet"
            textInputTransaction={styles.textInputTransaction3}
          />
        </View>

        <View style={[styles.detailTransaction, styles.inputBox]}>
          <InputTransaction
            iconSvg={<icons.groupUser />}
            title="With"
            textInputTransaction={styles.textInputTransaction3}
          />

          <DateTimePickerCustom
            dateTimeMode={true}
            selectedDate={remindDate}
            setSelectedDate={setRemindDate}
            iconSvg={<icons.alarm />}
          />
        </View>

        <View
          style={[
            styles.inputBox,
            { paddingHorizontal: 14, paddingVertical: 21 },
          ]}
        >
          <View style={[styles.photos]}>
            <TouchableOpacity
              style={[
                styles.photoBox,
                { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
              ]}
              onPress={() => handlePickImage(setSelectedImage)}
            >
              <icons.addPhoto />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.photoBox,
                { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 },
              ]}
              onPress={() => handleTakePhoto(setSelectedImage)}
            >
              <icons.takePhoto />
            </TouchableOpacity>
          </View>

          {selectedImage && (
            <View style={{ marginTop: 21, flex: 1 }}>
              <Image
                source={{ uri: selectedImage }}
                style={{ height: 300, borderRadius: 5 }}
              />
            </View>
          )}
        </View>

        <View
          style={[
            styles.inputBox,
            {
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 5,
              paddingVertical: 15,
            },
          ]}
        >
          <CheckBox />
          <View>
            <Text
              style={{
                fontFamily: "InterMedium",
                fontSize: 13,
                color: "#010101",
              }}
            >
              Exclude from report
            </Text>
            <Text
              style={{
                fontFamily: "InterMedium",
                fontSize: 12,
                color: COLORS.textColor3,
              }}
            >
              Don't include this transaction in reports
            </Text>
          </View>
        </View>

        <View style={[styles.hideDetail, styles.inputBox]}>
          <Text
            style={{
              color: COLORS.primary,
              fontFamily: "InterMedium",
              fontSize: 16,
            }}
          >
            Hide Details
          </Text>

          <icons.arrowDropDown />
        </View>

        <View style={styles.saveBtn}>
          <TouchableOpacity
            style={{
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
    backgroundColor: "#E9E9E9",
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
