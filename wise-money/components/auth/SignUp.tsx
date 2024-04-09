import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, View, TextInput, TouchableOpacity, Text, ScrollView } from 'react-native'
import { supabase } from '../../lib/supabase'
import { Button, Icon } from 'react-native-elements'
import { COLORS, FONT, SIZES } from '../../constants/theme'
import { useRouter } from 'expo-router'
import styles from './style'

export default function SignUp({ switchToSignIn }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [username, setUsername] = useState('')

    const [hidePassword, setHidePassword] = useState(true)

    const router = useRouter();

    async function signUpWithEmail() {
        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        if (error) Alert.alert(error.message)
        else {
            let { data, error } = await supabase
                .rpc('register_user', {
                    p_email: email,
                    p_name: name,
                    p_password: password,
                    p_phone: formatPhoneNumber(phone),
                    p_username: username
                })
            if (error) console.error(error)
            else {
                router.push(`/home`);
            }

        }
        if (!session) Alert.alert('Please check your inbox for email verification!')
    }

    const formatPhoneNumber = (phone: string) => {
        let newPhone = "+84";
        // Remove leading "0" if present
        if (phone.startsWith('0')) {
            phone = phone.slice(1);
        }

        // // Validation (assuming 10 digits after removing leading "0")
        // if (!phone.match(/^\d{10}$/)) {
        //     throw new Error("Invalid phone number format. Please provide a 10-digit number.");
        // }

        // Formatting
        return `+84${phone}`;
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <TextInput
                    style={[styles.card, styles.fontSize]}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    placeholder="Email"
                    autoCapitalize={'none'}
                />

                <TextInput
                    style={[styles.card, styles.fontSize]}
                    onChangeText={(text) => setName(text)}
                    value={name}
                    placeholder="Full Name"
                    autoCapitalize={'words'}
                />

                <TextInput
                    style={[styles.card, styles.fontSize]}
                    onChangeText={(text) => setUsername(text)}
                    value={username}
                    placeholder="Username"
                    autoCapitalize={'none'}
                />

                <TextInput
                    style={[styles.card, styles.fontSize]}
                    onChangeText={(text) => setPhone(text)}
                    value={phone}
                    placeholder="Phone"
                    autoCapitalize={'none'}
                />

                <View style={[styles.card, styles.oneRow]}>
                    <TextInput
                        style={[styles.fontSize, { flex: 1 }]} // Add flex: 1 here
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        secureTextEntry={hidePassword} // This will hide the password when hidePassword is true
                        placeholder="Password"
                        autoCapitalize={'none'}
                    />
                    <Icon
                        style={{ alignSelf: 'center' }}
                        name={hidePassword ? 'eye-slash' : 'eye'}
                        type='font-awesome'
                        onPress={() => setHidePassword(!hidePassword)}
                    />
                </View>

                <View style={styles.formCenter}>
                    <Text style={styles.mt20}>Already have an Account?
                        <TouchableOpacity onPress={switchToSignIn}>
                            <Text style={[{ color: COLORS.darkRed }, { fontFamily: FONT.bold }]}>  Sign In now!</Text>
                        </TouchableOpacity>
                    </Text>
                    <Button buttonStyle={[styles.button, styles.mt20]} title="SIGN UP" onPress={() => signUpWithEmail()} />
                </View>

            </View>
        </ScrollView>

    )
}
