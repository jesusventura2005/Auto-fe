import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="login"
        options={{
          animation: 'fade_from_bottom',
          title: 'Login',
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          animation: 'fade_from_bottom',
          title: 'Register',
        }}
      />
    </Stack>
  );
}
