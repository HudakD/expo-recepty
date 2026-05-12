import { StyleSheet, Text, View } from "react-native";

import { GlobalStyles } from "../constant/styles";

export default function PocetReceptov({ title, pocet }) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>Receptar</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.badge}>
        <Text style={styles.badgeNumber}>{pocet}</Text>
        <Text style={styles.badgeText}>ks</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
    borderRadius: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.border,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    color: GlobalStyles.colors.accent700,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  title: {
    color: GlobalStyles.colors.text,
    fontSize: 24,
    fontWeight: "800",
    marginTop: 4,
  },
  badge: {
    minWidth: 58,
    minHeight: 58,
    borderRadius: 8,
    backgroundColor: GlobalStyles.colors.card,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeNumber: {
    color: GlobalStyles.colors.primary500,
    fontSize: 20,
    fontWeight: "800",
  },
  badgeText: {
    color: GlobalStyles.colors.muted,
    fontSize: 12,
  },
});
