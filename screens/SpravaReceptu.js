import { useContext, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";

import ReceptFormular from "../components/ReceptFormular";
import IconTlacitko from "../components/UI/IconTlacitko";
import { GlobalStyles } from "../constant/styles";
import { ReceptyContext } from "../store/recepty-context";

export default function SpravaReceptu({ route, navigation }) {
  const receptyCtx = useContext(ReceptyContext);
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

  function deleteHandler() {
    receptyCtx.zmazatRecept(receptId);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler(receptData) {
    if (jeEditacia) {
      receptyCtx.upravitRecept(receptId, receptData);
    } else {
      receptyCtx.pridatRecept(receptData);
    }

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ReceptFormular
        buttonLabel={jeEditacia ? "Ulozit" : "Pridat"}
        onSubmit={confirmHandler}
        cancelHandler={cancelHandler}
        defaultValues={vybranyRecept}
      />
      {jeEditacia && (
        <View style={styles.deleteContainer}>
          <IconTlacitko
            ikona="trash-outline"
            size={30}
            color={GlobalStyles.colors.error500}
            accessibilityLabel="Zmazat recept"
            onPress={deleteHandler}
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
