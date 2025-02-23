import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Avatar, IconButton, Badge } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/index";
import { NotificationsFloatingModal } from "./NotificationsFloatingModal";
import { markAsRead } from "@/store/notificationsSlice";

export const CommonHeader = ({ userName = "Usuario" }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const unread = useSelector((state: RootState) => state.notifications.unread);
  const dispatch = useDispatch();

  const handlePress = () => {
    setModalVisible(true);
    dispatch(markAsRead());
  }

  const getInitials = (name: string) => {
    return name
      .split(" ") // Divide el nombre en palabras
      .map((word) => word.charAt(0).toUpperCase()) // Toma la primera letra de cada palabra en mayúscula
      .join(""); // Une las iniciales
  };

  return (
    <>
      <View style={styles.header}>
        <Link href="/profile" asChild>
          <TouchableOpacity>
            <Avatar.Text size={40} label={getInitials(userName)} style={styles.profileButton} labelStyle={styles.profileText} />
          </TouchableOpacity>
        </Link>
        <Text style={styles.greetingText}>{`Hola ${userName}`}</Text>
        <TouchableOpacity onPress={handlePress} style={styles.notificationContainer}>
          <IconButton icon={"bell-outline"} style={styles.notificationButton} />
          {unread && (
            <View style={styles.badgeContainer}>
              <Badge style={styles.badge} size={10} />
            </View>
          )}
        </TouchableOpacity>
      </View>
      <NotificationsFloatingModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  notificationContainer: {
    position: "relative",
  },
  profileText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  profileButton: {
    backgroundColor: "#62CCC7",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  notificationButton: {
    padding: 8,
  },
  badgeContainer: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  badge: {
    backgroundColor: "red",
  },
});