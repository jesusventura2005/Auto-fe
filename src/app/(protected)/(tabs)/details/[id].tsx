import { ScrollView, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import IconButton from '~/components/ui/IconButton';
import DisplayCard from '~/components/cards/DisplayCard';
import HealthCard from '~/components/cards/HealthCard';
import { router, useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function Home() {
  const { id } = useLocalSearchParams();
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
  if (isLoading) {
    return (
      <View className="flex h-screen items-center justify-center">
        <Text>Loading...</Text>
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

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top']} className="flex h-screen bg-white">
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: 'center',
            gap: 24,
          }}
          className="flex h-screen bg-white">
          <View className="sticky flex w-full flex-row items-center gap-4 border-b-2 border-b-slate-200 px-6 py-4">
            <IconButton
              onPress={() => {
                router.push('Dashboard');
              }}
              icon={<Ionicons name="arrow-back" size={24} color="#000000" />}
            />
            <Text className="text-center text-2xl font-bold text-gray-800">{'Regresar'}</Text>
          </View>
          <DisplayCard
            model={vehicle.carModel}
            brand={vehicle.brand}
            kilometers={vehicle.kilometers || 0}
          />
          <HealthCard />
          <View className="flex w-full flex-row items-center gap-2 rounded-lg px-6">
            <Ionicons name="flash-outline" size={24} color="#000000" />
            <Text className="text-lg font-semibold text-gray-800">Upcoming Maintenance</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
