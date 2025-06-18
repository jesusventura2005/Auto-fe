import { View, Text, TouchableOpacity } from 'react-native';
import Clock from '../../assets/clock.svg';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface CardProps {
  id: string;
  age: number;
  kilometers: number;
  lastService: string;
  brand: string;
  model: string;
}

export const Card = ({ id, kilometers, lastService, age, brand, model }: CardProps) => {
  return (
    <TouchableOpacity
      onPress={() => router.push(`/details/${id}`)}
      className="flex h-[240px]  w-11/12 flex-col rounded-xl bg-color-bg dark:bg-color-bg-dark dark:border dark:border-color-border-dark shadow-md">
      <View className=" flex items-center justify-center rounded-t-xl bg-[#005ee2] p-3">
        <Ionicons name="car-outline" size={86} color="white" />
        <Text className="font-bold text-color-text dark:text-color-text-dark">
          {age} {brand}
        </Text>
        <Text className="text-white ">{model}</Text>
      </View>

      <View className="gap-3 p-4">
        <View className="flex flex-row items-center gap-2">
          <Clock width={25} height={25} stroke="#0059d8" strokeWidth={2} />
          <Text className="text-base text-color-text dark:text-color-text-dark">{kilometers} kilometers</Text>
        </View>

        <View className="flex flex-row items-center rounded-md bg-color-alternative dark:bg-color-alternative-dark  p-1.5">
          <Ionicons className="mx-2" name="speedometer-outline" size={16} color="#65768a" />
          <Text className="text-[#65768a]">Last service: {lastService}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
