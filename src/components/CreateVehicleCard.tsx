import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router'

const CreateVehicleCard = () => {
  return (

    <TouchableOpacity className="flex h-[200px]  w-11/12 flex-col items-center justify-center rounded-xl bg-white shadow-md"
    onPress={() => router.push('(maintenance)/RegisterVehicle')}
    >
        <Ionicons name="create" size={120} color="#888" />
        <Text className="text-2xl font-bold text-[#999]">Add New Vehicle</Text>
      
    </TouchableOpacity>
  );
};

export default CreateVehicleCard;
