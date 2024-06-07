import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  AppState,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { supabase } from "../../lib/supabase";
import { Button, Icon } from "react-native-elements";
import { COLORS, SIZES, FONT } from "../../constants/theme";
import { useRouter } from "expo-router";
import { validateForm } from "../../function/UserDataValidation";
import styles from "./style";

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
// AppState.addEventListener('change', (state) => {
//     if (state === 'active') {
//         supabase.auth.startAutoRefresh()
//     } else {
//         supabase.auth.stopAutoRefresh()
//     }
// })

export default function SignIn({ switchToSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  const router = useRouter();

  async function signInWithEmail() {
    setLoading(true);
    const formData = {
      email: email,
    };

    const validationResult = validateForm(formData);

    if (validationResult.isValid) {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) Alert.alert(error.message);
      else {
        router.navigate({
          pathname: "create-wallet",
        });
        //router.push(`/(tabs)/home`);
        // router.back()
        // try {
        //     router.back()
        // }
        // catch (error) {
        //     router.push(`/(tabs)/home`);
        // }
      }
    } else {
      // Form is invalid, display error message
      Alert.alert("Invalid Form", validationResult.message);
    }
    setLoading(false);
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <TextInput
          style={[styles.card, styles.fontSize, { marginTop: 50 }]}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="Email"
          autoCapitalize={"none"}
        />

        <View style={[styles.card, styles.oneRow]}>
          <TextInput
            style={[styles.fontSize, { flex: 1 }]} // Add flex: 1 here
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={hidePassword} // This will hide the password when hidePassword is true
            placeholder="Password"
            autoCapitalize={"none"}
          />
          <Icon
            style={{ alignSelf: "center" }} // Change 'flex-end' to 'center'
            name={hidePassword ? "eye-slash" : "eye"}
            type="font-awesome"
            onPress={() => setHidePassword(!hidePassword)}
          />
        </View>

        <View style={styles.formCenter}>
          <TouchableOpacity
            style={styles.button}
            disabled={loading}
            onPress={() => signInWithEmail()}
          >
            <Text style={styles.buttonTitle}>SIGN IN</Text>
          </TouchableOpacity>
          <Text style={styles.mt20}>
            Don't have an Account?
            <TouchableOpacity disabled={loading} onPress={switchToSignUp}>
              <Text
                style={[{ color: COLORS.primary }, { fontFamily: FONT.bold }]}
              >
                {" "}
                Sign Up now!
              </Text>
            </TouchableOpacity>
          </Text>
          <TouchableOpacity onPress={() => console.log("Forgot Password")}>
            <Text
              style={[
                { marginTop: 40 },
                { fontSize: SIZES.large },
                { color: COLORS.darkRed },
                { fontFamily: FONT.bold },
              ]}
            >
              Forget Password?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
