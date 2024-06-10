import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Link, router } from "expo-router";
import React from "react";
import { COLORS, SIZES, icons } from "../../constants";
import CurrencyPicker from "./currencyPicker";
import { useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";

const createWallet = () => {
  const localParams = useLocalSearchParams();

  const [imageSource, setImageSource] = useState(
    "https://eianmciufswbutirdbka.supabase.co/storage/v1/object/public/my%20files/images/iconCategory/fitness2.png"
  );

  useEffect(() => {
    if (typeof localParams?.source === "string") {
      setImageSource(localParams.source);
    }
  }, [localParams.source]);

  const handleClick = () => {
    router.navigate({
      pathname: "home",
    });
  };

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
          source={{ uri: imageSource }}
          style={{
            width: 55,
            height: 55,
          }}
          resizeMode="contain"
        />
        {/* <Text
          style={{
            marginTop: 15,
            fontFamily: "InterMedium",
            textAlign: "center",
            color: COLORS.primary,
            fontSize: 13,
          }}
        >
          CHANGE ICON
        </Text> */}
        <Link
          style={{
            marginTop: 15,
            fontFamily: "InterMedium",
            textAlign: "center",
            color: COLORS.primary,
            fontSize: 13,
          }}
          href={{
            pathname: "/iconList",
            params: { previousPage: "create-wallet" },
          }}
        >
          CHANGE ICON
        </Link>
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

          {/* <View
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
          </View> */}
          <CurrencyPicker />
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

      <TouchableOpacity style={styles.button} onPress={handleClick}>
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
    marginBottom: 10,
  },
  button: {
    position: "absolute", // Position the button absolutely within the container
    bottom: 30,
    left: 40,
    right: 40,
    backgroundColor: COLORS.lightMainColor,
    borderRadius: 20,
    height: 46,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 15,
    color: COLORS.primary,
    fontFamily: "InterMedium",
  },
});
