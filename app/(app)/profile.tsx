import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAccount, useDisconnect } from "wagmi";
import { useRouter } from "expo-router";
import { useIsPatient } from "@/hooks/useIsPatient";
import { Ionicons } from "@expo/vector-icons";
import { useGetUserByAddress } from "@/hooks/useGetUserByAddress";

export default function Profile() {
  const router = useRouter();

  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const  {
    isPatient, 
    isSuccess: isContractSuccess, 
    error: contractError, 
    isError: isContractError 
  } = useIsPatient(address || null);
  
  const {
    user,
    isSuccess,
    isError,
    error
  } = useGetUserByAddress(address || null);

  const handleDisconntect = () => {
    disconnect();
    router.replace("/login");
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.text}>Your wallet is connected:{address}</Text>
        {isContractSuccess && <Text style={styles.text}>Is Patient: {isPatient?.toString()}</Text>}
        {isContractError && <Text style={styles.error}>Error: {contractError?.toString()}</Text>}
        {isSuccess && <Text style={styles.text}>User: {JSON.stringify(user)}</Text>}
        {isError && <Text style={styles.error}>Error: {error?.toString()}</Text>}
        <Button title="Disconnect" onPress={() => handleDisconntect()} />
      </View>
    </View>
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
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  address: {
    fontSize: 14,
    marginBottom: 10,
    color: "blue",
  },
  error: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
});
