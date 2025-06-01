import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Switch,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

const initialTasks = {
  upcoming: [
    {
      title: 'Brake Inspection',
      description: 'Check brake pads and replace if necessary',
      date: 'Jan 10, 2024',
      mileage: '35.000 miles',
      status: 'Pending',
      type: 'Frenos',
    },
    {
      title: 'Air Filter Replacement',
      description: 'Replace engine and cabin air filters',
      date: 'Feb 5, 2024',
      mileage: '37.500 miles',
      status: 'Pending',
      type: 'Filtros',
    },
    {
      title: 'Coolant Flush',
      description: 'Replace coolant and inspect cooling system',
      date: 'Mar 20, 2024',
      mileage: '40.000 miles',
      status: 'Pending',
      type: 'Otros',
    },
    {
      title: 'Transmission Service',
      description: 'Change transmission fluid and filter',
      date: 'Apr 20, 2024',
      mileage: '42.000 miles',
      status: 'Pending',
      type: 'Otros',
    },
    {
      title: 'Tire Replacement',
      description: 'Replace all four tires due to wear',
      date: 'May 10, 2024',
      mileage: '43.000 miles',
      status: 'Pending',
      type: 'Neumáticos',
    },
  ],
  completed: [
    {
      title: 'Oil Change',
      description: 'Regular oil change with filter replacement',
      date: 'Sep 15, 2023',
      mileage: '30.000 miles',
      status: 'Completed',
      type: 'Cambio de aceite',
    },
    {
      title: 'Tire Rotation',
      description: 'Rotate and balance all four tires',
      date: 'Sep 15, 2023',
      mileage: '30.000 miles',
      status: 'Completed',
      type: 'Neumáticos',
    },
    {
      title: 'Brake Fluid Change',
      description: 'Replace brake fluid and inspect brake lines',
      date: 'Sep 15, 2023',
      mileage: '30.000 miles',
      status: 'Completed',
      type: 'Frenos',
    },
  ],
};

const MaintenanceLog = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const openModal = (task: any) => {
    setSelectedTask({ ...task });
    setDate(new Date(task.date));
    setIsModalVisible(true);
  };

  const handleUpdate = () => {
    const updatedTask = { ...selectedTask };

    const newTasks = {
      upcoming: tasks.upcoming.filter((t) => t.title + t.date !== selectedTask.title + selectedTask.date),
      completed: tasks.completed.filter((t) => t.title + t.date !== selectedTask.title + selectedTask.date),
    };

    if (updatedTask.status === 'Completed') {
      newTasks.completed.push(updatedTask);
    } else {
      newTasks.upcoming.push(updatedTask);
    }

    setTasks(newTasks);
    setIsModalVisible(false);
    console.log('Updated via PUT (simulado):', updatedTask);
  };

  const renderItem = (item: any) => (
    <TouchableOpacity
      key={item.title + item.date}
      className="bg-white p-4 rounded-xl mb-3 shadow-md flex-row justify-between items-center"
      onPress={() => openModal(item)}
    >
      <View className="flex-1 pr-2">
        <Text className="text-base font-bold text-gray-900">{item.title}</Text>
        <Text className="text-sm text-gray-600 my-1">{item.description}</Text>
        <Text className="text-xs text-gray-400">{item.date} • {item.mileage}</Text>
      </View>
      <Text
        className={`text-xs font-semibold px-3 py-1 rounded-full ${
          item.status === 'Completed' ? 'bg-teal-500 text-white' : 'bg-yellow-300 text-blue-900'
        }`}
      >
        {item.status}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-sky-200">

      <View className="h-6 bg-sky-200" />
      <ScrollView
        contentContainerStyle={{
          paddingTop: 10,
          paddingBottom: 70,
          paddingHorizontal: 16,
        }}
      >
        <Text className="text-xl font-bold text-gray-800 mb-3">Upcoming Maintenance</Text>
        {tasks.upcoming.map(renderItem)}

        <Text className="text-xl font-bold text-gray-800 mt-6 mb-3">Completed Maintenance</Text>
        {tasks.completed.map(renderItem)}
      </ScrollView>

<Modal visible={isModalVisible} animationType="fade" transparent={true}>
  <Pressable
    className="flex-1 bg-black/50 justify-end"
    onPress={() => setIsModalVisible(false)}
  >
    <Pressable
      onPress={() => {}}
      className="bg-white p-6 rounded-t-2xl max-h-[90%]"
    >
      <Text className="text-lg font-bold mb-4">Edit Maintenance</Text>

      {/* Title */}
      <Text className="text-sm font-semibold">Title</Text>
      <TextInput
        value={selectedTask?.title}
        onChangeText={(text) => setSelectedTask((prev: any) => ({ ...prev, title: text }))}
        className="border border-gray-300 rounded-lg px-4 py-2 mb-4"
      />

      {/* Description */}
      <Text className="text-sm font-semibold">Description</Text>
      <TextInput
        value={selectedTask?.description}
        multiline
        numberOfLines={3}
        onChangeText={(text) => setSelectedTask((prev: any) => ({ ...prev, description: text }))}
        className="border border-gray-300 rounded-lg px-4 py-2 mb-4"
      />

      {/* Type */}
      <Text className="text-sm font-semibold">Type</Text>
      <View className="border border-gray-300 rounded-lg mb-4">
        <Picker
          selectedValue={selectedTask?.type}
          onValueChange={(value) => setSelectedTask((prev: any) => ({ ...prev, type: value }))}
        >
          <Picker.Item label="Cambio de aceite" value="Cambio de aceite" />
          <Picker.Item label="Neumáticos" value="Neumáticos" />
          <Picker.Item label="Frenos" value="Frenos" />
          <Picker.Item label="Filtros" value="Filtros" />
          <Picker.Item label="Batería" value="Batería" />
          <Picker.Item label="Otros" value="Otros" />
        </Picker>
      </View>

      {/* Date */}
      <Text className="text-sm font-semibold">Date</Text>
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        className="border border-gray-300 rounded-lg px-4 py-2 mb-4"
      >
        <Text className="text-gray-600">
          {date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(_, selectedDate) => {
            const currentDate = selectedDate || date;
            setShowDatePicker(false);
            setDate(currentDate);
            setSelectedTask((prev: any) => ({
              ...prev,
              date: currentDate.toDateString(),
            }));
          }}
        />
      )}

      {/* Mileage */}
      <Text className="text-sm font-semibold">Mileage</Text>
      <TextInput
        value={selectedTask?.mileage}
        keyboardType="numeric"
        onChangeText={(text) => setSelectedTask((prev: any) => ({ ...prev, mileage: text }))}
        className="border border-gray-300 rounded-lg px-4 py-2 mb-4"
      />

      {/* Status Switch */}
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-sm font-semibold">Completed</Text>
        <Switch
          value={selectedTask?.status === 'Completed'}
          onValueChange={(value) =>
            setSelectedTask((prev: any) => ({
              ...prev,
              status: value ? 'Completed' : 'Pending',
            }))
          }
        />
      </View>

      {/* Buttons */}
      <View className="flex-row justify-between">
        <TouchableOpacity
          onPress={() => setIsModalVisible(false)}
          className="bg-gray-300 px-4 py-2 rounded-lg mr-2"
        >
          <Text>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleUpdate}
          className="bg-blue-500 px-4 py-2 rounded-lg ml-2"
        >
          <Text className="text-white font-semibold">Update Task</Text>
        </TouchableOpacity>
      </View>
    </Pressable>
  </Pressable>
</Modal>
    </SafeAreaView>
  );
};

export default MaintenanceLog;
