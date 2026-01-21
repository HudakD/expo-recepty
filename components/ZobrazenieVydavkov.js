import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import SumaVydavkov from "./SumaVydavkov";
import ZoznamVydavkov from "./ZoznamVydavkov";

import { GlobalStyles } from "../constant/styles";
import { VydavkyContext } from "../store/vydavky-context";

export default function ZobrazenieVydavkov({ vydavky, pocetDniVydavkov }) {
  return (
    <View style={styles.container}>
      <SumaVydavkov vydavky={vydavky} pocetDni={pocetDniVydavkov} />
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
