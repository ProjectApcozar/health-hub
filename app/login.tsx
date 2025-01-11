import { useAppKit } from "@reown/appkit-wagmi-react-native";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import { useIsPatient } from "@/hooks/useIsPatient";
import { useIsDoctor } from "@/hooks/useIsDoctor";
import { useDispatch } from "react-redux";
import { setUserRole } from "@/store/userRoleSlice";

export default function Login() {
  const { open } = useAppKit()

  const { isConnected, address } = useAccount();
  const { isPatient, isLoading: isLoadingPatient } = useIsPatient(address);
  const { isDoctor, isLoading: isLoadingDoctor } = useIsDoctor(address);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isConnected || isLoadingPatient) return;

    if (!isPatient && !isDoctor){
      router.replace("/register");
    }

    if (isDoctor && isPatient) router.replace("/role-selection");
    else if (isPatient) {
      dispatch(setUserRole("patient"));
      router.replace("/");
    } else if (isDoctor) {
      dispatch(setUserRole("doctor"));
      router.replace("/");
    }

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
      <TouchableOpacity style={styles.button} onPress={() => open() }>
        <Text style={styles.buttonText}>Conectar wallet</Text>
      </TouchableOpacity>
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