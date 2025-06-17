import { SplashScreen, Tabs, useRouter } from 'expo-router';
import TabBar from '~/components/TabBar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import '../../global.css';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { useEffect, useRef } from 'react';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const queryClient = new QueryClient();
  const { authState } = useAuth();
  const router = useRouter();
  const didMount = useRef(false);

  const [fontsLoaded, error] = useFonts({
    'Inter-var': require('src/assets/fonts/Inter-VariableFont_opsz,wght.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  // useEffect(() => {
  //   if (!didMount.current) {
  //     didMount.current = true;
  //     return;
  //   }
  //   if (authState?.authenticated) {
  //     router.push('(home)/Dashboard');
  //   } else {
  //     router.push('/');
  //   }
  // }, [authState?.authenticated, router]);

  // useEffect(() => {
  //   const subscription = AppState.addEventListener('change', (state) => {
  //     if (state === 'active' && authState?.authenticated) {
  //       router.push('(home)/Dashboard');
  //     }
  //   });
  //   return () => subscription.remove();
  // }, [authState?.authenticated, router]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Tabs screenOptions={{ headerShown: false }} tabBar={(props) => <TabBar {...props} />}>
          <Tabs.Screen
            name="(home)/details/[id]"
            options={{
              title: 'Home',
            }}
          />
          <Tabs.Screen
            name="(home)/maintenance/[id]"
            options={{
              title: 'Maintenance',
            }}
          />
          <Tabs.Screen
            name="(home)/RegisterVehicle"
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
