import { Redirect, Stack } from 'expo-router';
import { useAccount } from 'wagmi';


export default function AppLayout() {
    const { isConnected } = useAccount();

  if (!isConnected) {
    return <Redirect href="/login" />;
  }

  return(
  <Stack
    screenOptions={{
      headerShown: false,
      animation: "ios_from_left",
    }}
  />
  );
}
