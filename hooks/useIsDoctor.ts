import { healthhubABI } from "@/abis/HealthHubABI";
import { contractAddress } from "@/constants/ContractAddress";
import { useReadContract } from "wagmi";

export const useIsDoctor = (address?: string) => {

    const { data, isSuccess, isError, error, isLoading } = useReadContract({
        abi: healthhubABI,
        address: contractAddress,
        functionName: 'isDoctor',
        args: [address],
        query: {
          enabled: !!address,
        },
    });

    return {
        isDoctor: data as boolean,
        isSuccess,
        isError,
        error,
        isLoading
    };
};
