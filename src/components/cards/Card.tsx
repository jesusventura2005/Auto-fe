import { View, Text, TouchableOpacity } from 'react-native';
import Clock from '../../assets/clock.svg';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface CardProps {
  id: string;
  age: number;
  kilometers: number;
  lastService: string;
  brand: string;
  model: string;
  type?: string;
}

export const Card = ({ id, kilometers, lastService, age, brand, model, type }: CardProps) => {
  return (
    <TouchableOpacity
      onPress={() => router.push(`/details/${id}`)}
      className="flex h-[240px]  w-11/12 flex-col rounded-xl bg-color-bg shadow-md dark:border dark:border-color-border-dark dark:bg-color-bg-dark">
      <View className=" flex items-center justify-center rounded-t-xl bg-[#005ee2] p-3">
        {type === 'Camioneta' ? (
          <Ionicons name="car-outline" size={86} color="white" />
        ) : type === 'Carro' ? (
          <Ionicons name="car-sport" size={86} color="white" />
        ) : type === 'Moto' ? (
          <MaterialCommunityIcons name="motorbike" size={86} color="white" />
        ) : (
          ''
        )}

        <Text className="font-bold text-color-bg dark:text-color-text-dark">
          {age} {brand}
        </Text>
        <Text className="text-white ">{model}</Text>
      </View>

      <View className="gap-3 p-4">
        <View className="flex flex-row items-center gap-2">
          <Clock width={25} height={25} stroke="#0059d8" strokeWidth={2} />
          <Text className="text-base text-color-text dark:text-color-text-dark">
            {kilometers} Kilometros
          </Text>
        </View>

        <View className="flex flex-row items-center rounded-md bg-color-alternative p-1.5  dark:bg-color-alternative-dark">
          <Ionicons className="mx-2" name="speedometer-outline" size={16} color="#65768a" />
          <Text className="text-[#65768a]">Ultimo servicio: {lastService}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
