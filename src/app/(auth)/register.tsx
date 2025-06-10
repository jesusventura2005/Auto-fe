import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Link, router } from 'expo-router';
import Input from '../../components/Input';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';

const RegisterScreen = () => {
  const { onRegister } = useAuth();
  const [userType, setUserType] = useState<'owner' | 'mechanic'>('owner');

  const registerMutation = useMutation({
    mutationFn: async ({
      email,
      password,
      name,
      userType,
    }: {
      email: string;
      password: string;
      name: string;
      userType: 'owner' | 'mechanic';
    }) => {
      if (!onRegister) throw new Error('Metodo onRegister no definido');
      const response = await onRegister(email, password, name, userType);
      if (response.error) {
        throw new Error(response.msg);
      }
      return response;
    },
    onSuccess: (response) => {
      router.push('/');
    },
    onError: (error) => {
      console.error('Error:', error);
    },
  });

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: { name: string; email: string; password: string }) => {
    registerMutation.mutateAsync({ ...data, userType });
  };

  return (
    <ScrollView
      className="bg-blue-50"
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 32,
      }}
    >
      <View className="w-[90%] max-w-md mb-2">
        <Link href="/" asChild>
          <TouchableOpacity className="flex-row items-center">
            <Text className="text-2xl text-blue-500 mr-2">{'<'}</Text>
            <Text className="text-blue-500 text-lg font-bold">volver</Text>
          </TouchableOpacity>
        </Link>
      </View>
      <View className="w-[90%] max-w-md rounded-2xl bg-white p-6 shadow-lg">
        <Text className="mb-2 text-center text-3xl font-bold text-violet-600">Crea tu cuenta</Text>
        <Text className="mb-8 text-center text-base text-purple-500">
          Únete a nuestra comunidad
        </Text>

        <Input
          control={control}
          label="Nombre"
          icon="👤"
          placeholder="Juan Pérez"
          name="name"
        />
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
          control={control}
          label="Contraseña"
          icon="🔒"
          placeholder="••••••••"
          secureTextEntry={true}
          name="password"
        />

        <View className="mt-2 mb-6">
          <Text className="mb-3 font-semibold text-gray-700">Soy un:</Text>
          <View className="flex-row justify-between space-x-4">
            <TouchableOpacity
              onPress={() => setUserType('owner')}
              className={`flex-1 py-3 px-4 rounded-xl border-2 ${
                userType === 'owner' ? 'bg-sky-400 border-sky-500' : 'bg-gray-200 border-gray-300'
              }`}
            >
              <Text
                className={`text-center font-bold text-base ${
                  userType === 'owner' ? 'text-white' : 'text-gray-700'
                }`}
              >
                Propietario de Vehículo
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setUserType('mechanic')}
              className={`flex-1 py-3 px-4 rounded-xl border-2 ${
                userType === 'mechanic' ? 'bg-sky-400 border-sky-500' : 'bg-gray-200 border-gray-300'
              }`}
            >
              <Text
                className={`text-center font-bold text-base ${
                  userType === 'mechanic' ? 'text-white' : 'text-gray-700'
                }`}
              >
                Mecánico
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity onPress={handleSubmit(onSubmit)} className="bg-blue-500 rounded-xl py-4 mt-4 shadow-md">
          <Text className="text-white text-center font-bold text-xl">Crear cuenta</Text>
        </TouchableOpacity>

        <View className="flex-row justify-center mt-6">
          <Text className="text-gray-600 text-base">¿Ya tienes una cuenta? </Text>
          <Link href="/(auth)/login" asChild>
            <TouchableOpacity>
              <Text className="text-orange-500 font-bold text-base">Iniciar sesión</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;
