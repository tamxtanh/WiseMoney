import { Stack } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Button,
} from "react-native";
import { icons, COLORS, SIZES } from "../../../constants";
import InputTransaction from "../../../components/transaction/InputTransaction";
import { CheckBox } from "react-native-elements";
import NumericKeyboard from "../../../components/keyboard-custom/NumericKeyboard";
import { useState } from "react";
import {
  handlePickImage,
  handleTakePhoto,
} from "../../../components/image-function/ImageHandler";
import ModalCalendar from "../../../components/modal-calendar/ModalCalendar";

export default function Page() {
  const [inputValue, setInputValue] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [transactDate, setTransactDate] = useState(new Date());

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const [dayOfWeek, rest] = formattedDate.split(", ");
    const [month, day, year] = rest.split("/");
    console.log("dayOfWeek", dayOfWeek);
    console.log("month", month);
    console.log("day", day);
    console.log("year", year);
    return `${dayOfWeek}, ${day}/${month}/${year}`;
  };

  console.log("transactDate", formatDate(transactDate));

  const unVisible = () => {
    setShowCalendarModal(false);
  };

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
          <InputTransaction
            iconSvg={<icons.questionMark />}
            title="Select category"
            iconBoxStyle={styles.iconBox}
            textInputTransaction={styles.textInputTransaction}
          />

          <InputTransaction
            iconSvg={<icons.notes />}
            title="Write note"
            textInputTransaction={styles.textInputTransaction2}
          />

          <InputTransaction
            iconSvg={<icons.calenderClock />}
            title={formatDate(transactDate)}
            textInputTransaction={styles.textInputTransaction3}
            handlerOnPress={() => {
              setShowCalendarModal(true);
            }}
          />

          <ModalCalendar
            visible={showCalendarModal}
            close={unVisible}
            selectedDate={transactDate}
            setSelectedDate={setTransactDate}
            timePicker={true}
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
          <InputTransaction
            iconSvg={<icons.alarm />}
            title="No remind"
            textInputTransaction={styles.textInputTransaction3}
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

        <View style={styles.keyboard}>
          <NumericKeyboard value={inputValue} setValue={setInputValue} />
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
  iconBox: {
    backgroundColor: "#CCCCCC",
    borderRadius: 50,
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
