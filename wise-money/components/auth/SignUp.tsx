import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { supabase } from "../../lib/supabase";
import { Button, Icon } from "react-native-elements";
import { COLORS, FONT, SIZES } from "../../constants/theme";
import { useRouter } from "expo-router";
import { validateForm } from "../../function/UserDataValidation";
import { formatPhoneNumber } from "../../function/PhoneFormatDeformat";
import styles from "./style";

export default function SignUp({ switchToSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  const router = useRouter();

  async function signUpWithEmail() {
    setLoading(true);
    const formData = {
      phone: phone,
      email: email,
      name: name,
      username: username,
    };

    const validationResult = validateForm(formData);

    if (validationResult.isValid) {
      const {
        data: { session },
        error,
      } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) Alert.alert(error.message);
      else {
        let { data, error } = await supabase.rpc("register_user", {
          p_email: email,
          p_name: name,
          p_password: password,
          p_phone: formatPhoneNumber(phone),
          p_username: username,
        });
        if (error) console.error(error);
        else {
          router.push(`/auth`);
        }
      }
      if (!session)
        Alert.alert("Please check your inbox for email verification!");
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
          style={[styles.card, styles.fontSize]}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="Email"
          autoCapitalize={"none"}
        />

        <TextInput
          style={[styles.card, styles.fontSize]}
          onChangeText={(text) => setName(text)}
          value={name}
          placeholder="Full Name"
          autoCapitalize={"words"}
        />

        <TextInput
          style={[styles.card, styles.fontSize]}
          onChangeText={(text) => setUsername(text)}
          value={username}
          placeholder="Username"
          autoCapitalize={"none"}
        />

        <TextInput
          style={[styles.card, styles.fontSize]}
          onChangeText={(text) => setPhone(text)}
          value={phone}
          placeholder="Phone"
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
            style={{ alignSelf: "center" }}
            name={hidePassword ? "eye-slash" : "eye"}
            type="font-awesome"
            onPress={() => setHidePassword(!hidePassword)}
          />
        </View>

        <View style={styles.formCenter}>
          <Text style={styles.mt20}>
            Already have an Account?
            <TouchableOpacity onPress={switchToSignIn}>
              <Text
                style={[{ color: COLORS.primary }, { fontFamily: FONT.bold }]}
              >
                {" "}
                Sign In now!
              </Text>
            </TouchableOpacity>
          </Text>
          <TouchableOpacity
            style={styles.button}
            disabled={loading}
            onPress={() => signUpWithEmail()}
          >
            <Text style={styles.buttonTitle}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
