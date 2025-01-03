import { RootState } from "@/store";
import { useSelector } from "react-redux";
import DoctorHome from "./doctor-home";
import PatientHome from "./patient-home";
import { StyleSheet } from "react-native";
import { Redirect } from "expo-router";

export default function Home() {
  const role = useSelector((state: RootState) => state.userRole.role);

  if (!role) {
    return <Redirect href="/login" />;
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
