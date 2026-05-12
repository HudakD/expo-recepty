import { StyleSheet, Text, TextInput, View } from "react-native";

import { GlobalStyles } from "../constant/styles";

export default function ReceptInput({ invalid, label, konfiguracia, style }) {
  const inputStyles = [styles.input];

  if (konfiguracia && konfiguracia.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
      <TextInput
        accessibilityLabel={label}
        style={inputStyles}
        {...konfiguracia}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 7,
  },
  label: {
    color: GlobalStyles.colors.text,
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 6,
  },
  input: {
    minHeight: 46,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 8,
    backgroundColor: GlobalStyles.colors.card,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.border,
    color: GlobalStyles.colors.text,
    fontSize: 16,
  },
  inputMultiline: {
    minHeight: 96,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: {
    borderColor: GlobalStyles.colors.error500,
    backgroundColor: GlobalStyles.colors.error50,
  },
});
