<<<<<<< Updated upstream
import { Button, StyleSheet, Text, View } from "react-native";
import { useAccount, useDisconnect, useReadContract } from "wagmi";
import { ContractAddres } from "@/constants/ContractAddress";
import { healthhubABI } from "@/abis/HealthHubABI";
import { useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
=======
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAccount, useDisconnect } from "wagmi";
import { useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { Ionicons } from "@expo/vector-icons";
import { useIsPatient } from "@/hooks/useIsPatient";
>>>>>>> Stashed changes

export default function Profile() {
  const { address } = useAccount();
  
  const { disconnect } = useDisconnect();
  const  {
    isPatient, 
    isSuccess: isContractSuccess, 
    error: contractError, 
    isError: isContractError 
  } = useIsPatient(address || null);
  
  const router = useRouter();

  const handleDisconntect = () => {
    disconnect();
    router.replace("/login");
  }

  const baseURL = process.env.EXPO_PUBLIC_API_URL as string;
  const URL =`${baseURL}/items`;

  const { isSuccess , isError, error, data } = useQuery({
    queryKey: ['data'],
    queryFn: () =>
      fetch(URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) =>
        res.json(),
      ),
  });

<<<<<<< Updated upstream
  const { data: contractData, isSuccess: isContractSuccess, isError: isContractError, error: contractError } = useReadContract({
    abi: healthhubABI,
    address: ContractAddres,
    functionName: 'isPatient',
    args: [address],
    query: {
      enabled: !!address,
    },
  });

  return (
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
=======
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
        {isContractSuccess && <Text style={styles.text}>Signature: {isPatient?.toString()}</Text>}
        {isContractError && <Text style={styles.error}>Error: {contractError?.toString()}</Text>}
        {isSuccess && <Text style={styles.text}>Data: {data?.[0]?.value ? JSON.stringify(data[0].value) : "No data"}</Text>}
        {isError && <Text style={styles.error}>Error: {error?.toString()}</Text>}
        <Button title="Disconnect" onPress={() => handleDisconntect()} />
      </View>
>>>>>>> Stashed changes
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
