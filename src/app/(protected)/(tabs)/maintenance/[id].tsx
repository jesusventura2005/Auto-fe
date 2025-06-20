import { ScrollView, Text, View } from 'react-native';
import SectionTitle from '~/components/ui/SectionTitle';
import MaintenanceCard from '~/components/cards/MaintenanceCard';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useVehicleId } from '~/context/VehicleIdContext';

// Función para formatear la fecha
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

  const MaintenanceList = () => {
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
        console.log(response.data);
        return response.data;
      },
    });

    if (isLoading) {
      return <Text>is loading</Text>;
    }

    if (isError) {
      return <Text>{error.message}</Text>;
    }

    return maintenances.map((maintenance: any) => (
      <MaintenanceCard
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

        <View className="mt-4 ">
          <Text className="mb-2 text-lg font-semibold text-color-primary">Pendientes</Text>
          <View className="gap-4">
            <MaintenanceList></MaintenanceList>
          </View>
        </View>

        <View className="mt-6 ">
          <Text className="mb-2 text-lg font-semibold text-color-primary">Completadas</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default MaintenanceLog;
