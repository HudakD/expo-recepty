import { TextInput, View } from "react-native";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SearchIcon({ filtrovanieTextInput }) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <TextInput
          placeholder="Filtrovanie"
          placeholderTextColor="#ffffff"
          style={styles.input}
          onChangeText={filtrovanieTextInput}
        />
      </View>
      <View style={styles.iconContainer}>
        <Ionicons name="search" size={20} color="#ffffff" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  container: {
    flex: 1,
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: "#98a5db",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },
  iconContainer: {
    width: 44,
    height: 44,
    marginLeft: 8,
    borderRadius: 999,
    backgroundColor: "#3d79cd",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
});
