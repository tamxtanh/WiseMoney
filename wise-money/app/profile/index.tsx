import { Stack } from "expo-router";
import {
    StyleSheet,
    Text,
    View,

    ScrollView,

} from "react-native";
import { COLORS } from "../../constants/theme";
import UpdateProfile from "../../components/profile/UpdateProfile";
export default function Profile() {

    return (
        <>
            <Stack.Screen
                options={{
                    headerTitle: () => (
                        <View style={{ marginLeft: 0 }}>
                            <Text style={{
                                fontSize: 20,
                                fontFamily: "InterSemiBold",
                                color: "black",
                            }}>
                                Update Profile
                            </Text>
                        </View>
                    ),
                    headerStyle: {
                        backgroundColor: COLORS.background,
                    },
                    headerTitleAlign: "center",
                }}
            />
            <View style={{ backgroundColor: COLORS.background, flex: 1 }}>
                <UpdateProfile></UpdateProfile>
            </View>
        </>
    )
}
