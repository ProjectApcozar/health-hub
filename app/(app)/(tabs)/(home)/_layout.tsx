import { Stack } from 'expo-router';

export default function HomeLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="basic-data" options={{ title: 'Datos Básicos' }} />
      <Stack.Screen name="medication" options={{ title: 'Medicación' }} />
      <Stack.Screen name="clinic-reports" options={{ title: 'Informes Clínicos' }} />
      <Stack.Screen name="analytic-reports" options={{ title: 'Pruebas Analíticas' }} />
      <Stack.Screen name="image-reports" options={{ title: 'Pruebas de Imagen' }} />
      <Stack.Screen name="temporary-incapacity" options={{ title: 'Incapacidad Temporal' }} />
      <Stack.Screen name="vaccines" options={{ title: 'Vacunas' }} />
    </Stack>
  );
}
