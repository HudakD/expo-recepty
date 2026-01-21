import { useContext } from "react";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import SumaVydavkov from "./SumaVydavkov";
import ZoznamVydavkov from "./ZoznamVydavkov";

import { GlobalStyles } from "../constant/styles";
import { VydavkyContext } from "../store/vydavky-context";
import FiltrovanieVydavkov from "./FiltrovanieVydavkov";

export default function ZobrazenieVydavkov({ vydavky, pocetDniVydavkov }) {
  const [search, setSearch] = useState("");

   function inputHandler(text) {
        console.log("FILTER INPUT: ", text);
      }

  console.log("Vydavky v ZobrazenieVydavkov:", vydavky);
  const result = vydavky.filter((vydavok) => vydavok.popis.includes("K"));
  console.log("result:",result);



  return (
    <View style={styles.container}>
      <SumaVydavkov vydavky={vydavky} pocetDni={pocetDniVydavkov} />
      <FiltrovanieVydavkov onIntputChange={inputHandler} />
      <ZoznamVydavkov vydavky={vydavky} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
