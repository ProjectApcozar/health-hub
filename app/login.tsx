import { useAppKit } from "@reown/appkit-wagmi-react-native";
import { Image, View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import { Button, Text } from "react-native-paper";
import { useGetIsDoctorQuery, useGetIsPatientQuery } from "@/services/apis/user";

export default function Login() {
  const { open } = useAppKit()

  const { isConnected, address, isConnecting } = useAccount();
  const { data: isPatient, isLoading: isLoadingPatient } = useGetIsPatientQuery(address!);
  const { data: isDoctor, isLoading: isLoadingDoctor } = useGetIsDoctorQuery(address!);
  const router = useRouter();

  useEffect(() => {
    if (!isConnected || isLoadingPatient || isLoadingDoctor) return;

    if (!isPatient && !isDoctor){
      router.replace("/register");
      return;
    }

    if (isDoctor && isPatient){
      router.replace("/role-selection");
      return;
    } 
     
    if (isPatient || isDoctor) {
      router.replace("/");
      return;
    }

  }, [ isConnected, isDoctor, isPatient, isLoadingPatient, isLoadingDoctor ]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/hh-logo.png')}
          style={styles.logo}
        />
        <Text variant="headlineSmall" style={styles.title}>
          Inicio de Sesión
        </Text>
      </View>
      <Button
        mode="contained"
        loading={isConnecting}
        style={styles.button} 
        onPress={() => open()}
        labelStyle={styles.buttonText}
      >
        {!isConnecting ? "Conectar Wallet" : "Conectando..."}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  connectButton: {
    backgroundColor: "#62CCC7",
    paddingHorizontal: 20,
  },
  button: {
    alignSelf: "center",
    backgroundColor: "#62CCC7",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 15,
    alignItems: "center",
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});