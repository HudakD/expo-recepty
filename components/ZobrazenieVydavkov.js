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

  function filtrovanieTextInput(inputText){
    setSearch(inputText);
  }
  console.log("vydavky:", vydavky);

  const filtrovresuanieVydavky = vydavky.filter((vyd) => vyd.popis.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
  console.log("filtrovane:", filtrovresuanieVydavky);
  
  return (
    <View style={styles.container}>
      <SumaVydavkov vydavky={vydavky} pocetDni={pocetDniVydavkov} />
      <FiltrovanieVydavkov filtrovanieTextInput={filtrovanieTextInput} />
      <ZoznamVydavkov vydavky={filtrovresuanieVydavky} />
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
