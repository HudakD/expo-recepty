import { Pressable, StyleSheet, Text, View } from "react-native";

import { GlobalStyles } from "../../constant/styles";

export default function Tlacitko({ children, onPress, mode, style }) {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.button, mode === "flat" && styles.flat]}>
          <Text style={[styles.buttonText, mode === "flat" && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 46,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: GlobalStyles.colors.primary500,
    justifyContent: "center",
  },
  flat: {
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "800",
  },
  flatText: {
    color: GlobalStyles.colors.primary700,
  },
  pressed: {
    opacity: 0.75,
  },
});
