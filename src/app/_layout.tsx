import { SplashScreen, Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import '../../global.css';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const queryClient = new QueryClient();
  const { authState } = useAuth();

  console.log('Auth State:', authState);

  const [fontsLoaded, error] = useFonts({
    'Inter-var': require('src/assets/fonts/Inter-VariableFont_opsz,wght.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false, gestureEnabled: false }}>
          <Stack.Screen
            name="(protected)"
            options={{
              headerShown: false,
              animation: 'none',
            }}
          />
          <Stack.Screen
            name="index"
            options={{
              animation: 'none',
            }}
          />
        </Stack>
      </AuthProvider>
    </QueryClientProvider>
  );
}
