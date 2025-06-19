import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Link, router } from 'expo-router';
import Input from '~/components/ui/Input';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '~/context/AuthContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';

const LoginScreen = () => {
  const { onLogin } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      if (!onLogin) throw new Error('Metodo onLogin no definido');
      const response = await onLogin(email, password);
      if (response.error) {
        throw new Error(response.msg);
      }
      return response;
    },
    onSuccess: (response) => {
      setServerError(null); // Limpiar el error del servidor al iniciar sesión correctamente
      router.push('Dashboard'); // Redirigir al dashboard después de iniciar sesión
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
    mutate(data);
  };

  return (
    <ScrollView
      className="bg-color-bg dark:bg-color-bg-dark"
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 32,
      }}>
      <Text className="text-color-secondary mb-2 text-center text-4xl font-bold">
        Iniciar sesión
      </Text>
      <Text className="dark:text-color-text-dark mb-8 text-center text-xl text-black">
        Bienvenido de nuevo
      </Text>

      <View className="dark:bg-color-bg-dark dark:border-color-border-dark w-[90%] max-w-md rounded-2xl bg-white p-6 shadow-lg dark:border">
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
          <Text className="bg-color-alert mb-4 rounded-lg py-2 text-center text-white">
            {serverError}
          </Text>
        )}

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={isPending}
          className="bg-color-secondary rounded-xl px-4 py-3">
          {isPending ? (
            <ActivityIndicator size="small" color="#fff" className="text-center" />
          ) : (
            <Text className="text-center text-lg font-bold text-white">Entrar</Text>
          )}
        </TouchableOpacity>

        <View className="mt-6 flex-row justify-center">
          <Text className="text-color-text dark:text-color-text-dark text-lg">
            ¿No tienes una cuenta?{' '}
          </Text>
          <Link href="(auth)/register" asChild>
            <TouchableOpacity disabled={isPending}>
              <Text className="text-color-secondary text-lg font-bold">Regístrate</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
