import { createConfig, type CreateConnectorFn, createStorage, http, webSocket } from "wagmi";
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
const connectors: CreateConnectorFn[] = [];
connectors.push(walletConnect({ projectId, metadata }));

const transportsArr = chains.map(chain => [
  chain.id,
  http(),
]);

const transports = Object.fromEntries(transportsArr);

export const wagmiConfig = createConfig({ 
    chains, 
    connectors,
    transports,
    storage,
    multiInjectedProviderDiscovery: false,
  });