import { Stack } from 'expo-router';

export default function AuthenticatedLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="vehicle"
        options={{ 
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="profile"
        options={{ 
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="history"
        options={{ 
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="home"
        options={{ 
          headerShown: false
        }} 
      />
    </Stack>
  );
}