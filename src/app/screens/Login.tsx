import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';




const useLoginMutation = () => {
  return useMutation({
    mutationFn: ({email, password}: any) => {
      const body = { email, password }
      console.log('Enviando al servidor:', JSON.stringify(body, null, 2))
      return axios.post("http://localhost:3000/auth/login", body)
    },
    onSuccess: (response) => {
      console.log('Respuesta del servidor:', response.data)
    },
    onError: (error) => console.log('Error:', error)
  })
}

const LoginScreen = () => {

  const loginMutation = useLoginMutation()

  const {control, handleSubmit } = useForm()

  return (
    <ScrollView
      className="bg-blue-50"
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 32 }}
    >
      <View className="bg-white rounded-2xl p-6 shadow-lg max-w-md w-[90%]">
        <Text className="text-3xl font-bold text-violet-600 text-center mb-2">Iniciar sesión</Text>
        <Text className="text-base text-purple-500 text-center mb-8">Bienvenido de nuevo</Text>

        <Input
          control={control}
          label="Correo electrónico"
          icon="✉️"
          placeholder="tucorreo@ejemplo.com"
          keyboardType="email-address"
          autoCapitalize="none"
          name='email'
        />
        <Input
          label="Contraseña"
          icon="🔒"
          placeholder="••••••••"
          secureTextEntry={true}
          control={control}
          name='password'
        />

        <Link href="/" asChild>
          <Button onPress={handleSubmit((data) => loginMutation.mutateAsync(data) )} title="Entrar" />
        </Link>

        <View className="flex-row justify-center mt-6">
          <Text className="text-gray-600 text-base">¿No tienes una cuenta? </Text>
          <Link href="/screens/Register" asChild>
            <TouchableOpacity>
              <Text className="text-orange-500 font-bold text-base">Regístrate</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;