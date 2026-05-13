import { Pressable, StyleSheet, Text, View } from "react-native";

import { GlobalStyles } from "../../constant/styles";

export default function Tlacitko({ children, onPress, mode, style, disabled }) {
  return (
    <View style={style}>
      <Pressable
        onPress={disabled ? undefined : onPress}
        accessibilityRole="button"
        disabled={disabled}
        style={({ pressed }) => pressed && !disabled && styles.pressed}
      >
        <View
          style={[
            styles.button,
            mode === "flat" && styles.flat,
            disabled && styles.disabled,
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              mode === "flat" && styles.flatText,
              disabled && styles.disabledText,
            ]}
          >
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
  disabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "800",
  },
  flatText: {
    color: GlobalStyles.colors.primary700,
  },
  disabledText: {
    color: GlobalStyles.colors.muted,
  },
  pressed: {
    opacity: 0.75,
  },
});
