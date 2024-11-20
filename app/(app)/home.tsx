import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window"); // Obtenemos el tamaño de la pantalla

const RadialMenu = () => {
  // Radio dinámico en función del ancho o alto (el menor de los dos)
  const radius = Math.min(width, height) * 0.3; // 30% del lado más corto
  const angles = [30, 90, 150, 210, 270, 330];
  const items = ["A", "B", "C", "D", "E", "F"];

  // Calcular posiciones iniciales de los botones
  const menuPositions = angles.map((angle) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: useSharedValue(Math.cos(rad) * radius),
      y: useSharedValue(Math.sin(rad) * radius),
    };
  });

  return (
    <View style={styles.container}>
      {items.map((item, index) => {
        const animatedStyle = useAnimatedStyle(() => ({
          transform: [
            { translateX: menuPositions[index].x.value },
            { translateY: menuPositions[index].y.value },
          ],
        }));

        return (
          <Animated.View key={index} style={[styles.menuItem, animatedStyle]}>
            <TouchableOpacity style={[styles.itemButton]}>
              <Text style={styles.itemText}>{item}</Text>
            </TouchableOpacity>
          </Animated.View>
        );
      })}

      <TouchableOpacity style={styles.centerButton}>
        <Text style={styles.centerText}>Menu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  menuItem: {
    position: "absolute",
  },
  itemButton: {
    // Botones escalables según el ancho o alto de la pantalla
    width: Math.min(width, height) * 0.25, // 12% del lado más corto
    height: Math.min(width, height) * 0.25,
    borderRadius: Math.min(width, height) * 0.25,
    backgroundColor: "#62CCC782",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  itemText: {
    color: "#fff",
    fontSize: Math.min(width, height) * 0.035, // Escalado dinámico
  },
  centerButton: {
    // Botón central escalable
    width: Math.min(width, height) * 0.25, // 18% del lado más corto
    height: Math.min(width, height) * 0.25,
    borderRadius: Math.min(width, height) * 0.25,
    backgroundColor: "#62CCC7",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  centerText: {
    color: "#fff",
    fontSize: Math.min(width, height) * 0.04, // Escalado dinámico
    fontWeight: "bold",
  },
});

export default RadialMenu;
