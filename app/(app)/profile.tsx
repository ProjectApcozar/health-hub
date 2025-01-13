import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Avatar, Button, Card } from "react-native-paper";
import { useAccount, useDisconnect } from "wagmi";
import { useRouter } from "expo-router";
import { useIsPatient } from "@/hooks/useIsPatient";
import { Ionicons } from "@expo/vector-icons";
import { useGetUserByAddress } from "@/hooks/useGetUserByAddress";
import { useDispatch } from "react-redux";
import { clearUserRole } from "@/store/userRoleSlice";

export default function Profile() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  if (!address) return null;

  const {
    isPatient,
    isSuccess: isContractSuccess,
    error: contractError,
    isError: isContractError,
  } = useIsPatient(address);

  const {
    user,
    isSuccess,
    isError,
    error,
  } = useGetUserByAddress(address);

  const handleDisconntect = () => {
    disconnect();
    dispatch(clearUserRole());
    router.replace("/login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Perfil</Text>
      </View>
      <View style={styles.content}>
        <Card style={styles.profileCard}>
          <Card.Content>
            <View style={styles.profileInfo}>
              <Avatar.Icon size={64} icon="account" style={styles.avatar} />
              <Text style={styles.userName}>{user?.name || "Usuario Anónimo"}</Text>
              <Text style={styles.userRole}>{isPatient ? "Paciente" : "Usuario"}</Text>
            </View>
          </Card.Content>
        </Card>

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Dirección Wallet:</Text>
          <Text style={styles.infoText}>{address}</Text>

          {isSuccess && (
            <Text style={styles.infoText}>Usuario: {JSON.stringify(user)}</Text>
          )}

          {isError && (
            <Text style={styles.error}>Error: {error?.toString()}</Text>
          )}
        </View>

        <Button
          mode="contained"
          style={styles.disconnectButton}
          onPress={handleDisconntect}
        >
          Desconectar
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#62CCC7",
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  profileCard: {
    width: "100%",
    borderRadius: 15,
    backgroundColor: "#fff",
    elevation: 3,
    marginBottom: 20,
  },
  profileInfo: {
    alignItems: "center",
  },
  avatar: {
    backgroundColor: "#62CCC7",
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
    color: "#333",
  },
  userRole: {
    fontSize: 16,
    color: "#777",
    marginTop: 5,
  },
  infoContainer: {
    width: "100%",
    marginTop: 20,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  infoText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  error: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
  disconnectButton: {
    marginTop: 30,
    backgroundColor: "#62CCC7",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});
