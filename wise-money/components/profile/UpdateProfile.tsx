import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View, TextInput, TouchableOpacity, Text, ScrollView, Image } from 'react-native';
import { supabase } from '../../lib/supabase';
import { Button, Icon } from 'react-native-elements';
import { COLORS, FONT, SIZES } from '../../constants/theme';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { validateForm } from '../../lib/UserDataValidation';
import styles from '../auth/style';

export default function UpdateProfile() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            console.log("Email of current session:", user.email)
            let { data, error } = await supabase
                .rpc('get_user_data', {
                    user_email: user.email
                })
            if (error) console.error(error)
            else {
                setEmail(data[0].email)
                setName(data[0].name)
                setPhone(deformatPhoneNumber(data[0].phone))
                setUsername(data[0].username)
                setAvatarUrl(data[0].avatar_url)
            }
        }
        fetchUserData()
    }, [])

    async function updateProfile() {
        const formData = {
            phone: phone,
            email: email,
            name: name,
            username: username
        }

        const validationResult = validateForm(formData);

        if (validationResult.isValid) {
            let { data, error } = await supabase.rpc('update_user', {
                p_email: email,
                p_name: name,
                p_phone: formatPhoneNumber(phone),
                p_username: username
            })

            if (error) console.error(error)
            else {
                router.push(`/home`);
            }
        } else {
            // Form is invalid, display error message
            Alert.alert('Invalid Form', validationResult.message);
        }
    }

    const deformatPhoneNumber = (phone: string) => {
        if (phone.startsWith('+84')) {
            phone = phone.slice(3)
        }
        return `0${phone}`;
    }

    const formatPhoneNumber = (phone: string) => {
        // Remove leading "0" if present
        if (phone.startsWith('0')) {
            phone = phone.slice(1);
        }
        return `+84${phone}`;
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.avatar}
                        source={{ uri: avatarUrl }}
                    />
                    <TouchableOpacity style={styles.changeAvatar} onPress={() => { }}>
                        <Text> {/* Wrap the Ionicons component with Text */}
                            <Ionicons name="pencil" size={20} color="white" /> {/* Change "pencil" to the appropriate icon */}
                        </Text>
                    </TouchableOpacity>
                </View>

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
                <Button buttonStyle={[styles.button, styles.mt20]} title="UPDATE PROFILE" onPress={() => updateProfile()} />

                <TouchableOpacity
                    onPress={() => {/* Navigate to change password page */ }}>
                    <Text style={styles.changePassword}>Change Password</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}
