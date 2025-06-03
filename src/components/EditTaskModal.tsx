import {
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Pressable,
  Switch,
  Platform,
} from 'react-native';
import { Task } from './useTaskManager';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

type Props = {
  visible: boolean;
  task: Task;
  onClose: () => void;
  onUpdate: (updatedTask: Task) => void;
};

const types = ['Oil Change', 'Tire Rotation', 'Brake Inspection', 'Other'];

const EditTaskModal = ({ visible, task, onClose, onUpdate }: Props) => {
  const [updatedTask, setUpdatedTask] = useState<Task>(task);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleChange = (field: keyof Task, value: string | boolean) => {
    setUpdatedTask((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (_event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      handleChange('date', formattedDate);
    }
  };

  const handleSave = () => {
    onUpdate(updatedTask);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <Pressable onPress={onClose} className="flex-1 bg-black/40 justify-center items-center">
        <Pressable onPress={(e) => e.stopPropagation()} className="bg-white rounded-lg p-6 w-11/12">
          <Text className="text-xl font-bold text-blue-900 mb-4">Datos de la tarea</Text>

          <Text className="text-sm font-medium text-blue-800 mb-1">Título</Text>
          <TextInput
            value={updatedTask.title}
            onChangeText={(text) => handleChange('title', text)}
            className="border rounded-md px-3 py-2 mb-3 border-blue-300 text-blue-900"
          />

          <Text className="text-sm font-medium text-blue-800 mb-1">Descripción</Text>
          <TextInput
            value={updatedTask.description}
            onChangeText={(text) => handleChange('description', text)}
            className="border rounded-md px-3 py-2 mb-3 border-blue-300 text-blue-900"
          />

          <Text className="text-sm font-medium text-blue-800 mb-1">Tipo</Text>
          <View className="border rounded-md px-3 py-2 mb-3 border-blue-300">
            <Picker
              selectedValue={updatedTask.type}
              onValueChange={(itemValue) => handleChange('type', itemValue)}
              style={{ color: '#1e3a8a', fontSize: 16 }}
              dropdownIconColor="#1e3a8a"
            >
              {types.map((type) => (
                <Picker.Item key={type} label={type} value={type} />
              ))}
            </Picker>
          </View>

          <Text className="text-sm font-medium text-blue-800 mb-1">Fecha</Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            className="border rounded-md px-3 py-2 mb-3 border-blue-300"
          >
            <Text className="text-blue-900">{updatedTask.date}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={new Date(updatedTask.date)}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
            />
          )}

          <Text className="text-sm font-medium text-blue-800 mb-1">Kilometraje</Text>
          <View className="flex-row items-center border rounded-md px-3 py-2 mb-3 border-blue-300">
            <TextInput
              value={updatedTask.kilometraje.replace(' km', '')}
              keyboardType="numeric"
              onChangeText={(text) => handleChange('kilometraje', `${text}`)}
              className="flex-1 text-blue-900"
            />
            <Text className="text-blue-500 ml-2">km</Text>
          </View>

          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-sm font-medium text-blue-800">Completado</Text>
            <Switch
              value={updatedTask.completado}
              onValueChange={(val) => handleChange('completado', val)}
              thumbColor={updatedTask.completado ? '#2563eb' : '#e5e7eb'}
              trackColor={{ true: '#93c5fd', false: '#cbd5e1' }}
            />
          </View>

          <View className="flex-row justify-between mt-4">
            <TouchableOpacity onPress={onClose} className="bg-gray-300 rounded-md px-4 py-2">
              <Text className="text-gray-800 font-semibold">Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave} className="bg-blue-500 rounded-md px-4 py-2">
              <Text className="text-white font-semibold">Aceptar</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default EditTaskModal;
