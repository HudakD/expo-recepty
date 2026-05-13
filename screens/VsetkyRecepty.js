import { useContext } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import ZobrazenieReceptov from "../components/ZobrazenieReceptov";
import Tlacitko from "../components/UI/Tlacitko";
import { GlobalStyles } from "../constant/styles";
import { ReceptyContext } from "../store/recepty-context";

export default function VsetkyRecepty() {
  const receptyCtx = useContext(ReceptyContext);
  const { chyba, nacitavaSa, nacitatRecepty, recepty } = receptyCtx;

  if (nacitavaSa) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={GlobalStyles.colors.primary500} />
      </View>
    );
  }

  if (chyba) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{chyba}</Text>
        <Tlacitko onPress={nacitatRecepty}>Skusit znova</Tlacitko>
      </View>
    );
  }

  return (
    <ZobrazenieReceptov
      recepty={recepty}
      nadpis="Moje recepty"
      prazdnyText="Zatial tu nie je ziaden recept."
    />
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.background,
  },
  errorText: {
    color: GlobalStyles.colors.error500,
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
  },
});
