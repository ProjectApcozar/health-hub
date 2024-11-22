import { ConnectButton, useAppKit } from "@reown/appkit-wagmi-react-native";
import { View } from "react-native";
import { Redirect, useRouter } from "expo-router";
import { useAccount } from "wagmi";
import { useEffect } from "react";

export default function Login() {

  const { isConnected } = useAccount();

  const router = useRouter();

  useEffect(() => {
    if (isConnected) {
      router.replace("/");
    }
  }, [ isConnected ]);

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
