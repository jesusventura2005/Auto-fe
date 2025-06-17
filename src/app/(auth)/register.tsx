import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Link, router } from 'expo-router';
import Input from '~/components/Input';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '~/context/AuthContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';

const RegisterScreen = () => {
  const { onRegister } = useAuth();
  const [userType, setUserType] = useState<'owner' | 'mechanic'>('owner');

  const registerMutation = useMutation({
    mutationFn: async ({
      name,
      lastName,
      email,
      password,
      userType,
    }: {
      name: string;
      lastName: string;
      email: string;
      password: string;
      userType: 'owner' | 'mechanic';
    }) => {
      if (!onRegister) throw new Error('Metodo onRegister no definido');
      const response = await onRegister(name, lastName, email, password, userType);
      if (response.error) {
        throw new Error(response.msg);
      }
      return response;
    },
    onSuccess: (response) => {
      router.push('(protected)/(tabs)/Dashboard'); // Redirigir al dashboard después de registrarse
    },
    onError: (error) => {
      console.error('Error:', error);
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitted },
    getValues,
  } = useForm({
    defaultValues: {
      name: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const onSubmit = (data: {
    name: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirm: string;
  }) => {
    const { name, lastName, email, password } = data;
    registerMutation.mutateAsync({ name, lastName, email, password, userType });
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
      <Text className="mb-2 text-center text-4xl font-bold text-sky-600">Crea tu cuenta</Text>
      <Text className="mb-8 text-center text-lg text-black">Únete a nuestra comunidad</Text>
      <View className="flex w-[90%] max-w-md rounded-2xl bg-white p-6 shadow-lg">
        <Input
          control={control}
          name="name"
          label="Nombre"
          icon={<Ionicons name="person-outline" size={16} color="black" className="mr-2" />}
          placeholder="Juan"
          rules={{
            required: 'El nombre es obligatorio',
            minLength: {
              value: 2,
              message: 'El nombre debe tener al menos 2 caracteres',
            },
          }}
          error={isSubmitted ? errors.name : undefined}
        />
        <Input
          control={control}
          name="lastName"
          label="Apellido"
          icon={<Ionicons name="person" size={16} color="black" className="mr-2" />}
          placeholder="Pérez"
          rules={{
            required: 'El apellido es obligatorio',
            minLength: {
              value: 2,
              message: 'El apellido debe tener al menos 2 caracteres',
            },
          }}
          error={isSubmitted ? errors.lastName : undefined}
        />
        <Input
          control={control}
          label="Correo electrónico"
          icon={<Ionicons name="mail-outline" size={16} color="black" className="mr-2" />}
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
          control={control}
          name="password"
          label="Contraseña"
          icon={<Ionicons name="lock-closed-outline" size={16} color="black" className="mr-2" />}
          placeholder="••••••••"
          secureTextEntry
          rules={{
            required: 'La contraseña es obligatoria',
            minLength: {
              value: 6,
              message: 'La contraseña debe tener al menos 6 caracteres',
            },
          }}
          error={isSubmitted ? errors.password : undefined}
        />
        <Input
          control={control}
          name="passwordConfirm"
          label="Confirmar Contraseña"
          icon={<Ionicons name="lock-closed-outline" size={16} color="black" className="mr-2" />}
          placeholder="••••••••"
          secureTextEntry
          rules={{
            required: 'La confirmación de contraseña es obligatoria',
            validate: (value) => {
              if (value !== getValues('password')) {
                return 'Las contraseñas no coinciden';
              }
            },
          }}
          error={isSubmitted ? errors.passwordConfirm : undefined}
        />

        <View className="my-2">
          <Text className="mb-3 font-semibold text-gray-700">Soy un:</Text>
          <View className="flex-row gap-3 space-x-4">
            <TouchableOpacity
              onPress={() => setUserType('owner')}
              className="flex-row items-center gap-2 space-x-2">
              <Ionicons
                name={userType === 'owner' ? 'radio-button-on' : 'radio-button-off'}
                size={24}
                color={userType === 'owner' ? '#009de2' : 'gray'}
              />
              <Text className="text-base font-bold text-gray-700">Propietario de Vehículo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setUserType('mechanic')}
              className="flex-row items-center gap-2 space-x-2">
              <Ionicons
                name={userType === 'mechanic' ? 'radio-button-on' : 'radio-button-off'}
                size={24}
                color={userType === 'mechanic' ? '#009de2' : 'gray'}
              />
              <Text className="text-base font-bold text-gray-700">Mecánico</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          className="mt-2 rounded-xl bg-sky-500 py-4 shadow-md">
          <Text className="text-center text-xl font-bold text-white">Crear cuenta</Text>
        </TouchableOpacity>

        <View className="mt-6 flex-row justify-center">
          <Text className="text-base text-gray-600">¿Ya tienes una cuenta? </Text>
          <Link href="/(auth)/login" asChild>
            <TouchableOpacity>
              <Text className="text-base font-bold text-sky-400">Iniciar sesión</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;
