import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { setUserRole } from "@/store/userRoleSlice";

export default function RoleSelection() {
  const router = useRouter();
  const dispatch = useDispatch();
  
  const handleDoctorLogin = () => {
    dispatch(setUserRole("doctor"));
    router.push("/");
  };

  const handlePatientLogin = () => {
    dispatch(setUserRole("patient"));
    router.push("/");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/hh-logo.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>¿Cómo quiere iniciar sesión?</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleDoctorLogin}>
          <Text style={styles.buttonText}>Como Doctor</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handlePatientLogin}>
          <Text style={styles.buttonText}>Como Paciente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    textAlign: "center",
  },
  buttonContainer: {
    width: "80%",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#62CCC7",
    paddingVertical: 15,
    borderRadius: 10,
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
