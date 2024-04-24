import { Stack } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { icons, COLORS, SIZES } from "../../../constants";
import InputTransaction from "../../../components/transaction/InputTransaction";
import { CheckBox } from "react-native-elements";

export default function Page() {
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
            title="Today"
            textInputTransaction={styles.textInputTransaction3}
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

        <View style={[styles.photos, styles.inputBox]}>
          <View
            style={[
              styles.photoBox,
              { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
            ]}
          >
            <icons.addPhoto />
          </View>

          <View
            style={[
              styles.photoBox,
              { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 },
            ]}
          >
            <icons.takePhoto />
          </View>
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

        {/* <View style={styles.saveBtn}>
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
        </View> */}

        <View style={styles.saveDeleteBtn}>
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
        </View>
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
    paddingHorizontal: 14,
    paddingVertical: 21,
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
