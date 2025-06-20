import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { Control, useController } from 'react-hook-form';

type Props = {
  visible: boolean;
  vehicleTypes: string[];
  control: Control<any>;
  name: string;
  rules?: object;
  text: string
  onClose: () => void;
};

export const VehicleTypeModal = ({
  visible,
  vehicleTypes,
  control,
  name,
  rules,
  text,
  onClose,
}: Props) => {
  const {
    field: { value, onChange },
  } = useController({
    control,
    name,
    rules,
  });

  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <View className="flex-1 items-center justify-center bg-black/70">
        <View className="w-5/6 rounded-2xl bg-white dark:bg-color-bg-dark p-6">
          <Text className="mb-6 text-center text-2xl  font-bold text-color-primary">
            {text}
          </Text>
          {vehicleTypes.map((type) => (
            <TouchableOpacity
              key={type}
              className={`mb-2 rounded-lg px-5 py-4 ${value === type ? 'bg-blue-100 dark:bg-color-border-dark' : 'bg-white dark:bg-color-bg-dark dark:border dark:border-color-border-dark'}`}
              onPress={() => onChange(type)}>
              <Text className="text-lg text-gray-800 dark:text-color-text-dark">{type}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity className="mt-6 rounded-lg bg-color-primary py-3" onPress={onClose}>
            <Text className="text-center text-lg text-white">Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
