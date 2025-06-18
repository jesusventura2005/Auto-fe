import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import SectionTitle from '~/components/ui/SectionTitle';
import { useForm } from 'react-hook-form';
import MaintenanceCard from '~/components/cards/MaintenanceCard';

const MaintenanceLog = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <View className="flex-1 bg-white pt-10">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}>
        <SectionTitle title="Historial de mantenimiento" />

        <View className="mt-4">
          <Text className="mb-2 text-lg font-semibold text-blue-900">Pendientes</Text>
          <MaintenanceCard>
            
          </MaintenanceCard>
        </View>

        <View className="mt-6">
          <Text className="mb-2 text-lg font-semibold text-blue-900">Completadas</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default MaintenanceLog;
