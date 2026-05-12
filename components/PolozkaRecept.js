import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { GlobalStyles } from "../constant/styles";

export default function PolozkaRecept({
  id,
  nazov,
  cas,
  kategoria,
  suroviny,
  oblubeny,
}) {
  const navigation = useNavigation();

  function pressHandler() {
    navigation.navigate("Sprava Receptu", { receptId: id });
  }

  return (
    <Pressable
      onPress={pressHandler}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.kategoria}>{kategoria || "Bez kategorie"}</Text>
          <Text style={styles.nazov}>{nazov}</Text>
        </View>
        <Ionicons
          name={oblubeny ? "heart" : "heart-outline"}
          size={22}
          color={
            oblubeny ? GlobalStyles.colors.primary500 : GlobalStyles.colors.muted
          }
        />
      </View>

      <Text style={styles.suroviny} numberOfLines={2}>
        {suroviny}
      </Text>

      <View style={styles.footer}>
        <Ionicons name="time-outline" size={16} color={GlobalStyles.colors.muted} />
        <Text style={styles.cas}>{cas} min</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: GlobalStyles.colors.card,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.border,
    shadowColor: "#000000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  pressed: {
    opacity: 0.78,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  titleContainer: {
    flex: 1,
    paddingRight: 12,
  },
  kategoria: {
    color: GlobalStyles.colors.accent700,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  nazov: {
    color: GlobalStyles.colors.text,
    fontSize: 19,
    fontWeight: "800",
  },
  suroviny: {
    color: GlobalStyles.colors.muted,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 10,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  cas: {
    color: GlobalStyles.colors.muted,
    fontSize: 13,
    marginLeft: 5,
  },
});
