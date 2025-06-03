import { Modal, View, Text, TouchableOpacity } from 'react-native';

type Props = {
  visible: boolean;
  vehicleTypes: string[];
  vehicleType: string;
  onSelect: (type: string) => void;
  onClose: () => void;
};

export const VehicleTypeModal = ({
  visible,
  vehicleTypes,
  vehicleType,
  onSelect,
  onClose
}: Props) => (
  <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
    <View className="flex-1 justify-center items-center bg-black/70">
      <View className="bg-white rounded-2xl w-5/6 p-6">
        <Text className="text-2xl font-bold text-blue-800 mb-6 text-center">
          Selecciona el tipo
        </Text>
        {vehicleTypes.map((type) => (
          <TouchableOpacity
            key={type}
            className={`py-4 px-5 mb-2 rounded-lg ${vehicleType === type ? 'bg-blue-100' : 'bg-white'}`}
            onPress={() => onSelect(type)}
          >
            <Text className="text-gray-800 text-lg">{type}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity className="mt-6 py-3 bg-blue-600 rounded-lg" onPress={onClose}>
          <Text className="text-white text-center text-lg">Cerrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);