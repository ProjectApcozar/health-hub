import { Button, StyleSheet, Text, View } from "react-native";
import { useAccount, useDisconnect, useReadContract } from "wagmi";
import { ContractAddres } from "@/constants/ContractAddress";
import { healthhubABI } from "@/abis/HealthHubABI";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/SessionContext";
import { useEffect } from "react";

export default function Home() {
  const { setAddress, logout } = useAuth();
  const { address } = useAccount();
  
  const { disconnect } = useDisconnect();
  const router = useRouter();


  useEffect(() => {
    if (address) {
      setAddress(address);
    } else {
      router.replace("/");
    }
  }, [address, setAddress]);

  const handleDisconntect = () => {
    disconnect();
    logout();
    router.replace("/");
  }

  const { data, isSuccess, isError, error } = useReadContract({
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
      {isSuccess && <Text style={styles.text}>Signature: {data?.toString()}</Text>}
      {isError && <Text style={styles.error}>Error: {error?.toString()}</Text>}
      <Button title="Disconnect" onPress={() => handleDisconntect()} />
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
