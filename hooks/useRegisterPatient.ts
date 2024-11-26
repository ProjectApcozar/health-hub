import { healthhubABI } from "@/abis/HealthHubABI"
import { ContractAddres } from "@/constants/ContractAddress"
import { useWriteContract } from "wagmi"

export const useRegisterPatient = () => {
    const { writeContract, data, isSuccess } = useWriteContract();

    writeContract({
        abi: healthhubABI,
        address: ContractAddres,
        functionName: 'registerPatient',
    });
}