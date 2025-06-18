import { View, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Badge from '../ui/Badge';
import Clock from '../../assets/clock.svg';

interface maintenance {
  title: string;
  description: string;
  type: string;
  date: string;
  kilometers: number;
}

const MaintenanceCard = () => {
  const icon = () => {
    return (
      <View>
        <FontAwesome5 name="filter" size={24} color="black" />
        <FontAwesome5 name="car-battery" size={24} color="black" />
        <FontAwesome5 name="oil-can" size={24} color="black" />
        <Ionicons name="car-sport" size={24} color="black" />
        <Ionicons name="car" size={24} color="black" />
        <FontAwesome5 name="motorcycle" size={24} color="black" />
        <Ionicons name="checkmark" size={24} color="black" />
        <Ionicons name="settings-outline" size={24} color="black" />
      </View>
    );
  };

  return (
    <View className="flex min-h-32 w-full flex-row items-center  justify-between rounded-xl bg-white p-3 shadow-lg ">
      <View className="mb-4 mt-4 flex gap-4">
        <View className="flex flex-row items-center gap-4">
          <View className="rounded-full bg-[#daf0fd] p-2">
            <Ionicons name="car" size={24} color="#009de2" />
          </View>
          <View className="w-8/12">
            <Text className="text-2xl font-semibold">Brake inspection</Text>
            <Text className="font-light text-[#596a7f]">Replace engine and cabin air filters</Text>
          </View>
        </View>

        <View className="flex flex-row gap-4">
          <View className="flex flex-row items-center gap-2">
            <Ionicons name="calendar-clear-outline" size={16} color="#596a7f" />
            <Text className="text-[#596a7f]">Feb 5,2024</Text>
          </View>

          <View className="flex flex-row items-center gap-2">
            <Clock width={16} height={16} stroke="#596a7f" strokeWidth={1.5} />
            <Text className="text-[#596a7f]">50000 km</Text>
          </View>
        </View>
      </View>

      <Badge></Badge>
    </View>
  );
};

export default MaintenanceCard;
