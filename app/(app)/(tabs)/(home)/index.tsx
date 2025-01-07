import { RootState } from "@/store";
import { useSelector } from "react-redux";
import DoctorHome from "./doctor-home";
import PatientHome from "./patient-home";

export default function Home() {
  const role = useSelector((state: RootState) => state.userRole.role);

  return role === "doctor" ? <DoctorHome /> : <PatientHome />;
};
