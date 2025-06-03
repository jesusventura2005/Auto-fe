import { Slot } from 'expo-router';
import { View } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../../global.css';
import { AuthProvider } from '../context/AuthContext';

export default function Layout() {
  const queryClient = new QueryClient();

  return (
    <View className="flex-1 justify-center bg-slate-600">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Slot></Slot>
        </AuthProvider>
      </QueryClientProvider>
    </View>
  );
}
