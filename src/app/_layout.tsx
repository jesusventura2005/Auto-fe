import { SplashScreen, Tabs, useRouter } from 'expo-router';
import TabBar from '~/components/TabBar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import '../../global.css';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const queryClient = new QueryClient();
  const { authState } = useAuth();
  const router = useRouter();

  const [fontsLoaded, error] = useFonts({
    'Inter-var': require('src/assets/fonts/Inter-VariableFont_opsz,wght.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  useEffect(() => {
    if (authState?.authenticated) {
      router.replace('(home)/Dashboard');
    }
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Tabs screenOptions={{ headerShown: false }} tabBar={(props) => <TabBar {...props} />}>
          <Tabs.Screen
            name="(home)/index"
            options={{
              title: 'Home',
            }}
          />
          <Tabs.Screen
            name="(home)/(maintenance)/maintenanceLog"
            options={{
              title: 'Maintenance',
            }}
          />
          <Tabs.Screen
            name="(home)/(maintenance)/RegisterVehicle"
            options={{
              title: '+',
            }}
          />
          <Tabs.Screen
            name="checklist"
            options={{
              title: 'Checklist',
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: 'Profile',
            }}
          />
        </Tabs>
      </AuthProvider>
    </QueryClientProvider>
  );
}
