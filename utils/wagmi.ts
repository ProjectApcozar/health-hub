import { sepolia } from '@wagmi/core/chains';
import { defaultWagmiConfig } from "@reown/appkit-wagmi-react-native";
import { createPublicClient, webSocket } from 'viem';

const chains = [sepolia] as const;
const projectId = process.env.EXPO_PUBLIC_PROJECT_ID as string;
const metadata = {
    name: 'Health Hub',
    description: 'Appkit RN Example',
    url: 'https://reown.com/appkit',
    icons: ['https://avatars.githubusercontent.com/u/179229932'],
};

export const wagmiConfig = defaultWagmiConfig({chains, metadata, projectId});

export const publicClient = createPublicClient({
    chain: sepolia,
    transport: webSocket('wss://sepolia.infura.io/ws/v3/82f0375fcd6844948892bf0305a6ba2a'),
});