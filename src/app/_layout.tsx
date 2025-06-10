import { Slot, SplashScreen } from 'expo-router';
import { View } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import '../../global.css';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthProvider } from '../context/AuthContext';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const queryClient = new QueryClient();

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
    <View className="flex-1">
      <LinearGradient colors={['#111827', '#0369a1']} style={{ width: '100%', height: '100%' }}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Slot></Slot>
          </AuthProvider>
        </QueryClientProvider>
      </LinearGradient>
    </View>
  );
}
