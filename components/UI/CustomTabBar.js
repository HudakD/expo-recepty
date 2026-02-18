import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { GlobalStyles } from "../../constant/styles";
import Svg, { Path } from "react-native-svg";

const { width } = Dimensions.get("window");

function CustomTabBar({ state, descriptors, navigation }) {
  const tabWidth = width - 40;
  const singleTabWidth = tabWidth / state.routes.length;
  const curvePosition = singleTabWidth * state.index + singleTabWidth / 2;

  const d = `
    M0 0
    H${curvePosition - 65}
    C${curvePosition - 35} 0, ${curvePosition - 35} 45, ${curvePosition} 45
    C${curvePosition + 35} 45, ${curvePosition + 35} 0, ${curvePosition + 65} 0
    H${tabWidth}
    V70
    H0
    Z
  `;

  return (
    <View style={styles.wrapper}>
      
      <View style={styles.background}>
        <Svg width={tabWidth} height={70}>
          <Path d={d} fill={GlobalStyles.colors.primary500} />
        </Svg>
      </View>

      
      <View style={styles.row}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => navigation.navigate(route.name);

          const icon = options.tabBarIcon({
            color: isFocused
              ? GlobalStyles.colors.accent500
              : "white",
            size: 22,
          });

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.button}
            >
              {isFocused ? <View style={styles.activeCircle}>{icon}</View> : icon}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default CustomTabBar;

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    height: 70,
    alignItems: "center",
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 20,           
    overflow: "hidden",         
  },
  row: {
    flexDirection: "row",
    height: 70,
    alignItems: "flex-start",
  },
  button: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
  },
  activeCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: GlobalStyles.colors.primary500,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -22, 
  },
});
