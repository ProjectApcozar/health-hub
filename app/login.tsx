import { ConnectButton } from "@reown/appkit-wagmi-react-native";
import { Image, Text, View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import { useIsPatient } from "@/hooks/useIsPatient";
import { useIsDoctor } from "@/hooks/useIsDoctor";
import { useDispatch } from "react-redux";
import { setUserRole } from "@/store/userRoleSlice";

export default function Login() {

  const { isConnected, address } = useAccount();
  const { isPatient, isLoading: isLoadingPatient } = useIsPatient(address);
  const { isDoctor, isLoading: isLoadingDoctor } = useIsDoctor(address);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {

    if (!isConnected || isLoadingPatient) return;
    
    if (isDoctor && isPatient) router.replace("/role-selection");
    else if (isPatient) {
      dispatch(setUserRole("patient"));
      router.replace("/");
    } else router.replace("/register");

  }, [ isConnected, isPatient, isLoadingPatient, isLoadingDoctor ]);

  return (

    <View
      style={styles.container}
    >
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/hh-logo.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Inicio de Sesión</Text>
      </View>
      <ConnectButton 
        label="Conecte su wallet" 
        loadingLabel="Conectando"
        style={styles.connectButton}
      />
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
});