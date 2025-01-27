import { StyleSheet } from "react-native";
import { Redirect } from "expo-router";
import DoctorPermissions from "./doctor-permissions";
import PatientPermissions from "./patient-permissions";
import { useAccount } from "wagmi";
import { useIsPatient } from "@/hooks/useIsPatient";
import { useIsDoctor } from "@/hooks/useIsDoctor";
import Login from "@/app/login";

export default function Permissions() {
  const { address } = useAccount();
  const { isPatient } = useIsPatient(address);
  const { isDoctor } = useIsDoctor(address);

  if (!isPatient && !isDoctor) {
    return <Login />;
  }

  if (isPatient) {
    return <PatientPermissions />;
  } else {
    return <DoctorPermissions />;
  }
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
