import { ScrollView, Text, View, useColorScheme } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import IconButton from '~/components/ui/IconButton';
import DisplayCard from '~/components/cards/DisplayCard';
import HealthCard from '~/components/cards/HealthCard';
import { router, useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useVehicleId } from '~/context/VehicleIdContext';
import { useEffect } from 'react';

export default function Home() {
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const { setVehicleId } = useVehicleId();

  useEffect(() => {
    setVehicleId(typeof id === 'string' ? id : null);
    return () => setVehicleId(null);
  }, [id, setVehicleId]);

  const {
    data: vehicle,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['vehicle', id],
    queryFn: async () => {
      const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/cars/${id}/showIt`);
      return response.data;
    },
  });

  const { data: maintenances } = useQuery({
    queryKey: ['maintenances', id],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/maintenance/car/${id}?completed=false&limit=3`
      );
      return response.data;
    },
  });

  console.log('maintenances', maintenances);

  if (isLoading) {
    return (
      <View className="flex h-screen items-center justify-center">
        <Text>Cargando...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex h-screen items-center justify-center">
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  console.log('vehicle', vehicle);

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top']} className="flex h-screen bg-white dark:bg-color-bg-dark">
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: 'center',
            gap: 24,
          }}
          className="flex h-screen bg-white dark:bg-color-bg-dark">
          <View className="sticky flex w-full flex-row items-center gap-4 border-b-2 border-b-slate-200 px-6  py-4 dark:border-b-color-border-dark">
            <IconButton
              onPress={() => {
                router.push('Dashboard');
              }}
              icon={
                <Ionicons
                  name="arrow-back"
                  size={24}
                  color={colorScheme === 'dark' ? '#ffffff' : '#000000'}
                />
              }
            />
            <Text className="text-center text-2xl font-bold text-gray-800 dark:text-color-text-dark">
              {'Regresar'}
            </Text>
          </View>
          <DisplayCard
            model={vehicle.carModel}
            type={vehicle.type}
            brand={vehicle.brand}
            kilometers={vehicle.kilometers || 0}
            plate={vehicle.plate}
          />
          <HealthCard lastService={vehicle.maintenance?.date} />
          <View className="flex w-full flex-row items-center gap-2 rounded-lg px-6">
            <Ionicons
              name="flash-outline"
              size={24}
              color={colorScheme === 'dark' ? '#ffffff' : '#000000'}
            />
            <Text className="text-lg font-semibold text-gray-600">Siguientes mantenimientos</Text>
          </View>
          <View className="flex w-full flex-col items-center gap-4 px-6">
            {maintenances?.map((maintenance: any, index: number) => (
              <View
                key={index}
                className="w-full rounded-lg bg-gray-100 p-4 shadow-sm dark:bg-color-bg-dark">
                <Text className="text-lg font-semibold text-gray-800 dark:text-color-text-dark">
                  {maintenance.description}
                </Text>
                <Text className="text-sm text-gray-600 dark:text-color-text-dark">
                  Fecha: {new Date(maintenance.date).toLocaleDateString()}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
