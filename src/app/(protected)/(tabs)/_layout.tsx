import { Redirect, Tabs } from 'expo-router';
import TabBar from '~/components/layout/TabBar';
import { useAuth } from '~/context/AuthContext';

export default function BottomTabsLayout() {
  const { authState } = useAuth();

  if (authState?.authenticated === false) {
    return <Redirect href="/" />;
  }
  return (
    <Tabs screenOptions={{ headerShown: false }} tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="details/[id]"
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="maintenance/[id]"
        options={{
          title: 'Maintenance',
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="RegisterVehicle"
        options={{
          title: '+',
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="checklist"
        options={{
          title: 'Checklist',
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
