import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';

const LoginScreen = () => {
  const { onLogin } = useAuth();

  const useLoginMutation = () => {
    return useMutation({
      mutationFn: async ({ email, password }: any) => {
        if (onLogin) {
          return await onLogin(email, password);
        }
      },
      onSuccess: (response) => {
        console.log('Respuesta del servidor:', response.data);
      },
      onError: (error) => console.log('Error:', error),
    });
  };

  const loginMutation = useLoginMutation();

  const { control, handleSubmit } = useForm();

  return (
    <ScrollView
      className="bg-blue-50"
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 32,
      }}>
      <View className="w-[90%] max-w-md rounded-2xl bg-white p-6 shadow-lg">
        <Text className="mb-2 text-center text-3xl font-bold text-violet-600">Iniciar sesión</Text>
        <Text className="mb-8 text-center text-base text-purple-500">Bienvenido de nuevo</Text>

        <Input
          control={control}
          label="Correo electrónico"
          icon="✉️"
          placeholder="tucorreo@ejemplo.com"
          keyboardType="email-address"
          autoCapitalize="none"
          name="email"
        />
        <Input
          label="Contraseña"
          icon="🔒"
          placeholder="••••••••"
          secureTextEntry={true}
          control={control}
          name="password"
        />

        <Link href="/" asChild>
          <Button
            onPress={handleSubmit((data) => loginMutation.mutateAsync(data))}
            title="Entrar"
          />
        </Link>

        <View className="mt-6 flex-row justify-center">
          <Text className="text-base text-gray-600">¿No tienes una cuenta? </Text>
          <Link href="/screens/Register" asChild>
            <TouchableOpacity>
              <Text className="text-base font-bold text-orange-500">Regístrate</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
