import { View, Text } from 'react-native';
import Clock from '../assets/clock.svg';
import Ionicons from '@expo/vector-icons/Ionicons';

interface CardProps {
  age: number;
  kilometers: number;
  lastService: string;
  brand: string;
  model: string;
}

export const Card = ({ kilometers, lastService, age, brand, model }: CardProps) => {
  return (
    <View className="flex h-[240px]  w-11/12 flex-col rounded-xl bg-white shadow-md">
      <View className=" flex items-center justify-center rounded-t-xl bg-[#005ee2] p-3">
        <Ionicons name="car-outline" size={86} color="white" />
        <Text className="font-bold text-white">
          {age} {brand}
        </Text>
        <Text className="text-white ">{model}</Text>
      </View>

      <View className="gap-3 p-4">
        <View className="flex flex-row items-center gap-2">
          <Clock width={25} height={25} stroke="#EF4444" strokeWidth={1.5} />
          <Text className="text-base text-black">{kilometers} kilometers</Text>
        </View>

        <View className="flex flex-row items-center rounded-md bg-slate-100 p-1.5">
          <Ionicons className="mx-2" name="speedometer-outline" size={16} color="#65768a" />
          <Text className="text-[#65768a]">Last service: {lastService}</Text>
        </View>
      </View>
    </View>
  );
};
