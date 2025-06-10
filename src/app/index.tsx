import { View, ScrollView, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import Header from '~/components/Header';
import { Card } from '~/components/Card';
import { useEffect } from 'react';

const Index = () => {
  const { authState } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authState?.authenticated) {
      router.replace('/(home)/(maintenance)/maintenanceLog');
    }
  }, [authState?.authenticated, router]);

  if (authState?.authenticated) {
    return null;
  }

  return ( 
    <ScrollView className='p-3 pt-12 bg-[#111827]'>

      <Header />
      <View className='mt-12 flex justify-center items-center'>
        <Text className='font-bold color-white text-4xl'>
          Manten tu vehiculo en
        </Text>
        <Text className='font-bold color-[#005ee2] text-4xl'>
          perfecto estado
        </Text>

        <Text className='mt-5 font-light text-center text-2xl color-white'>
          La aplicación más completa para el seguimiento del mantenimiento de tu vehículo. Nunca olvides una revisión importante y mantén tu auto funcionando como nuevo.
        </Text>
      </View>

      <Card>
      </Card>
    </ScrollView>
   
  );
};

export default Index;
