import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { COLORS, SIZES, icons } from "../../constants";

const createWallet = () => {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text
          style={{
            fontFamily: "InterSemiBold",
            textAlign: "center",
            color: "#000000",
            fontSize: SIZES.h4,
          }}
        >
          First, create a wallet
        </Text>
        <Text
          style={{
            marginTop: 15,
            fontFamily: "InterMedium",
            textAlign: "center",
            color: COLORS.textColor3,
            fontSize: SIZES.h9,
            lineHeight: 25,
          }}
        >
          SpendWise helps you to keep track of spending {"\n"} money from
          wallets. Each wallet represents a source {"\n"} of money such as Cash
          or a Bank Account.
        </Text>
      </View>
      <View style={styles.changeIcon}>
        <Image
          source={require("../../assets/images/icon-image.png")}
          style={{
            width: 50,
            height: 50,
          }}
          resizeMode="contain"
        />
        <Text
          style={{
            marginTop: 15,
            fontFamily: "InterMedium",
            textAlign: "center",
            color: COLORS.primary,
            fontSize: 13,
          }}
        >
          CHANGE ICON
        </Text>
      </View>
      <View style={styles.inputList}>
        <View style={styles.input}>
          <Text
            style={{
              marginBottom: 5,
              marginLeft: 5,
              fontFamily: "InterMedium",
              color: COLORS.textColor3,
              fontSize: 14,
            }}
          >
            Wallet name
          </Text>
          <TextInput
            style={{
              height: 50,
              borderColor: "#EEEEF0",
              borderBottomWidth: 1,
              padding: 10,
              fontSize: 18,
              color: "#000000",
              fontFamily: "InterSemiBold",
            }}
            placeholder="Enter your wallet name"
            placeholderTextColor="#000000"
          />
        </View>

        <View style={styles.input}>
          <Text
            style={{
              marginBottom: 3,
              marginLeft: 5,
              fontFamily: "InterMedium",
              color: COLORS.textColor3,
              fontSize: 14,
            }}
          >
            Currency
          </Text>

          <View
            style={{
              position: "relative",
            }}
          >
            <TextInput
              style={{
                height: 50,
                borderColor: "#EEEEF0",
                borderBottomWidth: 1,
                padding: 10,
                fontSize: 18,
                color: "#000000",
                fontFamily: "InterSemiBold",
              }}
              placeholder="Việt Nam Đồng"
              placeholderTextColor="#000000"
              readOnly
            />

            <TouchableOpacity
              style={{
                position: "absolute",
                top: 35,
                right: 5,
              }}
            >
              <Text
                style={{
                  top: -16,
                  right: 18,
                  color: COLORS.primary,
                  fontFamily: "InterSemiBold",
                  fontSize: 13,
                }}
              >
                EDIT
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.input}>
          <Text
            style={{
              marginBottom: 5,
              marginLeft: 5,
              fontFamily: "InterMedium",
              color: COLORS.textColor3,
              fontSize: 14,
            }}
          >
            Balance
          </Text>
          <TextInput
            style={{
              height: 50,
              borderColor: "#EEEEF0",
              borderBottomWidth: 1,
              padding: 10,
              fontSize: 18,
              color: "#000000",
              fontFamily: "InterSemiBold",
            }}
            placeholder="Enter your balance"
            placeholderTextColor="#000000"
          />
        </View>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>CREATE WALLET</Text>
      </TouchableOpacity>
    </View>
  );
};

export default createWallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingVertical: 30,
    paddingHorizontal: 10,
    position: "relative",
    alignContent: "center",
  },
  title: {
    marginTop: 40,
  },
  changeIcon: {
    marginTop: 30,
    alignItems: "center",
  },
  inputList: {
    marginTop: 20,
  },
  input: {
    padding: 10,
  },
  button: {
    position: "absolute", // Position the button absolutely within the container
    bottom: 30,
    left: 40,
    right: 40,
    backgroundColor: COLORS.lightMainColor,
    borderRadius: 20,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 17,
    color: COLORS.primary,
    fontFamily: "InterMedium",
  },
});
