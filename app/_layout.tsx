import '@walletconnect/react-native-compat'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { mainnet, polygon, arbitrum, Chain, sepolia } from '@wagmi/core/chains';
import { createAppKit, defaultWagmiConfig, AppKit } from '@reown/appkit-wagmi-react-native';
import { Stack } from "expo-router";
import { WagmiProvider, } from 'wagmi';

const queryClient = new QueryClient();

const projectId = process.env.EXPO_PUBLIC_REOWN_PROJECT_ID as string;

const metadata = {
  name: 'AppKit RN',
  description: 'Appkit RN Example',
  url: 'https://reown.com/appkit',
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
  redirect: {
    native: '',
    universal: '',
  },
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
        <Stack>
          <Stack.Screen name="index" />
        </Stack>
        <AppKit />
      </QueryClientProvider>
    </WagmiProvider>
  );
};
