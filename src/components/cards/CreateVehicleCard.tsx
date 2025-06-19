import { Text, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';

const CreateVehicleCard = () => {
  return (
    <TouchableOpacity
      className="mb-80 flex h-[200px]  w-11/12 flex-col items-center justify-center rounded-xl bg-color-bg dark:bg-color-alternative-dark dark:border dark:border-color-border-dark shadow-md"
      onPress={() => router.push('RegisterVehicle')}>
      <Ionicons name="create" size={120} color="#888" />
      <Text className="text-2xl font-bold text-[#999]">Add New Vehicle</Text>
    </TouchableOpacity>
  );
};

export default CreateVehicleCard;
