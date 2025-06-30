import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HealthCard() {
  return (
    <View className="flex w-11/12 flex-col overflow-hidden rounded-xl border-2 border-gray-200 dark:border-color-border-dark">
      <View className="flex w-full flex-row items-center gap-2 bg-[#005ee2]">
        <Ionicons className="p-3" name="heart-outline" size={24} color="white" />
        <Text className="text-xl font-bold text-white ">Salud del vehiculo</Text>
      </View>
      <View className="flex w-full flex-col items-start gap-3 p-4">
        <Text className="text-2xl font-bold text-black dark:text-color-title-dark">
          Condición Actual del Vehículo
        </Text>
        <Text className="text-base text-gray-600">
          Esta tarjeta proporciona una visión general del estado de salud del vehículo, incluidos
          los diagnósticos y el mantenimiento.
        </Text>
        <View className="flex flex-row items-center gap-2">
          <Ionicons name="calendar-outline" size={24} color="#65768a" />
          <Text className="text-[#65768a]">Último chequeo: 2023-10-01</Text>
        </View>
      </View>
    </View>
  );
}
