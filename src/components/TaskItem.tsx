import { TouchableOpacity, Text, View } from 'react-native';
import { Task } from './useTaskManager';

type Props = {
  task: Task;
  onPress: () => void;
};

const TaskItem = ({ task, onPress }: Props) => {
  const backgroundColor = task.completed ? 'bg-emerald-100' : 'bg-sky-100';
  const statusColor = task.completed ? 'bg-teal-300' : 'bg-amber-300';
  const statusTextColor = task.completed ? 'text-indigo-950' : 'text-indigo-950';
  const statusLabel = task.completed ? 'Completed' : 'Pending';

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row justify-between items-center ${backgroundColor} rounded-xl px-4 py-5 mb-4 border border-blue-300`}
    >
      <View className="flex-row justify-between items-start">
        <View className="flex-1 pr-3">
          <Text className="text-black font-semibold text-base">{task.title}</Text>
          <Text className="text-black text-sm mt-1">{task.description}</Text>
          <Text className="text-black text-sm mt-1">{task.date} • {task.mileage}</Text>
        </View>
        <View className={`px-3 py-1 rounded-full ${statusColor}`}>
          <Text className={`text-s font-medium ${statusTextColor}`}>{statusLabel}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TaskItem;
