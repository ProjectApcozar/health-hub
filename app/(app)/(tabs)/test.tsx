import { Button, StyleSheet, Text, View } from "react-native";
import { useAccount, useDisconnect, useReadContract } from "wagmi";
import { ContractAddres } from "@/constants/ContractAddress";
import { healthhubABI } from "@/abis/HealthHubABI";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useIsPatient } from "@/hooks/useIsPatient";

export default function Home() {
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

  const { isSuccess , isError, error, data } = useQuery({
    queryKey: ['data'],
    queryFn: () =>
      fetch('http://192.168.1.180:3000/items', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) =>
        res.json(),
      ),
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
      {isContractSuccess && <Text style={styles.text}>Signature: {isPatient}</Text>}
      {isContractError && <Text style={styles.error}>Error: {contractError?.toString()}</Text>}
      {isSuccess && <Text style={styles.text}>Data: {data?.[0]?.value ? JSON.stringify(data[0].value) : "No data"}</Text>}
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
