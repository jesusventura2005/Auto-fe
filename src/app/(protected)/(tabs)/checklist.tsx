import { useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import SectionTitle from '~/components/ui/SectionTitle';
import CheckListCard from '~/components/cards/CheckListCard';
import axios from 'axios';
import { useVehicleId } from '~/context/VehicleIdContext';

const checklistdataReview = [
  {
    name: 'Cambio de aceite',
    type: 'Cambio de aceite',
    iconName: 'oil',
    iconType: 'material-community',
    interval: 3,
  },
  {
    name: 'Rotación de Neumáticos',
    type: 'Ruedas',
    iconName: 'dot-circle',
    iconType: 'font-awesome-5',
    interval: 6,
  },
  {
    name: 'Inspección de Frenos',
    type: 'Freno',
    iconName: 'car-brake-alert',
    iconType: 'material-community',
    interval: 12,
  },
  {
    name: 'Filtro de Aire',
    type: 'Filtro',
    iconName: 'filter-outline',
    iconType: 'ionicons',
    interval: 12,
  },
  {
    name: 'Revisión de Batería',
    type: 'Batería',
    iconName: 'car-battery',
    iconType: 'material-community',
    interval: 12,
  },
  {
    name: 'Mantenimiento General',
    type: 'Mantenimiento regular',
    iconName: 'tools',
    iconType: 'material-community',
    interval: 6,
  },
];

const getColorByStatus = (status: string) => {
  switch (status) {
    case 'Vencido':
      return '#dc2626'; // rojo
    case 'Nunca hecho':
      return '#facc15'; // amarillo
    case 'Al día':
    default:
      return '#22c55e'; // verde
  }
};

export default function ChecklistScreen() {
  const [data, setData] = useState([...checklistdataReview]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { vehicleId } = useVehicleId();

  const handlePress = (index: number) => {
    setSelectedIndex(index);
    setModalVisible(true);
  };

  const useCheckListCard = () => {
    const {
      data: maintenance,
      isLoading,
      isError,
      error,
    } = useQuery({
      queryKey: ['check', vehicleId],
      queryFn: async () => {
        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_API_URL}/maintenance/car/${vehicleId}/latest`
        );
        return response.data;
      },
      enabled: !!vehicleId,
    });

    if (isLoading) {
      console.log(vehicleId);
      return <Text>Cargando...</Text>;
    }

    if (isError) {
      return <Text>Error: {error.message}</Text>;
    }

    const maintenanceMap = new Map();
    if (maintenance && Array.isArray(maintenance)) {
      maintenance.forEach((item) => {
        maintenanceMap.set(item.type, item);
      });
    }

    const combinedData = checklistdataReview.map((checklistItem) => {
      const maintenanceItem = maintenanceMap.get(checklistItem.type);

      if (maintenanceItem) {
        // Si existe mantenimiento para este tipo, usar esos datos
        return {
          ...checklistItem,
          lastDone: maintenanceItem.date ?? undefined,
          date: maintenanceItem.date,
        };
      } else {
        // Si no existe mantenimiento usar los datos por defecto
        return {
          ...checklistItem,
        };
      }
    });

    return combinedData.map((item, index) => {
      return (
        <CheckListCard
          key={index}
          type={item.name}
          iconName={item.iconName}
          iconType={item.iconType}
          lastDone={item.lastDone}
          interval={item.interval}
          date={item.lastDone}
          onPress={() => handlePress(index)}
        />
      );
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-color-bg dark:bg-color-bg-dark">
      <ScrollView className="flex-1 px-4 py-6">
        <SectionTitle title="Checklist de Mantenimiento" className="mb-6 text-center" />
        {useCheckListCard()}
      </ScrollView>
    </SafeAreaView>
  );
}
