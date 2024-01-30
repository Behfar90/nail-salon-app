import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import NailPolish from "@assets/svgs/nail-polish.svg";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your apdewdwedfefwp!</Text>
      <NailPolish
        width={300}
        height={300}
        style={{ transform: [{ rotate: "-15deg" }] }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
