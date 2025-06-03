import { ScrollView, View } from 'react-native';
import { useState } from 'react';
import TaskItem from '../../components/TaskItem';
import SectionTitle from '../../components/SectionTitle';
import EditTaskModal from '../../components/EditTaskModal';
import { useTaskManager, Task } from '../../components/useTaskManager';

const MaintenanceLog = () => {
  const initialTasks: Task[] = [
    {
      title: 'Oil Change',
      description: 'Changed engine oil and oil filter',
      type: 'Oil Change',
      date: '2025-06-01',
      mileage: '50,000 km',
      completed: true,
    },
    {
      title: 'Tire Rotation',
      description: 'Rotated all four tires',
      type: 'Tire Rotation',
      date: '2025-06-15',
      mileage: '52,000 km',
      completed: false,
    },
  ];

  const { tasks, updateTask } = useTaskManager(initialTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleTaskPress = (task: Task) => {
    setSelectedTask(task);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedTask(null);
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    updateTask(updatedTask);
  };

  const pendingTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  return (
    <ScrollView className="pt-10 p-4 bg-blue-50 min-h-screen">
      <SectionTitle title="Upcoming Maintenance" />
      {pendingTasks.map((task) => (
        <TaskItem key={task.title + task.date} task={task} onPress={() => handleTaskPress(task)} />
      ))}

      <SectionTitle title="Completed Maintenance" />
      {completedTasks.map((task) => (
        <TaskItem key={task.title + task.date} task={task} onPress={() => handleTaskPress(task)} />
      ))}

      {selectedTask && (
        <EditTaskModal
          visible={modalVisible}
          task={selectedTask}
          onClose={handleModalClose}
          onUpdate={handleTaskUpdate}
        />
      )}
    </ScrollView>
  );
};

export default MaintenanceLog;
