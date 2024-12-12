import { Button, StyleSheet, Text, View } from "react-native";
import { useAccount, useDisconnect } from "wagmi";
import { useRouter } from "expo-router";
import { useIsPatient } from "@/hooks/useIsPatient";
import { useGetUserByAddress } from "@/hooks/useGetUserByAddress";

export default function Home() {
  const router = useRouter();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  if (!address) return null;

  const  {
    isPatient, 
    isSuccess: isContractSuccess, 
    error: contractError, 
    isError: isContractError 
  } = useIsPatient(address);

  const {
    user,
    isSuccess,
    isError,
    error
  } = useGetUserByAddress(address);

  const handleDisconntect = () => {
    disconnect();
    router.replace("/login");
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={styles.text}>Your wallet is connected:{address}</Text>
      {isContractSuccess && <Text style={styles.text}>Is Patient: {isPatient.toString()}</Text>}
      {isContractError && <Text style={styles.error}>Error: {contractError?.toString()}</Text>}
      {isSuccess && <Text style={styles.text}>User: {JSON.stringify(user)}</Text>}
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
