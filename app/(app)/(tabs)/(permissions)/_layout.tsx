import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { StyleSheet } from "react-native";
import { Redirect } from "expo-router";
import DoctorPermissions from "./doctor-permissions";
import PatientPermissions from "./patient-permissions";

export default function Permissions() {
  const role = useSelector((state: RootState) => state.userRole.role);

  console.log(role);
  if (!role) {
    return <Redirect href="/login" />;
  }

  return role === "doctor" ? <DoctorPermissions /> : <PatientPermissions />;
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
