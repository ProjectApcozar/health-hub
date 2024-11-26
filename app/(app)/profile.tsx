import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAccount, useDisconnect, useReadContract } from "wagmi";
import { contractAddress } from "@/constants/ContractAddress";
import { healthhubABI } from "@/abis/HealthHubABI";
import { useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { Ionicons } from "@expo/vector-icons";

export default function Profile() {
  const { address } = useAccount();
  
  const { disconnect } = useDisconnect();
  const router = useRouter();

  const handleDisconntect = () => {
    disconnect();
    router.replace("/login");
  }

  const { isSuccess , isError, error, data } = useQuery({
    queryKey: ['data'],
    queryFn: () =>
      fetch('http://192.168.1.129:3000/items', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) =>
        res.json(),
      ),
  });

  const { data: contractData, isSuccess: isContractSuccess, isError: isContractError, error: contractError } = useReadContract({
    abi: healthhubABI,
    address: contractAddress,
    functionName: 'isPatient',
    args: [address],
    query: {
      enabled: !!address,
    },
  });

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
        {isContractSuccess && <Text style={styles.text}>Signature: {contractData?.toString()}</Text>}
        {isContractError && <Text style={styles.error}>Error: {contractError?.toString()}</Text>}
        {isSuccess && <Text style={styles.text}>Data: {data?.[0]?.value ? JSON.stringify(data[0].value) : "No data"}</Text>}
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
    padding: 10,
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
