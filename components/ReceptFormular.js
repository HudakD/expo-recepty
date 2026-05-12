import { useState } from "react";
import { ScrollView, StyleSheet, Switch, Text, View } from "react-native";

import ReceptInput from "./ReceptInput";
import Tlacitko from "./UI/Tlacitko";
import { GlobalStyles } from "../constant/styles";

export default function ReceptFormular({
  buttonLabel,
  cancelHandler,
  onSubmit,
  defaultValues,
}) {
  const [vlozeneHodnoty, setVlozeneHodnoty] = useState({
    nazov: { value: defaultValues ? defaultValues.nazov : "", isValid: true },
    cas: {
      value: defaultValues ? defaultValues.cas.toString() : "",
      isValid: true,
    },
    kategoria: {
      value: defaultValues ? defaultValues.kategoria : "",
      isValid: true,
    },
    suroviny: {
      value: defaultValues ? defaultValues.suroviny : "",
      isValid: true,
    },
    postup: { value: defaultValues ? defaultValues.postup : "", isValid: true },
    oblubeny: defaultValues ? defaultValues.oblubeny : false,
  });

  function inputChangeHandler(inputIdentifikator, enteredHodnota) {
    setVlozeneHodnoty((aktualneHodnoty) => {
      return {
        ...aktualneHodnoty,
        [inputIdentifikator]: { value: enteredHodnota, isValid: true },
      };
    });
  }

  function oblubenyHandler(value) {
    setVlozeneHodnoty((aktualneHodnoty) => {
      return { ...aktualneHodnoty, oblubeny: value };
    });
  }

  function submitHandler() {
    const receptData = {
      nazov: vlozeneHodnoty.nazov.value.trim(),
      cas: +vlozeneHodnoty.cas.value,
      kategoria: vlozeneHodnoty.kategoria.value.trim(),
      suroviny: vlozeneHodnoty.suroviny.value.trim(),
      postup: vlozeneHodnoty.postup.value.trim(),
      oblubeny: vlozeneHodnoty.oblubeny,
    };

    const nazovIsValid = receptData.nazov.length > 0;
    const casIsValid = !isNaN(receptData.cas) && receptData.cas > 0;
    const surovinyIsValid = receptData.suroviny.length > 0;
    const postupIsValid = receptData.postup.length > 0;

    if (!nazovIsValid || !casIsValid || !surovinyIsValid || !postupIsValid) {
      setVlozeneHodnoty((aktualneHodnoty) => {
        return {
          nazov: {
            value: aktualneHodnoty.nazov.value,
            isValid: nazovIsValid,
          },
          cas: { value: aktualneHodnoty.cas.value, isValid: casIsValid },
          kategoria: { value: aktualneHodnoty.kategoria.value, isValid: true },
          suroviny: {
            value: aktualneHodnoty.suroviny.value,
            isValid: surovinyIsValid,
          },
          postup: {
            value: aktualneHodnoty.postup.value,
            isValid: postupIsValid,
          },
          oblubeny: aktualneHodnoty.oblubeny,
        };
      });
      return;
    }

    onSubmit(receptData);
  }

  const formularIsInvalid =
    !vlozeneHodnoty.nazov.isValid ||
    !vlozeneHodnoty.cas.isValid ||
    !vlozeneHodnoty.suroviny.isValid ||
    !vlozeneHodnoty.postup.isValid;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.form}>
        <Text style={styles.title}>Recept</Text>

        <ReceptInput
          label="Nazov"
          invalid={!vlozeneHodnoty.nazov.isValid}
          konfiguracia={{
            onChangeText: inputChangeHandler.bind(this, "nazov"),
            value: vlozeneHodnoty.nazov.value,
          }}
        />

        <View style={styles.inputRow}>
          <ReceptInput
            style={styles.rowInput}
            label="Cas v minutach"
            invalid={!vlozeneHodnoty.cas.isValid}
            konfiguracia={{
              keyboardType: "number-pad",
              onChangeText: inputChangeHandler.bind(this, "cas"),
              value: vlozeneHodnoty.cas.value,
            }}
          />
          <ReceptInput
            style={styles.rowInput}
            label="Kategoria"
            invalid={!vlozeneHodnoty.kategoria.isValid}
            konfiguracia={{
              onChangeText: inputChangeHandler.bind(this, "kategoria"),
              value: vlozeneHodnoty.kategoria.value,
            }}
          />
        </View>

        <ReceptInput
          label="Suroviny"
          invalid={!vlozeneHodnoty.suroviny.isValid}
          konfiguracia={{
            multiline: true,
            onChangeText: inputChangeHandler.bind(this, "suroviny"),
            value: vlozeneHodnoty.suroviny.value,
          }}
        />

        <ReceptInput
          label="Postup"
          invalid={!vlozeneHodnoty.postup.isValid}
          konfiguracia={{
            multiline: true,
            onChangeText: inputChangeHandler.bind(this, "postup"),
            value: vlozeneHodnoty.postup.value,
          }}
        />

        <View style={styles.switchRow}>
          <View>
            <Text style={styles.switchTitle}>Oblubeny recept</Text>
            <Text style={styles.switchText}>Na karte bude oznaceny srdieckom.</Text>
          </View>
          <Switch
            value={vlozeneHodnoty.oblubeny}
            onValueChange={oblubenyHandler}
            trackColor={{
              false: GlobalStyles.colors.border,
              true: GlobalStyles.colors.primary100,
            }}
            thumbColor={
              vlozeneHodnoty.oblubeny
                ? GlobalStyles.colors.primary500
                : GlobalStyles.colors.gray500
            }
          />
        </View>

        {formularIsInvalid && (
          <Text style={styles.errorText}>Vypln nazov, cas, suroviny a postup.</Text>
        )}

        <View style={styles.buttons}>
          <Tlacitko mode="flat" style={styles.button} onPress={cancelHandler}>
            Zrusit
          </Tlacitko>
          <Tlacitko style={styles.button} onPress={submitHandler}>
            {buttonLabel}
          </Tlacitko>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    paddingBottom: 24,
  },
  title: {
    color: GlobalStyles.colors.text,
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 12,
  },
  inputRow: {
    flexDirection: "row",
    gap: 10,
  },
  rowInput: {
    flex: 1,
  },
  switchRow: {
    marginTop: 10,
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.border,
    backgroundColor: GlobalStyles.colors.card,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  switchTitle: {
    color: GlobalStyles.colors.text,
    fontSize: 15,
    fontWeight: "800",
  },
  switchText: {
    color: GlobalStyles.colors.muted,
    fontSize: 13,
    marginTop: 3,
    maxWidth: 220,
  },
  errorText: {
    color: GlobalStyles.colors.error500,
    textAlign: "center",
    marginTop: 12,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 18,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 6,
  },
});
