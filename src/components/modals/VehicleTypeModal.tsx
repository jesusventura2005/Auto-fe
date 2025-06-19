import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { Control, useController } from 'react-hook-form';

type Props = {
  visible: boolean;
  vehicleTypes: string[];
  control: Control<any>;
  name: string;
  rules?: object;
  onClose: () => void;
};

export const VehicleTypeModal = ({
  visible,
  vehicleTypes,
  control,
  name,
  rules,
  onClose
}: Props) => {
  const { field: { value, onChange } } = useController({
    control,
    name,
    rules
  });

  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <View className="flex-1 justify-center items-center bg-black/70">
        <View className="bg-white rounded-2xl w-5/6 p-6">
          <Text className="text-2xl font-bold text-blue-800 mb-6 text-center">
            Selecciona el tipo
          </Text>
          {vehicleTypes.map((type) => (
            <TouchableOpacity
              key={type}
              className={`py-4 px-5 mb-2 rounded-lg ${value === type ? 'bg-blue-100' : 'bg-white'}`}
              onPress={() => onChange(type)}
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
};