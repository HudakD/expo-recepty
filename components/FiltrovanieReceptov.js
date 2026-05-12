import { StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { GlobalStyles } from "../constant/styles";

export default function FiltrovanieReceptov({ onChangeText }) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color={GlobalStyles.colors.muted} />
      <TextInput
        placeholder="Hladat recept, kategoriu alebo surovinu"
        placeholderTextColor={GlobalStyles.colors.muted}
        style={styles.input}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    marginVertical: 16,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: GlobalStyles.colors.card,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.border,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    marginLeft: 8,
    color: GlobalStyles.colors.text,
    fontSize: 15,
  },
});
