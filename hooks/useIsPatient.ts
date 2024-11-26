import { healthhubABI } from "@/abis/HealthHubABI";
import { ContractAddres } from "@/constants/ContractAddress";
import { useReadContract } from "wagmi";

export const useIsPatient = (address: string | null) => {

    const { data, isSuccess, isError, error, isLoading } = useReadContract({
        abi: healthhubABI,
        address: ContractAddres,
        functionName: 'isPatient',
        args: [address],
        query: {
          enabled: !!address,
        },
    });

    return {
        isPatient: data?.toString(),
        isSuccess,
        isError,
        error,
        isLoading
    };
};
