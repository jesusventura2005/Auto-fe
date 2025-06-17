import { View, Text, TouchableOpacity } from 'react-native';
import { Task } from './useTaskManager';
import { Calendar, FileText, Wrench, Gauge, Tag } from 'lucide-react-native';

type Props = {
  task: Task;
  onPress: () => void;
};

const TaskItem = ({ task, onPress }: Props) => {
  const isCompleted = task.completado;

  const headerColor = isCompleted ? '#10b981' : '#deb900';
  const headerText = isCompleted ? 'Completado' : 'Pendiente';

  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-full rounded-xl border border-gray-200 mb-4 bg-white overflow-hidden shadow-sm"
      style={{ borderRadius: 11 }}
    >
      {/* Header de estado */}
      <View className="flex-row items-center px-4 py-2" style={{ backgroundColor: headerColor }}>
        <Wrench size={20} color="white" />
        <Text className="ml-2 font-semibold text-white">{headerText}</Text>
      </View>

      {/* Cuerpo de la tarjeta */}
      <View className="p-4 space-y-3">
        {/* Título */}
        <Text className="text-lg font-bold text-black">{task.title}</Text>

        {/* Descripción */}
        <View className="flex-row items-start">
          <FileText size={16} color="#6b7280" className="mr-2" />
          <Text className="text-gray-600 text-sm">{task.description}</Text>
        </View>

        {/* Tipo */}
        <View className="flex-row items-center">
          <Tag size={16} color="#6b7280" className="mr-2" />
          <Text className="text-gray-600 text-sm">{task.type}</Text>
        </View>

        {/* Fecha */}
        <View className="flex-row items-center">
          <Calendar size={16} color="#6b7280" className="mr-2" />
          <Text className="text-gray-600 text-sm">{task.date}</Text>
        </View>

        {/* Kilometraje */}
        <View className="flex-row items-center">
          <Gauge size={16} color="#6b7280" className="mr-2" />
          <Text className="text-gray-600 text-sm">{task.kilometraje}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TaskItem;
