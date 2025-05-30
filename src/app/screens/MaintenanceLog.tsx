import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const upcomingTasks = [
  {
    title: 'Brake Inspection',
    description: 'Check brake pads and replace if necessary',
    date: 'Jan 10, 2024',
    mileage: '35.000 miles',
    status: 'Pending',
  },
  {
    title: 'Air Filter Replacement',
    description: 'Replace engine and cabin air filters',
    date: 'Feb 5, 2024',
    mileage: '37.500 miles',
    status: 'Pending',
  },
  {
    title: 'Coolant Flush',
    description: 'Replace coolant and inspect cooling system',
    date: 'Mar 20, 2024',
    mileage: '40.000 miles',
    status: 'Pending',
  },
  {
    title: 'Transmission Service',
    description: 'Change transmission fluid and filter',
    date: 'Apr 20, 2024',
    mileage: '42.000 miles',
    status: 'Pending',
  },
  {
    title: 'Tire Replacement',
    description: 'Replace all four tires due to wear',
    date: 'May 10, 2024',
    mileage: '43.000 miles',
    status: 'Pending',
  },
];
const completedTasks = [
  {
    title: 'Oil Change',
    description: 'Regular oil change with filter replacement',
    date: 'Sep 15, 2023',
    mileage: '30.000 miles',
    status: 'Completed',
  },
  {
    title: 'Tire Rotation',
    description: 'Rotate and balance all four tires',
    date: 'Sep 15, 2023',
    mileage: '30.000 miles',
    status: 'Completed',
  },
  {
    title: 'Brake Fluid Change',
    description: 'Replace brake fluid and inspect brake lines',
    date: 'Sep 15, 2023',
    mileage: '30.000 miles',
    status: 'Completed',
  },
];

const MaintenanceLog = () => {
  const renderItem = (item: any) => (
    <TouchableOpacity
      key={item.title + item.date}
      className="bg-white p-4 rounded-xl mb-3 shadow-md flex-row justify-between items-center"
    >
      <View className="flex-1 pr-2">
        <Text className="text-base font-bold text-gray-900">{item.title}</Text>
        <Text className="text-sm text-gray-600 my-1">{item.description}</Text>
        <Text className="text-xs text-gray-400">
          {item.date} • {item.mileage}
        </Text>
      </View>
      <Text
        className={`text-xs font-semibold px-3 py-1 rounded-full ${
          item.status === 'Completed'
            ? 'bg-teal-500 text-white'
            : 'bg-yellow-300 text-blue-900'
        }`}
      >
        {item.status}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-sky-200">
      <ScrollView className="flex-1 px-4 pt-6 pb-6">
        <Text className="text-xl font-bold text-gray-800 mb-3">
          Upcoming Maintenance
        </Text>
        {upcomingTasks.map(renderItem)}

        <Text className="text-xl font-bold text-gray-800 mt-6 mb-3">
          Completed Maintenance
        </Text>
        {completedTasks.map(renderItem)}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MaintenanceLog;
