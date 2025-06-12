import { Tabs } from 'expo-router';
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import TabBar from '~/components/TabBar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../../global.css';

import { AuthProvider } from '../context/AuthContext';

export default function Layout() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Tabs screenOptions={{ headerShown: false }} tabBar={(props) => <TabBar {...props} />}>
          <Tabs.Screen
            name="index"
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
