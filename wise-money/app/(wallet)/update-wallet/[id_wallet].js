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

  const updateWalletDetails = (data) => {
    setIconId(data.iconId);
    setImageSource(data.icon_url);
    setWalletName(data.name);
    setCurrencyUnit(data.currency_unit);
    setInitBalance(data.init_balance);
  };

  useEffect(() => {
    async function fetchDetailWallet(walletId) {
      try {
        let { data, error } = await supabase.rpc("get_wallet_detail", {
          wallet_id: walletId,
        });

        if (error) throw error;
        else {
          updateWalletDetails(data[0]);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchDetailWallet(localParams.id_wallet);
  }, []);

  const handleClick = () => {
    const updateWalletRow = async (formData) => {
      try {
        const { data, error } = await supabase
          .from("Wallet")
          .update({
            icon: formData.iconId,
            name: formData.name,
            initial_balance: formData.init_balance,
            currency_unit: formData.currency_unit,
          })
          .eq("id", localParams.id_wallet)
          .select();

        if (error) throw error;

        return data;
      } catch (error) {
        console.error(error.message);
      }
    };

    let transactionData = {
      iconId: Number(iconId),
      name: walletName,
      init_balance: initBalance,
      currency_unit: currencyUnit,
    };

    const updateResult = updateWalletRow(transactionData);

    if (updateResult) {
      // Show success alert and navigate back after a short delay
      Alert.alert(null, "Update successful!", [
        {
          text: "OK",
          onPress: () => {
            router.back();
          },
        },
      ]);
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
      <Stack.Screen
        options={{
          headerTitle: () => (
            <View style={{ marginLeft: 0 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "InterSemiBold",
                  color: "white",
                }}
              >
                Wallet
              </Text>
            </View>
          ),
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerTintColor: "white",
        }}
      />
      <View style={styles.container}>
        <View>
          <View style={styles.changeIcon}>
            <Image
              source={{ uri: imageSource }}
              style={{
                width: 55,
                height: 55,
              }}
              resizeMode="contain"
            />

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
                params: {
                  previousPage: `/update-wallet/${localParams.id_wallet}`,
                },
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

        <TouchableOpacity style={styles.button} onPress={handleClick}>
          <Text style={styles.buttonText}>UPDATE WALLET</Text>
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
