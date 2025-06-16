import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

interface DisplayCardProps {
  model: string;
  brand: string;
  kilometers: number;
}

export default function DisplayCard({ model, brand, kilometers }: DisplayCardProps) {
  return (
    <View className="flex w-11/12 flex-col items-center rounded-xl bg-[#005ee2] py-3 shadow-md">
      <Ionicons name="car-outline" size={64} color="white" />
      <Text className="text-2xl font-bold text-white">{brand}</Text>
      <Text className="text-lg text-white">{model}</Text>
      <Text className="text-lg text-white">{kilometers} kilometros</Text>
    </View>
  );
}
