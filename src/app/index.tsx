import { View, ScrollView, Text, Image } from 'react-native';
import { Link , useRouter } from 'expo-router';
import Button from '~/components/ButtonCmp';

import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

const Index = () => {
  const { authState } = useAuth();
  const router = useRouter();

  console.log(authState);

  useEffect(() => {
    if (authState?.authenticated) {
      router.replace('(home)/Dashboard');
      console.log('hola');
    }
  });
  return (
    <ScrollView
      className="bg-blue-50 pb-32"
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >

        <Image
          className="w-26 h-26 mb-4"
          source={require('../assets/carIcon.png')}
        />
        <Text className="text-6xl font-extrabold text-blue-700 text-center mb-2">Auto</Text>
        <Text className="text-xl text-purple-500 text-center mb-6">Bienvenidos a nuestro app</Text>

        <Text className="text-3xl font-bold text-gray-900 text-center mb-1">Manten tu vehiculo en</Text>
        <Text className="text-3xl font-bold text-blue-600 text-center mb-6">perfecto estado</Text>

        <Text className="mb-8 text-center text-lg font-light text-gray-700">
          La aplicación más completa para el seguimiento del mantenimiento de tu vehículo. Nunca
          olvides una revisión importante y mantén tu auto funcionando como nuevo.
        </Text>

        <View className="w-full flex-col items-center gap-4 mb-2">
          <Link href="/(auth)/login" asChild>
            <Button title="Iniciar sesión" className="bg-blue-500 w-64 py-5 rounded-3xl text-lg" />
          </Link>
          <Link href="/(auth)/register" asChild>
            <Button title="Registrarse" className="bg-blue-300 w-64 py-5 rounded-3xl text-lg" />
          </Link>
        </View>


    </ScrollView>

  );
};

export default Index;
