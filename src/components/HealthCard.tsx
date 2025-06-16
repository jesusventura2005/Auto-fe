import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HealthCard() {
  return (
    <View className="flex w-11/12 flex-col overflow-hidden rounded-xl border-2 border-gray-200">
      <View className="flex w-full flex-row items-center gap-2 bg-[#005ee2]">
        <Ionicons className="p-3" name="heart-outline" size={24} color="white" />
        <Text className="text-xl font-bold text-white">Vehicle Health</Text>
      </View>
      <View className="flex w-full flex-col items-start gap-3 p-4">
        <Text className="text-2xl font-bold text-black">Car Current Condition</Text>
        <Text className="text-base text-gray-600">
          This card provides an overview of the vehicles health status, including diagnostics and
          maintenance
        </Text>
        <View className="flex flex-row items-center gap-2">
          <Ionicons name="calendar-outline" size={24} color="#65768a" />
          <Text className="text-[#65768a]">Último checkeo: 2023-10-01</Text>
        </View>
      </View>
    </View>
  );
}
