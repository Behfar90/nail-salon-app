import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import React from "react";
import { colors, icons } from "@utils";
import { useExpandable } from "@hooks";

export function Expandable({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode[];
}) {
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const shouldExpand = useExpandable(expanded);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.expandlableHeader}
        onPress={() => setExpanded(!expanded)}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>{title}</Text>
        {expanded
          ? icons.CollapseIcon({ size: 30, color: colors.primary })
          : icons.ExpandIcon({ size: 30, color: colors.primary })}
      </TouchableOpacity>

      <View
        style={[
          styles.childrenWrapperStyles,
          {
            height: shouldExpand ? "auto" : 0,
            marginTop: shouldExpand ? 20 : 0,
          },
        ]}
      >
        {children}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: Dimensions.get("window").width * 0.9,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 15,
    backgroundColor: colors.white,
  },
  expandlableHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  childrenWrapperStyles: {
    overflow: "hidden",
    gap: 20,
  },
});
