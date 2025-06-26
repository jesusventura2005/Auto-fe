import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Switch,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Badge from '../ui/Badge';
import Clock from '../../assets/clock.svg';
import Wheel from '../../assets/wheel.svg';
import Brake from '../../assets/car brakes-svgrepo-com.svg';
import { useState } from 'react';
import Input from '../ui/Input';
import { useForm, Controller } from 'react-hook-form';
import { VehicleTypeModal } from '../modals/VehicleTypeModal';
import Calendar from '../modals/Calendar';
import { usePatchMaintenance } from '../../app/hooks/usePatchMaintenance';

interface maintenance {
  id: string;
  title?: string;
  description?: string;
  type?: string;
  date?: string;
  dateNotFixed?: Date;
  kilometers?: number;
  completed?: boolean;
}

interface FormData {
  id: string;
  title: string;
  description: string;
  type: string;
  date: Date;
  kilometers: string;
  completed: boolean;
}

const vehicleTypes = [
  'Cambio de aceite',
  'Ruedas',
  'Freno',
  'Filtro',
  'Batería',
  'Mantenimiento regular',
  'Otros',
];

const MaintenanceCard = ({
  id,
  title,
  description,
  type,
  date,
  kilometers,
  dateNotFixed,
  completed,
}: maintenance) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [maintenanceTypeModalVisible, setMaintenanceTypeModalVisible] = useState(false);

  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      title: title || '',
      description: description || '',
      type: type || '',
      date: dateNotFixed || new Date(),
      kilometers: kilometers?.toString() || '0',
      completed: false,
    },
  });

  const patchMaintenance = usePatchMaintenance();

  const onSubmit = (data: FormData) => {
    const maintenanceData: any = { id };

    if (data.title !== title && data.title && data.title.trim()) {
      maintenanceData.title = data.title;
    }
    if (data.description !== description && data.description && data.description.trim()) {
      maintenanceData.description = data.description;
    }
    if (data.type !== type && data.type && data.type.trim()) {
      maintenanceData.type = data.type;
    }
    if (data.date !== dateNotFixed) {
      maintenanceData.date = data.date.toISOString();
    }
    if (data.kilometers !== kilometers?.toString() && data.kilometers && data.kilometers.trim()) {
      maintenanceData.kilometers = parseInt(data.kilometers, 10);
    }
    maintenanceData.completed = data.completed;

    console.log('Campos que se van a actualizar:', maintenanceData);

    patchMaintenance.mutate(maintenanceData, {
      onSuccess: () => {
        setModalOpen(false);
        reset();
      },
    });
  };

  return (
    <>
      <TouchableOpacity
        className="flex min-h-32 w-full flex-row items-center  justify-around rounded-xl bg-white p-4 shadow-lg dark:border dark:border-color-border-dark dark:bg-color-bg-dark "
        disabled={completed === true}
        onPress={() => setModalOpen(true)}>
        <View className="mb-4 mt-4 flex gap-4">
          <View className="flex flex-row items-center gap-4">
            <View className="rounded-full bg-[#daf0fd] p-2">
              {type === 'Cambio de aceite' ? (
                <FontAwesome5 name="oil-can" size={20} color="black" />
              ) : type === 'Ruedas' ? (
                <Wheel width={24} height={24} stroke="black"></Wheel>
              ) : type === 'Freno' ? (
                <Brake width={24} height={24}></Brake>
              ) : type === 'Filtro' ? (
                <FontAwesome5 name="filter" size={24} color="black" />
              ) : type === 'Batería' ? (
                <FontAwesome5 name="car-battery" size={24} color="black" />
              ) : type === 'Mantenimiento regular' ? (
                <FontAwesome5 name="car-battery" size={24} color="black" />
              ) : type === 'Otros' ? (
                <Ionicons name="settings-outline" size={24} color="black" />
              ) : (
                ''
              )}
            </View>
            <View className="w-7/12">
              <Text className="text-2xl font-semibold dark:text-color-title-dark">{title}</Text>
              <Text className="font-light text-[#696a7f]">{description}</Text>
            </View>
          </View>

          <View className="flex flex-row gap-4">
            <View className="flex flex-row items-center gap-2">
              <Ionicons name="calendar-clear-outline" size={16} color="#596a7f" />
              <Text className="text-[#596a7f]">{date}</Text>
            </View>

            <View className="flex flex-row items-center gap-2">
              <Clock width={16} height={16} stroke="#596a7f" strokeWidth={1.5} />
              <Text className="text-[#596a7f]">{kilometers}</Text>
            </View>
          </View>
        </View>
        <View className="flex flex-row">
          <Badge isCompleted={completed || false} />
        </View>
      </TouchableOpacity>

      <Modal visible={modalOpen} transparent animationType="slide">
        <TouchableWithoutFeedback>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1">
            <View className="flex-1 flex-col items-center">
              <ScrollView className="flex h-full w-full flex-col rounded-xl bg-white p-6 dark:border-t-4 dark:bg-[#111823]">
                <View className="mt-24 ">
                  <Text className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white">
                    Editar Mantenimiento
                  </Text>
                  <Input
                    label="Título"
                    placeholder="Ej: Cambio de aceite"
                    name="title"
                    defaultValue={title}
                    control={control}
                    rules={{
                      required: 'El título es obligatorio',
                      minLength: {
                        value: 3,
                        message: 'El título debe tener al menos 3 caracteres',
                      },
                    }}
                    secureTextEntry={false}
                  />
                </View>

                <View>
                  <Input
                    label="Descripción"
                    placeholder="Ej: Cambio de aceite del motor"
                    name="description"
                    control={control}
                    defaultValue={description}
                    rules={{
                      required: 'La descripción es obligatoria',
                      minLength: {
                        value: 5,
                        message: 'La descripción debe tener al menos 5 caracteres',
                      },
                    }}
                    secureTextEntry={false}
                  />
                </View>

                <TouchableOpacity
                  onPress={() => setMaintenanceTypeModalVisible(true)}
                  className="rounded-lg border border-gray-200 bg-white p-4 dark:border-color-border-dark dark:bg-color-bg-dark">
                  <Text className="text-gray-500">Tipo de mantenimiento</Text>
                  <Text
                    className={`font-medium text-gray-800${type ? ' text-color-alternative-dark dark:text-color-title-dark' : ''}`}>
                    {type || 'Seleccionar tipo'}
                  </Text>
                </TouchableOpacity>

                <VehicleTypeModal
                  isDisable={true}
                  text="Selecciona el tipo"
                  visible={maintenanceTypeModalVisible}
                  vehicleTypes={vehicleTypes}
                  control={control}
                  name="type"
                  rules={{ required: 'El tipo de mantenimiento es requerido' }}
                  onClose={() => setMaintenanceTypeModalVisible(false)}
                />

                <View className="mb-6">
                  <Calendar
                    valueDate={dateNotFixed}
                    control={control}
                    name="date"
                    rules={{ required: 'La fecha es requerida' }}
                  />
                </View>

                <View>
                  <Input
                    isNumeric={true}
                    label="Kilómetros"
                    placeholder="Ej: 50000"
                    control={control}
                    name="kilometers"
                    rules={{
                      required: 'Los kilómetros son obligatorios',
                      validate: (value) => /^\d+$/.test(value) || 'Debe contener solo números',
                      minLength: {
                        value: 1,
                        message: 'Los kilómetros son obligatorios',
                      },
                    }}
                    defaultValue={kilometers !== undefined ? kilometers.toString() : '0'}
                    secureTextEntry={false}
                  />
                </View>

                <View className="mb-4">
                  <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Completado
                  </Text>
                  <Controller
                    control={control}
                    name="completed"
                    defaultValue={false}
                    render={({ field: { onChange, value } }) => (
                      <View className="flex-row items-center justify-between rounded-lg border border-gray-200 bg-white p-4 dark:border-color-border-dark dark:bg-color-bg-dark">
                        <Text className="text-gray-600 dark:text-gray-400">
                          {value ? 'Completado' : 'Pendiente'}
                        </Text>
                        <Switch value={value} onValueChange={onChange} />
                      </View>
                    )}
                  />
                </View>

                <TouchableOpacity
                  onPress={handleSubmit(onSubmit)}
                  className="rounded-xl bg-color-secondary px-4 py-3">
                  <Text className="text-center text-lg font-bold text-white">Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setModalOpen(false);
                    reset();
                  }}
                  className="mb-4 mt-4 rounded-xl bg-color-alert px-4 py-3">
                  <Text className="text-center text-lg font-bold text-white">Cancelar</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default MaintenanceCard;
