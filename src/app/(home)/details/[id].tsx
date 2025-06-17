import { ScrollView, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import IconButton from '~/components/IconButton';
import DisplayCard from '~/components/DisplayCard';
import HealthCard from '~/components/HealthCard';
import { router } from 'expo-router';

export default function Home() {
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
                // Handle back navigation
                router.replace('/(home)/Dashboard');
              }}
              icon={<Ionicons name="arrow-back" size={24} color="#000000" />}
            />
            <Text className="text-center text-2xl font-bold text-gray-800">{'Regresar'}</Text>
          </View>
          <DisplayCard model="Model X" brand="Tesla" kilometers={15000} />

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
