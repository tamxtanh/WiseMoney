import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from "react-native";
import { Link, router } from "expo-router";
import React from "react";
import { COLORS, SIZES, icons } from "../../../constants";
import CurrencyPicker from "../CurrencyPicker";
import { useLocalSearchParams, Stack } from "expo-router";
import { useState, useEffect } from "react";
import { useHeaderHeight } from "@react-navigation/elements";
import SupabaseSingleton from "../../../lib/supabaseSingleton";

const Page = () => {
  const supabase = SupabaseSingleton.getInstance().getClient();
  const localParams = useLocalSearchParams();
  const [iconId, setIconId] = useState();
  const [imageSource, setImageSource] = useState(
    "https://eianmciufswbutirdbka.supabase.co/storage/v1/object/public/my%20files/images/iconCategory/fitness2.png"
  );

  const [walletName, setWalletName] = useState("");
  const [initBalance, setInitBalance] = useState();
  const [currencyUnit, setCurrencyUnit] = useState("US Dollar");

  const headerHeight = useHeaderHeight();

  useEffect(() => {
    if (typeof localParams?.source === "string") {
      setImageSource(localParams.source);
    }

    if (typeof localParams?.imageId === "string") {
      setIconId(localParams.imageId);
    }
  }, [localParams]);

  const handleCreateWallet = () => {
    const insertWallettRow = async (formData) => {
      try {
        const { data, error } = await supabase
          .from("Wallet")
          .insert([
            {
              icon: formData.iconId,
              name: formData.name,
              initial_balance: formData.init_balance,
              currency_unit: formData.currency_unit,
              user: formData.userId,
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
      iconId: Number(iconId),
      name: walletName,
      init_balance: initBalance,
      currency_unit: currencyUnit,
      userId: 1,
    };

    const walletId = insertWallettRow(transactionData);

    if (walletId) {
      router.navigate({
        pathname: "home",
      });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        height: Dimensions.get("window").height - headerHeight,
        minHeight: Dimensions.get("window").height - headerHeight,
      }}
    >
      <View style={styles.container}>
        <View>
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
                marginTop: 10,
                fontFamily: "InterMedium",
                textAlign: "center",
                color: COLORS.textColor3,
                fontSize: SIZES.h9,
                lineHeight: 25,
              }}
            >
              SpendWise helps you to keep track of spending {"\n"} money from
              wallets. Each wallet represents a source {"\n"} of money such as
              Cash or a Bank Account.
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
                value={walletName}
                onChangeText={setWalletName}
              />
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
                keyboardType="numeric"
                value={initBalance?.toString()}
                onChangeText={(text) => {
                  const numericValue = parseFloat(text);
                  setInitBalance(isNaN(numericValue) ? "" : numericValue);
                }}
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

              <CurrencyPicker
                currencyName={currencyUnit}
                setCurrencyName={setCurrencyUnit}
              />
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor:
                !initBalance || !iconId || !walletName
                  ? "#dfdfdf"
                  : COLORS.lightMainColor,
            },
          ]}
          disabled={!initBalance || !iconId || !walletName}
          onPress={handleCreateWallet}
        >
          <Text
            style={[
              styles.buttonText,
              {
                color:
                  !initBalance || !iconId || !walletName
                    ? COLORS.textColor3
                    : COLORS.primary,
              },
            ]}
          >
            CREATE WALLET
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: COLORS.background,
    paddingVertical: 30,
    paddingHorizontal: 10,
  },
  title: {
    marginTop: 25,
  },
  changeIcon: {
    marginTop: 20,
    alignItems: "center",
  },
  inputList: {
    marginTop: 10,
  },
  input: {
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: COLORS.lightMainColor,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
    width: "92%",
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 15,
    color: COLORS.primary,
    fontFamily: "InterMedium",
  },
});
