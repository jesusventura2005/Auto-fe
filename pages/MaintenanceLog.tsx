import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

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
    <TouchableOpacity key={item.title + item.date} style={styles.card}>
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.detail}>{item.date} • {item.mileage}</Text>
      </View>
      <Text style={[styles.status, item.status === 'Completed' ? styles.completed : styles.pending]}>
        {item.status}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Upcoming Maintenance</Text>
      {upcomingTasks.map(renderItem)}

      <Text style={styles.sectionTitle}>Completed Maintenance</Text>
      {completedTasks.map(renderItem)}
    </ScrollView>
  );
};

export default MaintenanceLog;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f8ff',
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e1e1e',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginVertical: 4,
  },
  detail: {
    fontSize: 13,
    color: '#888',
  },
  status: {
    fontSize: 13,
    fontWeight: '600',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },
  pending: {
    backgroundColor: '#f0f0f0',
    color: '#333',
  },
  completed: {
    backgroundColor: '#00c4a7',
    color: '#fff',
  },
});
