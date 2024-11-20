import '@walletconnect/react-native-compat'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { mainnet, polygon, arbitrum, sepolia } from '@wagmi/core/chains';
import { createAppKit, defaultWagmiConfig, AppKit } from '@reown/appkit-wagmi-react-native';
import { Stack } from "expo-router";
import { WagmiProvider, } from 'wagmi';
import { AuthProvider } from '@/contexts/SessionContext';

const queryClient = new QueryClient();

const projectId = process.env.EXPO_PUBLIC_PROJECT_ID as string;

const metadata = {
  name: 'Health Hub',
  description: 'Appkit RN Example',
  url: 'https://192.168.1.129:8081',
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
  redirect: {
    native: 'health-hub://',
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
        <AuthProvider>
          <Stack>
            <Stack.Screen name="index" />
          </Stack>
        </AuthProvider>
        <AppKit />
      </QueryClientProvider>
    </WagmiProvider>
  );
};
