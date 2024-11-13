import { AppKitButton } from "@reown/appkit-wagmi-react-native";
import { Text, View } from "react-native";
import { useAccount, useReadContract } from "wagmi";
import healthhubABI from "../abis/HealthHubABI.json";
import { ContractAddres } from "@/constants/ContractAddress";

export default function Index() {

  const { address } = useAccount();

  const { data, isSuccess, isError, error } = useReadContract({
    abi: healthhubABI,
    address: ContractAddres,
    functionName: 'isPatient',
    args: [address],
    query: {
      enabled: !!address,
    },
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AppKitButton />
      {isSuccess && <Text>Signature: {data?.toString()}</Text>}
      {isError && <Text>Error: {error?.toString()}</Text>}
    </View>
  );
}
