import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// Ikony z knižnice Expo Vector Icons
import { Ionicons } from "@expo/vector-icons";

// import farieb z konštánt
import { GlobalStyles } from "./constant/styles";

import PosledneVydavky from "./screens/PosledneVydavky";
import VsetkyVydavky from "./screens/VsetkyVydavky";
import SpravaVydavku from "./screens/SpravaVydavku";
import IconTlacitko from "./components/UI/IconTlacitko";
import VydavkyContextProvider from "./store/vydavky-context";
import CustomTabBar from "./components/UI/CustomTabBar";


const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

// funkcia, ktora vracia Bottom tab navigáciu pre prehlad vydavkov, takze dve obrazovky v jednom,
//  jedna pre posledne vydavky a druha pre vsetky vydavky
function PrehladVydavkov() {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        tabBarShowLabel: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <BottomTabs.Screen
        name="Posledné Výdavky"
        component={PosledneVydavky}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />

      <BottomTabs.Screen
        name="Všetky Výdavky"
        component={VsetkyVydavky}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}


export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <VydavkyContextProvider>
        <NavigationContainer>
          <Stack.Navigator>
            {/* Hlavná obrazovka s prehľadom výdavkov (Bottom Tabs), kombinácia dvoch typov navigácií */}
            <Stack.Screen
              name="Prehľad Výdavkov"
              component={PrehladVydavkov}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Správa Výdavku" component={SpravaVydavku} />
          </Stack.Navigator>
        </NavigationContainer>
      </VydavkyContextProvider>
    </>
  );
}
