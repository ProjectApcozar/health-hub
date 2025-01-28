import { StyleSheet } from "react-native";
import DoctorPermissions from "./doctor-permissions";
import PatientPermissions from "./patient-permissions";
import { useAccount } from "wagmi";

import Login from "@/app/login";
import { useGetIsDoctorQuery, useGetIsPatientQuery } from "@/services/user";

export default function Permissions() {
  const { address } = useAccount();
  const { data: isPatient } = useGetIsPatientQuery(address!);
  const { data: isDoctor } = useGetIsDoctorQuery(address!);

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
