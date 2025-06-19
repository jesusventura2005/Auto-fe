import { ScrollView, Text, View } from 'react-native';
import SectionTitle from '~/components/ui/SectionTitle';
import MaintenanceCard from '~/components/cards/MaintenanceCard';

const MaintenanceLog = () => {
  return (
    <View className="flex-1 bg-white pt-10 dark:bg-color-bg-dark">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}>
        <SectionTitle title="Historial de mantenimiento" />

        <View className="mt-4">
          <Text className="mb-2 text-lg font-semibold text-color-primary">Pendientes</Text>
          <MaintenanceCard>
            
          </MaintenanceCard>
        </View>

        <View className="mt-6">
          <Text className="mb-2 text-lg font-semibold text-color-primary">Completadas</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default MaintenanceLog;
