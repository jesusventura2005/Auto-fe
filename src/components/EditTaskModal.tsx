import { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, Switch, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Task } from './useTaskManager';
import { CalendarDays, FileText, Fuel, Settings, Wrench } from 'lucide-react-native';

type Props = {
  visible: boolean;
  task: Task;
  onClose: () => void;
  onUpdate: (updatedTask: Task) => void;
};

const EditTaskModal = ({ visible, task, onClose, onUpdate }: Props) => {
  const [editedTask, setEditedTask] = useState<Task>({ ...task });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setEditedTask({ ...editedTask, date: selectedDate.toISOString().split('T')[0] });
    }
  };

  const inputStyle = "bg-gray-100 rounded-md p-3 pl-10 text-gray-800 mb-4";
  const labelStyle = "text-gray-700 font-medium mb-1";

  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <View className="flex-1 justify-center items-center bg-black/70">
        <View className="bg-white rounded-2xl w-11/12 p-6">
          <Text className="text-2xl font-bold text-blue-800 mb-6 text-center">Editar Mantenimiento</Text>

          <Text className={labelStyle}>Título</Text>
          <View className="relative">
            <Wrench className="absolute left-3 top-4 text-gray-500" size={18} />
            <TextInput
              value={editedTask.title}
              onChangeText={(text) => setEditedTask({ ...editedTask, title: text })}
              placeholder="Título"
              className={inputStyle}
            />
          </View>

          <Text className={labelStyle}>Descripción</Text>
          <View className="relative">
            <FileText className="absolute left-3 top-4 text-gray-500" size={18} />
            <TextInput
              value={editedTask.description}
              onChangeText={(text) => setEditedTask({ ...editedTask, description: text })}
              placeholder="Descripción"
              className={inputStyle}
            />
          </View>

          <Text className={labelStyle}>Tipo</Text>
          <View className="relative">
            <Settings className="absolute left-3 top-4 text-gray-500" size={18} />
            <TextInput
              value={editedTask.type}
              onChangeText={(text) => setEditedTask({ ...editedTask, type: text })}
              placeholder="Tipo"
              className={inputStyle}
            />
          </View>

          <Text className={labelStyle}>Fecha</Text>
          <Pressable onPress={() => setShowDatePicker(true)}>
            <View className="relative">
              <CalendarDays className="absolute left-3 top-4 text-gray-500" size={18} />
              <TextInput
                value={editedTask.date}
                editable={false}
                className={inputStyle}
              />
            </View>
          </Pressable>
          {showDatePicker && (
            <DateTimePicker
              value={new Date(editedTask.date)}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}

          <Text className={labelStyle}>Kilometraje</Text>
          <View className="relative">
            <Fuel className="absolute left-3 top-4 text-gray-500" size={18} />
            <TextInput
              value={editedTask.kilometraje}
              onChangeText={(text) => setEditedTask({ ...editedTask, kilometraje: text })}
              placeholder="Kilometraje"
              keyboardType="numeric"
              className={inputStyle}
            />
          </View>

          <View className="flex-row items-center justify-between mt-2 mb-4">
            <Text className="text-gray-700 font-medium">¿Completado?</Text>
            <Switch
              value={editedTask.completado}
              onValueChange={(value) => setEditedTask({ ...editedTask, completado: value })}
            />
          </View>

          <View className="flex-row justify-between">
            <TouchableOpacity
              onPress={onClose}
              className="flex-1 bg-gray-300 py-3 rounded-lg mr-2"
            >
              <Text className="text-center text-gray-800 font-medium">Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onUpdate(editedTask)}
              className="flex-1 bg-blue-600 py-3 rounded-lg ml-2"
            >
              <Text className="text-center text-white font-medium">Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditTaskModal;
