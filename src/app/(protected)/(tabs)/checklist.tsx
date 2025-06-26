import { useState } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SectionTitle from '~/components/ui/SectionTitle';
import CheckListCard from '~/components/cards/CheckListCard';
import MarkCompleteModal from '~/components/modals/MarkCompleteModal';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

dayjs.locale('es');

type ChecklistItem = {
  type: string;
  iconName: string;
  iconType: 'material-community' | 'font-awesome-5' | 'ionicons';
  lastDone: string;
  interval: string;
  status: 'Vencido' | 'Nunca hecho' | 'Al día';
};

const initialChecklistData: ChecklistItem[] = [
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

export default function ChecklistScreen() {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(initialChecklistData);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCardPress = (index: number) => {
    setSelectedIndex(index);
    setModalVisible(true);
  };

  const handleConfirm = () => {
    if (selectedIndex === null) return;

    const updatedChecklist = [...checklist];
    const today = dayjs().format('MMM D, YYYY');

    updatedChecklist[selectedIndex] = {
      ...updatedChecklist[selectedIndex],
      lastDone: today,
      status: 'Al día',
    };

    setChecklist(updatedChecklist);
    setModalVisible(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-color-bg dark:bg-color-bg-dark">
      <ScrollView className="flex-1 px-4 py-6">
        <SectionTitle title="Checklist de Mantenimiento" className="mb-6 text-center" />
        {checklist.map((item, index) => (
          <CheckListCard key={index} {...item} onPress={() => handleCardPress(index)} />
        ))}
      </ScrollView>

      <MarkCompleteModal
        visible={modalVisible}
        title={selectedIndex !== null ? checklist[selectedIndex].type : ''}
        onClose={() => setModalVisible(false)}
        onConfirm={handleConfirm}
      />
    </SafeAreaView>
  );
}
