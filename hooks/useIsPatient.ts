import { healthhubABI } from "@/abis/HealthHubABI";
import { contractAddress } from "@/constants/ContractAddress";
import { useReadContract } from "wagmi";

export const useIsPatient = (address: string) => {

    const { data, isSuccess, isError, error, isLoading } = useReadContract({
        abi: healthhubABI,
        address: contractAddress,
        functionName: 'isPatient',
        args: [address],
        query: {
          enabled: !!address,
        },
    });

    return {
        isPatient: data as boolean,
        isSuccess,
        isError,
        error,
        isLoading
    };
};
