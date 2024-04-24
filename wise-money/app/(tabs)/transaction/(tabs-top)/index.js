import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Page() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: () => <Header title="Watch Later" iconvisible={false} />,
          headerTitleAlign: "center",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
