import React, { useEffect, useState } from 'react'
import { View, AppState, SafeAreaView } from 'react-native'
import { supabase } from '../../lib/supabase'
import SignIn from '../../components/auth/SignIn'
import SignUp from '../../components/auth/SignUp'
import { Stack, useRouter } from 'expo-router'

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
    if (state === 'active') {
        supabase.auth.startAutoRefresh()
    } else {
        supabase.auth.stopAutoRefresh()
    }
})

export default function Auth() {
    const [isSignInComponent, setIsSignInComponent] = useState(true)

    const switchComponent = () => {
        setIsSignInComponent(!isSignInComponent);
    };

    const router = useRouter();

    // Check if user is logged in
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                router.replace("/(tabs)/home");
                // router.back()
                // try {
                //     router.back()
                // }
                // catch (error) {
                //     router.push(`/(tabs)/home`);
                // }
            } else {
                console.log("no user");
            }
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                router.replace("/(tabs)/home");
                // try {
                //     router.back()
                // }
                // catch (error) {
                //     router.push(`/(tabs)/home`);
                // }
            } else {
                console.log("no user 2");
            }
        });
    }, []);

    return (
        <View style={[{ flex: 1 }]}>
            <Stack.Screen options={{ headerShown: false, statusBarHidden: false, }} />
            {isSignInComponent ? <SignIn switchToSignUp={switchComponent} /> : <SignUp switchToSignIn={switchComponent} />}
        </View>
    );

}
