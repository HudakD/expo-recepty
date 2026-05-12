import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { GlobalStyles } from "./constant/styles";
import VsetkyRecepty from "./screens/VsetkyRecepty";
import SpravaReceptu from "./screens/SpravaReceptu";
import IconTlacitko from "./components/UI/IconTlacitko";
import ReceptyContextProvider from "./store/recepty-context";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <ReceptyContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.background },
              headerTintColor: GlobalStyles.colors.text,
              headerShadowVisible: false,
              contentStyle: { backgroundColor: GlobalStyles.colors.background },
            }}
          >
            <Stack.Screen
              name="Recepty"
              component={VsetkyRecepty}
              options={({ navigation }) => ({
                headerRight: ({ tintColor }) => (
                  <IconTlacitko
                    ikona="add"
                    size={28}
                    color={tintColor}
                    accessibilityLabel="Pridat recept"
                    onPress={() => navigation.navigate("Sprava Receptu")}
                  />
                ),
              })}
            />
            <Stack.Screen name="Sprava Receptu" component={SpravaReceptu} />
          </Stack.Navigator>
        </NavigationContainer>
      </ReceptyContextProvider>
    </>
  );
}
