import { ScrollView, Text, View } from 'react-native';
import SectionTitle from '~/components/ui/SectionTitle';
import MaintenanceCard from '~/components/cards/MaintenanceCard';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useVehicleId } from '~/context/VehicleIdContext';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
};

const MaintenanceLog = () => {
  const { vehicleId } = useVehicleId();

  const MaintenanceListPending = () => {
    const {
      data: maintenances,
      isError,
      isLoading,
      error,
    } = useQuery({
      queryKey: ['maintenance'],
      queryFn: async () => {
        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_API_URL}/maintenance/car/${vehicleId}`
        );
        return response.data;
      },
    });

    if (isLoading) {
      return <Text>is loading</Text>;
    }

    if (maintenances.length === 0) {
      return <Text>no hay mantenimientos</Text>;
    }

    if (isError) {
      return <Text>{error.message}</Text>;
    }

    const pendingMaintenances = maintenances.filter(
      (maintenance: any) => maintenance.completed === false
    );

    console.log(pendingMaintenances);

    return pendingMaintenances.map((maintenance: any) => (
      <MaintenanceCard
        id={maintenance._id}
        dateNotFixed={maintenance.date}
        key={maintenance._id}
        title={maintenance.title}
        description={maintenance.description}
        type={maintenance.type}
        date={formatDate(maintenance.date)}
        kilometers={maintenance.kilometers}
        completed={maintenance.completed}></MaintenanceCard>
    ));
  };

  const MaintenanceListCompleted = () => {
    const {
      data: maintenances,
      isError,
      isLoading,
      error,
    } = useQuery({
      queryKey: ['maintenance'],
      queryFn: async () => {
        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_API_URL}/maintenance/car/${vehicleId}`
        );
        return response.data;
      },
    });

    if (isLoading) {
      return <Text>is loading</Text>;
    }

    if (maintenances.length === 0) {
      return <Text>no hay mantenimientos</Text>;
    }

    if (isError) {
      return <Text>{error.message}</Text>;
    }

    const completedMaintenances = maintenances.filter(
      (maintenance: any) => maintenance.completed === true
    );

    console.log(completedMaintenances);

    return completedMaintenances.map((maintenance: any) => (
      <MaintenanceCard
        completed={maintenance.completed}
        id={maintenance._id}
        dateNotFixed={maintenance.date}
        key={maintenance._id}
        title={maintenance.title}
        description={maintenance.description}
        type={maintenance.type}
        date={formatDate(maintenance.date)}
        kilometers={maintenance.kilometers}></MaintenanceCard>
    ));
  };

  return (
    <View className="flex-1 bg-white pt-10 dark:bg-color-bg-dark">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}>
        <SectionTitle title="Historial de mantenimiento" />

        <View className="mt-2 ">
          <Text className="mb-6 text-lg font-semibold text-color-primary">Pendientes</Text>
          <View className="gap-4">
            <MaintenanceListPending></MaintenanceListPending>
          </View>
        </View>

        <View className="mt-6 ">
          <Text className="mb-6 text-lg font-semibold text-color-primary">Completadas</Text>
          <View className="gap-4">
            <MaintenanceListCompleted></MaintenanceListCompleted>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default MaintenanceLog;
