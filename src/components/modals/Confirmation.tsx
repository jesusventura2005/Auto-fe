import { Modal, Text, View } from 'react-native';
import ButtonCmp from '~/components/ui/ButtonCmp';

type Props = {
  visible: boolean;
  taskName: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const Confirmation = ({ visible, taskName, onConfirm, onCancel }: Props) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View className="flex-1 items-center justify-center bg-black/50">
        <View className="w-11/12 rounded-2xl bg-white dark:bg-color-bg-dark p-6">
          <Text className="text-center text-xl font-bold text-color-title dark:text-white mb-2">
            {taskName}
          </Text>
          <Text className="text-center text-base text-color-text dark:text-white mb-6">
            ¿Desea marcar esta tarea como completada?
          </Text>

          <View className="flex-row justify-around">
            <ButtonCmp
              title="Aceptar"
              onPress={onConfirm}
              animated
              className="bg-green-600 rounded-xl px-6 py-3"
            />
            <ButtonCmp
              title="Cancelar"
              onPress={onCancel}
              animated
              className="bg-red-600 rounded-xl px-6 py-3"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Confirmation;