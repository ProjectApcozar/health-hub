import '@walletconnect/react-native-compat';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createAppKit, AppKit } from '@reown/appkit-wagmi-react-native';
import { Slot } from "expo-router";
import { WagmiProvider } from 'wagmi';
import { Provider } from "react-redux";
import { store } from '@/store';
import { wagmiConfig } from '@/utils/wagmi';

const queryClient = new QueryClient();

const projectId = process.env.EXPO_PUBLIC_PROJECT_ID as string;

createAppKit({
  projectId,
  wagmiConfig,
  enableAnalytics: true,
});

export default function RootLayout() {
  return (
    <Provider store={store}>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <Slot />
          <AppKit />
        </QueryClientProvider>
      </WagmiProvider>
    </Provider>
  );
};
