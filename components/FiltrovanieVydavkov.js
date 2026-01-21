import { Text, TextInput } from "react-native";
import { StyleSheet } from "react-native";
import { GlobalStyles } from "../constant/styles";
export default function FiltrovanieVydavkov() {

    function inputHandler(text) {
        console.log("FILTER INPUT: ", text);
      }

    return <TextInput placeholder="Filtrovať výdavky..." style={styles.input}/>;
}

const styles = StyleSheet.create({
    input: {
      borderwidth: 1,
      borderColor: GlobalStyles.colors.acctent500,
      padding: 8,
      marginVertical: 16,
      borderRadius: 4,
      backgroundColor: GlobalStyles.colors.primary100,
    },
  });