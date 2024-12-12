import { Stack } from 'expo-router';

export default function CategoriesLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="basic" options={{ title: 'Datos Básicos' }} />
      <Stack.Screen name="medication" options={{ title: 'Medicación' }} />
      <Stack.Screen name="reports" options={{ title: 'Informes Clínicos' }} />
    </Stack>
  );
}
