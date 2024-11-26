import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Link } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function RadialMenu() {
  const navigation = useNavigation(); // Hook para navegar

  // Configuración del menú radial
  const radius = Math.min(width, height) * 0.3;
  const angles = [30, 90, 150, 210, 270, 330];
  const items = ["A", "B", "C", "D", "E", "F"];

  const menuPositions = angles.map((angle) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: useSharedValue(Math.cos(rad) * radius),
      y: useSharedValue(Math.sin(rad) * radius),
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Link href={"/profile"} asChild>
          <TouchableOpacity
            style={styles.profileButton}
          >
            <Text style={styles.profileText}>AP</Text>
          </TouchableOpacity>
        </Link>
        <Text style={styles.greetingText}>Hola Angel</Text>
        <TouchableOpacity
          style={styles.notificationButton}
          onPress={() => alert("No tienes nuevas notificaciones")}
        >
          <Ionicons name="notifications-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      <View style={styles.menuContainer}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    width: "100%",
    height: height * 0.1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  profileButton: {
    backgroundColor: "#62CCC7",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  profileText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  notificationButton: {
    padding: 8,
  },
  menuContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  menuItem: {
    position: "absolute",
  },
  itemButton: {
    width: Math.min(width, height) * 0.25,
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
    fontSize: Math.min(width, height) * 0.035,
  },
  centerButton: {
    width: Math.min(width, height) * 0.25,
    height: Math.min(width, height) * 0.25,
    borderRadius: Math.min(width, height) * 0.25,
    backgroundColor: "#62CCC7",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  centerText: {
    color: "#fff",
    fontSize: Math.min(width, height) * 0.04,
    fontWeight: "bold",
  },
});