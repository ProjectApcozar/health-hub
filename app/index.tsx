import { ConnectButton } from "@reown/appkit-wagmi-react-native";
import { View } from "react-native";
import { useAccount } from "wagmi";
import { Redirect } from "expo-router";

export default function Index() {

  const { isConnected } = useAccount();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!isConnected ? (
        <ConnectButton label="Conecte" loadingLabel="Conectando"/>
      ) : (
        <Redirect href={"/(app)/home"} />
      )}
    </View>
  );
}
