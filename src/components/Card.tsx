import { View, Text } from "react-native"
import Clock from '../assets/clock.svg'
import Ionicons from '@expo/vector-icons/Ionicons';

interface CardProps {
  age: number;
  kilometers: number;
  lastService: string;
  brand: string;
  model: string;
}

export const Card = ({ kilometers, lastService , age , brand , model }: CardProps) => {
  return (
    <View className="flex flex-col  w-11/12 h-[240px] rounded-xl bg-white shadow-md">
      <View className=" rounded-t-xl p-3 bg-[#005ee2] flex items-center justify-center"> 
        <Ionicons name="car-outline" size={86} color="white" />
        <Text className="font-bold text-white">{age} {brand}</Text>
        <Text className="text-white ">{model}</Text>
      </View>

      <View className="p-4 gap-3">
        <View className="flex flex-row items-center gap-2">
          <Clock width={25} height={25} stroke="#EF4444" strokeWidth={1.5} />
          <Text className="text-black text-base">{kilometers} kilometers</Text>
        </View>

        <View className="bg-slate-100 flex p-1.5 flex-row items-center rounded-md">
        <Ionicons className="mx-2" name="speedometer-outline" size={16} color="#65768a" />
            <Text className="text-[#65768a]">Last service: {lastService}</Text>
        </View>

      </View>
    </View>
  )
}
