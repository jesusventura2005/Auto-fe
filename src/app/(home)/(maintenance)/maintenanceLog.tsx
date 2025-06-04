import { ScrollView, View, TouchableOpacity, Text } from 'react-native';
import { useState } from 'react';
import TaskItem from '../../../components/TaskItem';
import SectionTitle from '../../../components/SectionTitle';
import EditTaskModal from '../../../components/EditTaskModal';
import { useTaskManager } from '../../../components/useTaskManager';
import type { Task } from '../../../components/useTaskManager';
import { router } from 'expo-router';

const MaintenanceLog = () => {
  const initialTasks: Task[] = [
    {
      title: 'Oil Change',
      description: 'Changed engine oil and oil filter',
      type: 'Oil Change',
      date: '2025-06-01',
      kilometraje: '50,000 km',
      completado: true,
    },
    {
      title: 'Tire Rotation',
      description: 'Rotated all four tires',
      type: 'Tire Rotation',
      date: '2025-06-15',
      kilometraje: '52,000 km',
      completado: false,
    },
  ];

  const { tasks, updateTask, addTask } = useTaskManager(initialTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const handleTaskPress = (task: Task) => {
    setSelectedTask(task);
    setIsCreating(false);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedTask(null);
    setIsCreating(false);
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    if (isCreating) {
      addTask(updatedTask);
    } else {
      updateTask(updatedTask);
    }
    handleModalClose();
  };

  const handleAddPress = () => {
    const today = new Date().toISOString().split('T')[0];
    setSelectedTask({
      title: '',
      description: '',
      type: 'Other',
      date: today,
      kilometraje: '',
      completado: false,
    });
    setIsCreating(true);
    setModalVisible(true);
  };

  const pendingTasks = tasks.filter((t) => !t.completado);
  const completedTasks = tasks.filter((t) => t.completado);

  return (
    <View className="flex-1 bg-blue-50">
      <ScrollView className="p-4 pt-10">
        <SectionTitle title="Mantenimiento Pendiente" />
        {pendingTasks.map((task) => (
          <TaskItem
            key={task.title + task.date}
            task={task}
            onPress={() => handleTaskPress(task)}
          />
        ))}

        <SectionTitle title=" Mantenimiento Completado" />
        {completedTasks.map((task) => (
          <TaskItem
            key={task.title + task.date}
            task={task}
            onPress={() => handleTaskPress(task)}
          />
        ))}
      </ScrollView>

      {selectedTask && (
        <EditTaskModal
          visible={modalVisible}
          task={selectedTask}
          onClose={handleModalClose}
          onUpdate={handleTaskUpdate}
        />
      )}

      {/* Botón flotante */}
      <TouchableOpacity
        onPress={() => router.push("/")}
        className="absolute bottom-6 h-14 w-14 items-center justify-center rounded-full bg-blue-600 shadow-md">
        <Text className="text-3xl text-white">+</Text>
      </TouchableOpacity>

      {/* Botón flotante */}
      <TouchableOpacity
        onPress={handleAddPress}
        className="absolute bottom-6 right-6 h-14 w-14 items-center justify-center rounded-full bg-blue-600 shadow-md">
        <Text className="text-3xl text-white">+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MaintenanceLog;
