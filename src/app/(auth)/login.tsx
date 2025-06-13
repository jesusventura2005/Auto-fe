import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Link, router } from 'expo-router';
import Input from '~/components/Input';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '~/context/AuthContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';

const LoginScreen = () => {
  const { onLogin } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      if (!onLogin) throw new Error('Metodo onLogin no definido');
      const response = await onLogin(email, password);
      if (response.error) {
        throw new Error(response.msg);
      }
      return response;
    },
    onSuccess: (response) => {
      console.log('Respuesta del servidor:', response.data);
      setServerError(null); // Limpiar el error del servidor al iniciar sesión correctamente
      router.push('/');
    },
    onError: (error) => {
      setServerError(error.message || 'Error al iniciar sesión');
      console.error('Error:', error);
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: { email: string; password: string }) => {
    console.log('Datos del formulario:', data);
    loginMutation.mutateAsync(data);
  };

  return (
    <ScrollView
      className="bg-blue-50"
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 32,
      }}>
      <Text className="mb-2 text-center text-4xl font-bold text-sky-600">Iniciar sesión</Text>
      <Text className="mb-8 text-center text-xl text-black">Bienvenido de nuevo</Text>

      <View className="w-[90%] max-w-md rounded-2xl bg-white p-6 shadow-lg">
        <Input
          control={control}
          label="Correo electrónico"
          icon={<Ionicons name="mail" size={16} color="#999" className="mr-2" />}
          placeholder="tucorreo@ejemplo.com"
          keyboardType="email-address"
          autoCapitalize="none"
          name="email"
          rules={{
            required: 'El correo electrónico es obligatorio',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Formato de correo electrónico inválido',
            },
          }}
          error={isSubmitted ? errors.email : undefined}
        />
        <Input
          label="Contraseña"
          icon={<Ionicons name="lock-closed" size={16} color="#999" className="mr-2" />}
          placeholder="••••••••"
          secureTextEntry={true}
          control={control}
          name="password"
          rules={{
            required: 'La contraseña es obligatoria',
            minLength: {
              value: 6,
              message: 'La contraseña debe tener al menos 6 caracteres',
            },
          }}
          error={isSubmitted ? errors.password : undefined}
        />

        {serverError && (
          <Text className="mb-4 rounded-lg bg-red-400 py-2 text-center text-white">
            {serverError}
          </Text>
        )}

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          className="rounded-xl bg-sky-500 px-4 py-3">
          <Text className="text-center text-lg font-bold text-white">Entrar</Text>
        </TouchableOpacity>

        <View className="mt-6 flex-row justify-center">
          <Text className="text-lg text-gray-600">¿No tienes una cuenta? </Text>
          <Link href="(auth)/register" asChild>
            <TouchableOpacity>
              <Text className="text-lg font-bold text-sky-600">Regístrate</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
