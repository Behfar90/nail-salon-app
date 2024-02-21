import { View, Text, StyleSheet } from "react-native";
import { colors } from "@utils";

export function SubHeading({
  title,
  seeAll = false,
}: {
  title: string;
  seeAll?: boolean;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {seeAll && <Text style={{ color: colors.primary }}>See All</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
