import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

interface DisplayCardProps {
  model: string;
  type: string;
  brand: string;
  kilometers: number;
  plate: string;
}

export default function DisplayCard({ model, type, brand, kilometers, plate }: DisplayCardProps) {
  return (
    <View className="flex w-11/12 flex-col items-center rounded-xl bg-[#005ee2] py-3 shadow-md">
      {type === 'Camioneta' ? (
        <Ionicons name="car-outline" size={64} color="white" />
      ) : type === 'Carro' ? (
        <Ionicons name="car-sport" size={64} color="white" />
      ) : type === 'Moto' ? (
        <MaterialCommunityIcons name="motorbike" size={64} color="white" />
      ) : (
        ''
      )}
      <Text className="text-2xl font-bold text-white">{brand}</Text>
      <Text className="text-lg text-white">{model}</Text>
      <Text className="text-lg text-white">{kilometers} kilometers</Text>
      <Text className="text-lg text-white">Plate: {plate}</Text>
    </View>
  );
}
