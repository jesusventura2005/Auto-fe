import { Slot } from 'expo-router';
import { View } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../../global.css';
import { LinearGradient } from 'expo-linear-gradient';

import { AuthProvider } from '../context/AuthContext';

export default function Layout() {
  const queryClient = new QueryClient();

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
