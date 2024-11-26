import '@walletconnect/react-native-compat'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { mainnet, polygon, arbitrum, sepolia } from '@wagmi/core/chains';
import { createAppKit, defaultWagmiConfig, AppKit } from '@reown/appkit-wagmi-react-native';
import { Slot } from "expo-router";
import { WagmiProvider, } from 'wagmi';

const queryClient = new QueryClient();

const projectId = process.env.EXPO_PUBLIC_PROJECT_ID as string;

const metadata = {
  name: 'Health Hub',
  description: 'Appkit RN Example',
  url: 'https://reown.com/appkit',
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
};

const chains = [mainnet, polygon, arbitrum, sepolia] as const;
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createAppKit({
  projectId,
  wagmiConfig,
  enableAnalytics: true,
});

export default function RootLayout() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <Slot />
        <AppKit />
      </QueryClientProvider>
    </WagmiProvider>
  );
};
