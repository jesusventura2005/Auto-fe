import { View, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Badge from '../ui/Badge';
import Clock from '../../assets/clock.svg';
import Wheel from '../../assets/wheel.svg'
import Brake from '../../assets/car brakes-svgrepo-com.svg'

interface maintenance {
  title?: string;
  description?: string;
  type?: string;
  date?: string;
  kilometers?: number;
}

const MaintenanceCard = ({ title, description, type, date, kilometers }: maintenance) => {
  // const icon = () => {
  //   return (
  //     <View>
  //       <FontAwesome5 name="filter" size={24} color="black" />
  //       <FontAwesome5 name="car-battery" size={24} color="black" />
  //       <FontAwesome5 name="oil-can" size={24} color="black" />
  //       <Ionicons name="car-sport" size={24} color="black" />
  //       <Ionicons name="car" size={24} color="black" />
  //       <FontAwesome5 name="motorcycle" size={24} color="black" />
  //       <Ionicons name="checkmark" size={24} color="black" />
  //       <Ionicons name="settings-outline" size={24} color="black" />
  //     </View>
  //   );
  // };

  return (
    <View className="flex min-h-32 w-full flex-row items-center  justify-around rounded-xl bg-white p-4 shadow-lg dark:border dark:border-color-border-dark dark:bg-color-bg-dark ">
      <View className="mb-4 mt-4 flex gap-4">
        <View className="flex flex-row items-center gap-4">
          <View className="rounded-full bg-[#daf0fd] p-2">
          {type === 'Cambio de aceite' ? <FontAwesome5 name="oil-can" size={20} color="black" /> : type === 'Ruedas' ? <Wheel width={24} height={24} stroke='black'></Wheel>  : type === 'Freno' ? <Brake width={24} height={24}></Brake> : type === 'Filtro' ? <FontAwesome5 name="filter" size={24} color="black" /> : type === 'Bateria' ? <FontAwesome5 name="car-battery" size={24} color="black" /> : type === "Mantenimiento regular" ? <FontAwesome5 name="car-battery" size={24} color="black" /> : type === 'Otros' ? <Ionicons name="settings-outline" size={24} color="black" /> : '' }
          </View>
          <View className="w-7/12">
            <Text className="text-2xl font-semibold dark:text-color-title-dark">
              {title}
            </Text>
            <Text className="font-light text-[#696a7f]">description</Text>
          </View>
        </View>

        <View className="flex flex-row gap-4">
          <View className="flex flex-row items-center gap-2">
            <Ionicons name="calendar-clear-outline" size={16} color="#596a7f" />
            <Text className="text-[#596a7f]">{date}</Text>
          </View>

          <View className="flex flex-row items-center gap-2">

            <Clock width={16} height={16} stroke="#596a7f" strokeWidth={1.5} />
            <Text className="text-[#596a7f]">{kilometers}</Text>
          </View>
        </View>
      </View>

      <View className="flex flex-row ">
        <Badge></Badge>
      </View>
    </View>
  );
};

export default MaintenanceCard;
