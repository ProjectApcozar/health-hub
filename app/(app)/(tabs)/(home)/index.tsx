import { RootState } from "@/store";
import { useSelector } from "react-redux";
import DoctorHome from "./doctor-home";
import PatientHome from "./patient-home";
import { useRouter } from "expo-router";
import Login from "@/app/login";
import { useIsPatient } from "@/hooks/useIsPatient";
import { useIsDoctor } from "@/hooks/useIsDoctor";
import { useAccount } from "wagmi";

export default function Home() {
    const { address } = useAccount();
    const { isPatient } = useIsPatient(address);
    const { isDoctor } = useIsDoctor(address);
  
  if (isPatient) {
    return <PatientHome />;
  } else if (isDoctor) {
    return <DoctorHome />;
  } else {
    return <Login />;
  }
};
