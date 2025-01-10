import { createConfig, createStorage, webSocket } from "wagmi";
import { sepolia } from '@wagmi/core/chains';
import { walletConnect } from '@reown/appkit-wagmi-react-native/src/connectors/WalletConnectConnector';
import { StorageUtil } from '@reown/appkit-scaffold-utils-react-native';

const chains = [sepolia] as const;
const projectId = process.env.EXPO_PUBLIC_PROJECT_ID as string;
const metadata = {
    name: 'Health Hub',
    description: 'Appkit RN Example',
    url: 'https://reown.com/appkit',
    icons: ['https://avatars.githubusercontent.com/u/179229932'],
};
const storage = createStorage({ storage: StorageUtil });

export const wagmiConfig = createConfig({ 
    chains, 
    connectors: [
      walletConnect({
        projectId,
        metadata
      }),
    ],
    transports: {
      [sepolia.id]: webSocket('wss://sepolia.infura.io/ws/v3/82f0375fcd6844948892bf0305a6ba2a'),
    },
    storage,
    multiInjectedProviderDiscovery: false,
  });