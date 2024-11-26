import { ConnectButton, useAppKit } from "@reown/appkit-wagmi-react-native";
import { View } from "react-native";
import { Redirect, useRouter } from "expo-router";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import { useIsPatient } from "@/hooks/useIsPatient";

export default function Login() {

  const { isConnected, address } = useAccount();
  const { isPatient, isLoading } = useIsPatient(address || null);
  const router = useRouter();

  useEffect(() => {
    if (!isConnected || isLoading) return;

    if (isPatient){
      router.replace("/");
    } else {
      router.replace("/register");
    }
  }, [ isConnected, isPatient, isLoading ]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ConnectButton label="Conecte" loadingLabel="Conectando"/>
    </View>
  );
}
