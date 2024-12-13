import { RootState } from "@/store";
import { useSelector } from "react-redux";
import DoctorHome from "./doctor-home";
import PatientHome from "./patient-home";
import { View, Text, StyleSheet } from "react-native";

export default function Home() {
  const role = useSelector((state: RootState) => state.userRole.role);

  if (!role) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Cargando...</Text>
      </View>
    );
  }

  return role === "doctor" ? <DoctorHome /> : <PatientHome />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  message: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});
