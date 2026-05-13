import { useContext, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import ReceptFormular from "../components/ReceptFormular";
import IconTlacitko from "../components/UI/IconTlacitko";
import { GlobalStyles } from "../constant/styles";
import { ReceptyContext } from "../store/recepty-context";

export default function SpravaReceptu({ route, navigation }) {
  const receptyCtx = useContext(ReceptyContext);
  const [ukladaSa, setUkladaSa] = useState(false);
  const receptId = route.params?.receptId;
  const jeEditacia = !!receptId;
  const vybranyRecept = receptyCtx.recepty.find(
    (recept) => recept.id === receptId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: jeEditacia ? "Upravit recept" : "Pridat recept",
    });
  }, [navigation, jeEditacia]);

  async function deleteHandler() {
    setUkladaSa(true);

    try {
      await receptyCtx.zmazatRecept(receptId);
      navigation.goBack();
    } catch (error) {
      Alert.alert("Chyba", "Recept sa nepodarilo zmazat.");
      setUkladaSa(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(receptData) {
    setUkladaSa(true);

    try {
      if (jeEditacia) {
        await receptyCtx.upravitRecept(receptId, receptData);
      } else {
        await receptyCtx.pridatRecept(receptData);
      }

      navigation.goBack();
    } catch (error) {
      Alert.alert("Chyba", "Recept sa nepodarilo ulozit.");
      setUkladaSa(false);
    }
  }

  return (
    <View style={styles.container}>
      <ReceptFormular
        buttonLabel={jeEditacia ? "Ulozit" : "Pridat"}
        onSubmit={confirmHandler}
        cancelHandler={cancelHandler}
        defaultValues={vybranyRecept}
        isSubmitting={ukladaSa}
      />
      {jeEditacia && (
        <View style={styles.deleteContainer}>
          <IconTlacitko
            ikona="trash-outline"
            size={30}
            color={GlobalStyles.colors.error500}
            accessibilityLabel="Zmazat recept"
            onPress={ukladaSa ? undefined : deleteHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: GlobalStyles.colors.background,
  },
  deleteContainer: {
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: GlobalStyles.colors.border,
    alignItems: "center",
  },
});
