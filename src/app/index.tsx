import { View, ScrollView, Text } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import Header from '~/components/Header';
// import { useEffect } from 'react';

const Index = () => {
  // const { authState } = useAuth();
  // const router = useRouter();

  // useEffect(() => {
  //   if (authState?.authenticated) {
  //     router.replace('/(home)/(maintenance)/maintenanceLog');
  //   }
  // }, [authState?.authenticated, router]);

  // if (authState?.authenticated) {
  //   return null;
  // }

  return (


   

      <ScrollView className='m-2 pt-12'>
        <Header />
        <View className="flex-1 ">
          <Text style={{ color: 'white' }}>
            <Link href="/(home)/(maintenance)/maintenanceLog">Historial de Mantenimiento</Link>
          </Text>
          <Text style={{ color: 'white' }}>
            <Link href="/(auth)/register">Registrarse</Link>
          </Text>
          <Text style={{ color: 'white' }}>
            <Link href="/(home)/(maintenance)/RegisterVehicle">Registrar vehiculo</Link>
          </Text>
        </View>
      </ScrollView>


  );
};

export default Index;
