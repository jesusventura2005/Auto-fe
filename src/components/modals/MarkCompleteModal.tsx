import { Modal, View, Text, TouchableOpacity } from 'react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
};

export default function MarkCompleteModal({ visible, onClose, onConfirm, title }: Props) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 items-center justify-center bg-black/60">
        <View className="w-11/12 rounded-2xl bg-white dark:bg-color-bg-dark p-6">
          <Text className="text-xl font-bold text-center text-color-title dark:text-white mb-4">
            {title}
          </Text>

          <Text className="text-center text-gray-600 dark:text-gray-300 mb-6">
            ¿Deseas marcar esta tarea como completada?
          </Text>

          <View className="flex-row justify-around">
            <TouchableOpacity
              className="bg-gray-200 dark:bg-gray-700 rounded-xl px-5 py-3"
              onPress={onClose}>
              <Text className="text-gray-800 dark:text-white">Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-color-primary rounded-xl px-5 py-3"
              onPress={onConfirm}>
              <Text className="text-white">Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
