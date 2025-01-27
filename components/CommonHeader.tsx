import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Link } from "expo-router";
import { Avatar, IconButton } from "react-native-paper";

interface CommonHeaderProps {
  userName?: string;
};

export const CommonHeader = ({ userName = "Usuario" }: CommonHeaderProps) => {

  return (
    <View style={styles.header}>
        <Link href="/profile" asChild>
            <TouchableOpacity>
                <Avatar.Text size={40} label="AP" style={styles.profileButton} labelStyle={styles.profileText}/>
            </TouchableOpacity>
        </Link>
        <Text style={styles.greetingText}>{`Hola ${userName}`}</Text>
        <IconButton 
            icon={"bell-outline"} 
            style={styles.notificationButton}
            onPress={() => alert("No tienes nuevas notificaciones")}
        />
    </View>
  );
};

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
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
});