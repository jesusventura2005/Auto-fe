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
      }}>
      <View className="mb-2 w-[90%] max-w-md">
        <Link href="/" asChild>
          <TouchableOpacity className="flex-row items-center">
            <Text className="mr-2 text-2xl text-blue-500">{'<'}</Text>
            <Text className="text-lg font-bold text-blue-500">volver</Text>
          </TouchableOpacity>
        </Link>
      </View>
      <View className="w-[90%] max-w-md rounded-2xl bg-white p-6 shadow-lg">
        <Text className="mb-2 text-center text-3xl font-bold text-violet-600">Crea tu cuenta</Text>
        <Text className="mb-8 text-center text-base text-purple-500">
          Únete a nuestra comunidad
        </Text>

        <Input control={control} label="Nombre" icon="👤" placeholder="Juan Pérez" name="name" />
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

        <View className="mb-6 mt-2">
          <Text className="mb-3 font-semibold text-gray-700">Soy un:</Text>
          <View className="flex-row justify-between space-x-4">
            <TouchableOpacity
              onPress={() => setUserType('owner')}
              className={`flex-1 rounded-xl border-2 px-4 py-3 ${
                userType === 'owner' ? 'border-sky-500 bg-sky-400' : 'border-gray-300 bg-gray-200'
              }`}>
              <Text
                className={`text-center text-base font-bold ${
                  userType === 'owner' ? 'text-white' : 'text-gray-700'
                }`}>
                Propietario de Vehículo
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setUserType('mechanic')}
              className={`flex-1 rounded-xl border-2 px-4 py-3 ${
                userType === 'mechanic'
                  ? 'border-sky-500 bg-sky-400'
                  : 'border-gray-300 bg-gray-200'
              }`}>
              <Text
                className={`text-center text-base font-bold ${
                  userType === 'mechanic' ? 'text-white' : 'text-gray-700'
                }`}>
                Mecánico
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          className="mt-4 rounded-xl bg-blue-500 py-4 shadow-md">
          <Text className="text-center text-xl font-bold text-white">Crear cuenta</Text>
        </TouchableOpacity>

        <View className="mt-6 flex-row justify-center">
          <Text className="text-base text-gray-600">¿Ya tienes una cuenta? </Text>
          <Link href="/(auth)/login" asChild>
            <TouchableOpacity>
              <Text className="text-base font-bold text-orange-500">Iniciar sesión</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;
