import { createConfig, type CreateConnectorFn, createStorage, http, webSocket } from "wagmi";
import { sepolia } from '@wagmi/core/chains';
import { walletConnect } from '@reown/appkit-wagmi-react-native/src/connectors/WalletConnectConnector';
import { StorageUtil } from '@reown/appkit-scaffold-utils-react-native';
import { defaultWagmiConfig } from "@reown/appkit-wagmi-react-native";

const chains = [sepolia] as const;
const projectId = process.env.EXPO_PUBLIC_PROJECT_ID as string;
const metadata = {
    name: 'Health Hub',
    description: 'Appkit RN Example',
    url: 'https://reown.com/appkit',
    icons: ['https://avatars.githubusercontent.com/u/179229932'],
};

export const wagmiConfig = defaultWagmiConfig({chains, metadata, projectId});