import { View, Text, TouchableOpacity, ScrollView, Button } from 'react-native';
import { Link, router } from 'expo-router';
import Input from '../../components/Input';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '~/context/AuthContext';

const userType = 'owner';

const RegisterScreen = () => {
  const { onRegister } = useAuth();
  const registerMutation = useMutation({
    mutationFn: async ({
      name,
      lastName,
      email,
      password,
    }: {
      name: string;
      lastName: string;
      email: string;
      password: string;
    }) => {
      if (!onRegister) throw new Error('Metodo onRegister no definido');
      const response = await onRegister(name, lastName, email, password);
      if (response.error) {
        throw new Error(response.msg);
      }
      return response;
    },
    onSuccess: (response) => {
      console.log('Respuesta del servidor:', response.data);
      router.push('/');
    },
    onError: (error) => {
      console.error('Error:', error);
    },
  });

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const onSubmit = (data: { name: string; lastName: string; email: string; password: string }) => {
    registerMutation.mutateAsync(data);
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
      <View className="w-[90%] max-w-md rounded-2xl bg-white p-6 shadow-lg">
        <Text className="mb-2 text-center text-3xl font-bold text-violet-600">Crea tu cuenta</Text>
        <Text className="mb-8 text-center text-base text-purple-500">
          Únete a nuestra comunidad
        </Text>

        <Input control={control} name="name" label="Nombre" icon="👤" placeholder="Juan" />
        <Input control={control} name="lastName" label="Nombre" icon="👤" placeholder="Pérez" />
        <Input
          control={control}
          name="email"
          label="Correo electrónico"
          icon="✉️"
          placeholder="tucorreo@ejemplo.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input
          control={control}
          name="password"
          label="Contraseña"
          icon="🔒"
          placeholder="••••••••"
          secureTextEntry
        />
        <Input
          control={control}
          name="passwordConfirm"
          label="Confirmar Contraseña"
          icon="🔒"
          placeholder="••••••••"
          secureTextEntry
        />

        <View className="mb-6 mt-2">
          <Text className="mb-3 font-semibold text-gray-700">Soy un:</Text>
          <View className="flex-row justify-between space-x-4">
            <TouchableOpacity
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

        <Link href="/" asChild>
          <Button onPress={handleSubmit(onSubmit)} title="Crear cuenta" />
        </Link>

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
