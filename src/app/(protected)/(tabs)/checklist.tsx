import { useState } from 'react';
import { ScrollView, View, Text, Appearance } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import SectionTitle from '~/components/ui/SectionTitle';
import ButtonCmp from '~/components/ui/ButtonCmp';


const initialChecklistData = [
  {
    type: 'Cambio de Aceite',
    iconName: 'oil',
    iconType: 'material-community',
    lastDone: 'Nov 5, 2023',
    interval: 'cada 3 meses',
    status: 'Vencido',
  },
  {
    type: 'Rotación de Neumáticos',
    iconName: 'dot-circle',
    iconType: 'font-awesome-5',
    lastDone: 'Nunca realizado',
    interval: 'cada 6 meses',
    status: 'Nunca hecho',
  },
  {
    type: 'Inspección de Frenos',
    iconName: 'car-brake-alert',
    iconType: 'material-community',
    lastDone: 'Nunca realizado',
    interval: 'cada 12 meses',
    status: 'Nunca hecho',
  },
  {
    type: 'Filtro de Aire',
    iconName: 'filter-outline',
    iconType: 'ionicons',
    lastDone: 'Ago 10, 2023',
    interval: 'cada 12 meses',
    status: 'Al día',
  },
  {
    type: 'Revisión de Batería',
    iconName: 'car-battery',
    iconType: 'material-community',
    lastDone: 'Jul 1, 2023',
    interval: 'cada 12 meses',
    status: 'Al día',
  },
  {
    type: 'Mantenimiento General',
    iconName: 'tools',
    iconType: 'material-community',
    lastDone: 'Jun 2023',
    interval: 'cada 12 meses',
    status: 'Al día',
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

const getIconComponent = (
  iconType: string,
  iconName: string,
  color: string
) => {

  switch (iconType) {
    case 'material-community':
      return <MaterialCommunityIcons name={iconName as any} size={24} color={color} />;
    case 'font-awesome-5':
      return <FontAwesome5 name={iconName as any} size={20} color={color} />;
    case 'ionicons':
      return <Ionicons name={iconName as any} size={24} color={color} />;
    default:
      return null;
  }
};

export default function ChecklistScreen() {
  const [data, setData] = useState([...initialChecklistData]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = (index: number) => {
    setSelectedIndex(index);
    setModalVisible(true);
  };

  const handleConfirm = () => {
    if (selectedIndex === null) return;

    const updated = [...data];
    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    updated[selectedIndex] = {
      ...updated[selectedIndex],
      lastDone: today,
      status: 'Al día',
    };

    setData(updated);
    setModalVisible(false);
    setSelectedIndex(null);
  };

  return (
    <SafeAreaView className="flex-1 bg-color-bg dark:bg-color-bg-dark">
      <ScrollView className="flex-1 px-4 py-6">
        <SectionTitle title="Checklist de Mantenimiento" className="mb-6 text-center" />
        {data.map((item, index) => {
          const color = getColorByStatus(item.status);
          return (
            <ButtonCmp key={index} onPress={() => handlePress(index)} animated>
              <View
                className="mb-4 w-full rounded-xl border border-color-border dark:border-color-border-dark bg-white dark:bg-color-bg-dark p-4 flex-row items-center"
                style={{ borderLeftWidth: 5, borderLeftColor: color }}
              >
                <View className="mr-4">
                  {getIconComponent(item.iconType, item.iconName, color)}
                </View>

                <View className="flex-1">
                  <Text className="text-lg font-semibold text-color-title dark:text-color-title-dark">
                    {item.type}
                  </Text>
                  <Text className="text-sm text-gray-500 dark:text-gray-400">
                    Última vez: {item.lastDone}
                  </Text>
                  <Text className="text-xs text-gray-400 dark:text-gray-500">
                    Recomendado {item.interval}
                  </Text>
                </View>

                <View className="bg-gray-800 rounded-full px-3 py-1 min-w-[80px] items-center">
                  <Text className="text-xs text-white text-center">{item.status}</Text>
                </View>
              </View>
            </ButtonCmp>
          );
        })}
      </ScrollView>

      {/* {selectedIndex !== null && (
        <ConfirmationModal
          visible={modalVisible}
          taskName={data[selectedIndex].type}
          onConfirm={handleConfirm}
          onCancel={() => {
            setModalVisible(false);
            setSelectedIndex(null);
          }}
        />
      )} */}
    </SafeAreaView>
  );
}