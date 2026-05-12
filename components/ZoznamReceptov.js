import { FlatList, StyleSheet, Text, View } from "react-native";

import PolozkaRecept from "./PolozkaRecept";
import { GlobalStyles } from "../constant/styles";

export default function ZoznamReceptov({ recepty, prazdnyText }) {
  function zobrazRecept(itemData) {
    return <PolozkaRecept {...itemData.item} />;
  }

  if (recepty.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{prazdnyText}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={recepty}
      renderItem={zobrazRecept}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: 24,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  emptyText: {
    color: GlobalStyles.colors.muted,
    fontSize: 16,
    textAlign: "center",
  },
});
