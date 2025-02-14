import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Avatar, IconButton, Badge } from "react-native-paper";
import { useSelector } from "react-redux";
import { RootState } from "@/store/index";
import { NotificationsFloatingModal } from "./NotificationsFloatingModal";

export const CommonHeader = ({ userName = "Usuario" }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const doctorLogs = useSelector((state: RootState) => state.notifications.logs);
  const hasNotifications = doctorLogs.length > 0;

  return (
    <>
      <View style={styles.header}>
        <Link href="/profile" asChild>
          <TouchableOpacity>
            <Avatar.Text size={40} label="AP" style={styles.profileButton} labelStyle={styles.profileText} />
          </TouchableOpacity>
        </Link>
        <Text style={styles.greetingText}>{`Hola ${userName}`}</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.notificationContainer}>
          <IconButton icon={"bell-outline"} style={styles.notificationButton} />
          {hasNotifications && (
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