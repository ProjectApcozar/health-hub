import DoctorHome from "./doctor-home";
import PatientHome from "./patient-home";
import Login from "@/app/login";
import { useAccount } from "wagmi";
import { useGetIsDoctorQuery, useGetIsPatientQuery } from "@/services/user";

export default function Home() {
    const { address } = useAccount();
    const { data: isPatient } = useGetIsPatientQuery(address!);
    const { data: isDoctor } = useGetIsDoctorQuery(address!);
  
  if (isPatient) {
    return <PatientHome />;
  } else if (isDoctor) {
    return <DoctorHome />;
  } else {
    return <Login />;
  }
};
