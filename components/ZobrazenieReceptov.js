import { useState } from "react";
import { StyleSheet, View } from "react-native";

import FiltrovanieReceptov from "./FiltrovanieReceptov";
import PocetReceptov from "./PocetReceptov";
import ZoznamReceptov from "./ZoznamReceptov";
import { GlobalStyles } from "../constant/styles";

export default function ZobrazenieReceptov({ recepty, nadpis, prazdnyText }) {
  const [search, setSearch] = useState("");

  const filtrovaneRecepty = recepty.filter((recept) => {
    const hladanyText = search.toLowerCase();
    return (
      recept.nazov.toLowerCase().includes(hladanyText) ||
      recept.kategoria.toLowerCase().includes(hladanyText) ||
      recept.suroviny.toLowerCase().includes(hladanyText)
    );
  });

  return (
    <View style={styles.container}>
      <PocetReceptov title={nadpis} pocet={filtrovaneRecepty.length} />
      <FiltrovanieReceptov onChangeText={setSearch} />
      <ZoznamReceptov recepty={filtrovaneRecepty} prazdnyText={prazdnyText} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: GlobalStyles.colors.background,
  },
});
