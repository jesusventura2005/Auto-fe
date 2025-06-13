import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import TaskItem from '~/components/TaskItem';
import SectionTitle from '~/components/SectionTitle';
import EditTaskModal from '~/components/EditTaskModal';
import { useTaskManager, Task } from '~/components/useTaskManager';
import { Plus } from 'lucide-react-native';
import uuid from 'react-native-uuid';

const initialTasks: Task[] = [
  {
    id: String(uuid.v4()),
    title: 'Cambio de aceite',
    description: 'Aceite sintético 5W-30',
    type: 'Oil Change',
    date: '2025-06-10',
    kilometraje: '5000 km',
    completado: false,
  },
  {
    id: String(uuid.v4()),
    title: 'Rotación de neumáticos',
    description: 'Rotación cada 10.000 km',
    type: 'Tire Rotation',
    date: '2025-06-05',
    kilometraje: '10000 km',
    completado: true,
  },
];

const MaintenanceLog = () => {
  const { tasks, updateTask, addTask } = useTaskManager(initialTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const sortedTasks = [...tasks].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const handleTaskPress = (task: Task) => {
    setSelectedTask(task);
    setModalVisible(true);
  };

  const handleAddNewTask = () => {
    const newEmptyTask: Task = {
      id: String(uuid.v4()),
      title: '',
      description: '',
      type: 'Oil Change',
      date: new Date().toISOString().split('T')[0],
      kilometraje: '',
      completado: false,
    };
    setSelectedTask(newEmptyTask);
    setModalVisible(true);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    const existingTask = tasks.find((t) => t.id === updatedTask.id);
    if (existingTask) {
      updateTask(updatedTask);
    } else {
      addTask(updatedTask);
    }
    setModalVisible(false);
    setSelectedTask(null);
  };

  return (
    <View className="flex-1 bg-white px-4 pt-10">
      <ScrollView>
        <SectionTitle title="Historial de mantenimiento" />
        <Text className="text-lg font-semibold text-blue-900 mt-4">Pendientes</Text>
        {sortedTasks.filter(t => !t.completado).map((task) => (
          <TaskItem key={task.id} task={task} onPress={() => handleTaskPress(task)} />
        ))}
        <Text className="text-lg font-semibold text-blue-900 mt-6">Completadas</Text>
        {sortedTasks.filter(t => t.completado).map((task) => (
          <TaskItem key={task.id} task={task} onPress={() => handleTaskPress(task)} />
        ))}
      </ScrollView>

      <TouchableOpacity
        onPress={handleAddNewTask}
        className="absolute bottom-6 right-6 bg-blue-500 p-4 rounded-full shadow-lg"
      >
        <Plus color="white" size={24} />
      </TouchableOpacity>

      {selectedTask && (
        <EditTaskModal
          visible={isModalVisible}
          task={selectedTask}
          onClose={() => setModalVisible(false)}
          onUpdate={handleUpdateTask}
        />
      )}
    </View>
  );
};

export default MaintenanceLog;
