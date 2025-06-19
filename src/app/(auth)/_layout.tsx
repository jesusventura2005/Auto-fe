import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen
      name='index'
      options={{
        animation:'slide_from_right',
        title: 'home',
        headerShown: false
      }}
      >
        
      </Stack.Screen>
      <Stack.Screen
        name="login"
        options={{
          animation: 'slide_from_right',
          title: 'Login',
          headerShown: false
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          animation: 'slide_from_right',
          title: 'Register',
          headerShown: false
        }}
      />
    </Stack>
  );
}
