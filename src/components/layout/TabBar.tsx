import {
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Text,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import TabBarButtonCustom from './TabBarButtonCustom';
import { useState } from 'react';
import { useVehicleId } from '~/context/VehicleIdContext';
import Input from '../ui/Input';
// import Ionicons from '@expo/vector-icons/Ionicons';
// import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useForm } from 'react-hook-form';
import Calendar from '../modals/Calendar';
import { VehicleTypeModal } from '../modals/VehicleTypeModal';
import useAddMaintenance from '~/app/hooks/useAddMaintenance';

// Interfaz para el formulario de mantenimiento
interface MaintenanceFormData {
  title: string;
  descripcion: string;
  maintenance: string;
  fecha: Date;
  kilometros: string;
}

const VISIBLE_TABS = ['maintenance/[id]', 'profile', 'details/[id]', 'checklist'];

const noVisibleScreens = ['(auth)/register', '(auth)/login', 'index', 'Dashboard' , 'RegisterVehicle'];

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const visibleRoutes = state.routes.filter((route) => VISIBLE_TABS.includes(route.name));
  const currentRoute = state.routes[state.index];
  const shouldHide = noVisibleScreens.includes(currentRoute.name);
  const [modalVisible, setModalVisible] = useState(false);
  const [maintenanceTypeModalVisible, setMaintenanceTypeModalVisible] = useState(false);
  const { vehicleId } = useVehicleId();
  const addMaintenanceMutation = useAddMaintenance();

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const vehicleTypes = [
    'Cambio de aceite',
    'Ruedas',
    'Freno',
    'Filtro',
    'Batería',
    'Mantenimiento regular',
    'Otros',
  ];

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitted },
  } = useForm<MaintenanceFormData>({
    defaultValues: {
      maintenance: '',
      fecha: new Date(),
      title: '',
      descripcion: '',
      kilometros: '',
    },
  });

  // Observar el valor del campo maintenance
  const maintenanceValue = watch('maintenance');

  // Función onSubmit para manejar el envío del formulario
  const onSubmit = (data: MaintenanceFormData) => {
    if (!vehicleId) {
      console.error('No hay vehicleId disponible');
      return;
    }

    const maintenanceData = {
      carId: vehicleId,
      title: data.title,
      description: data.descripcion,
      type: data.maintenance,
      date: data.fecha.toISOString(),
      kilometers: parseInt(data.kilometros, 10),
      completed: false,
    };

    addMaintenanceMutation.mutate(maintenanceData, {
      onSuccess: () => {
        setModalVisible(false);
        // Aquí podrías agregar un toast o notificación de éxito
        console.log('Mantenimiento agregado exitosamente');
      },
      onError: (error) => {
        console.error('Error al agregar mantenimiento:', error);
        // Aquí podrías agregar un toast o notificación de error
      },
    });
  };

  if (shouldHide) {
    return null;
  }

  const leftRoutes = visibleRoutes.slice(0, 2);
  const rightRoutes = visibleRoutes.slice(2);

  return (
    <>
      <View
        className={`absolute bottom-10 mx-5 w-11/12 flex-1
       flex-row items-center justify-between rounded-3xl bg-white p-4 shadow-md shadow-black blur-xl dark:border 
       dark:border-color-border-dark dark:bg-color-bg-dark `}>
        <View className="flex-row items-center">
          {leftRoutes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? String(options.tabBarLabel)
                : options.title !== undefined
                  ? String(options.title)
                  : String(route.name);

            const isFocused = state.index === state.routes.findIndex((r) => r.name === route.name);

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            return (
              <TabBarButtonCustom
                text={`${isFocused ? ' text-[8px] text-blue-600' : 'text-[8px] dark:text-[#ffffff] '}`}
                key={index}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarLabel ? String(options.tabBarLabel) : undefined}
                onPress={onPress}
                onLongPress={onLongPress}
                label={label}
                isFocused={isFocused}
              />
            );
          })}
        </View>

        <TabBarButtonCustom
          text="text-4xl text-white dark:text-white"
          accessibilityLabel="Add new item"
          testID="add-button"
          onPress={() => setModalVisible(true)}
          onLongPress={() => {}}
          label="+"
          isFocused={false}
        />

        <View className="flex-row items-center">
          {rightRoutes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? String(options.tabBarLabel)
                : options.title !== undefined
                  ? String(options.title)
                  : String(route.name);

            const isFocused = state.index === state.routes.findIndex((r) => r.name === route.name);

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            return (
              <TabBarButtonCustom
                text={`${isFocused ? ' text-[8px] text-blue-600' : 'text-[8px] dark:text-[#ffffff] '}`}
                key={index + leftRoutes.length}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarLabel ? String(options.tabBarLabel) : undefined}
                onPress={onPress}
                onLongPress={onLongPress}
                label={label}
                isFocused={isFocused}
              />
            );
          })}
        </View>
      </View>

      <Modal visible={modalVisible} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1">
            <View className="flex-1 flex-col items-center">
              <ScrollView className="flex h-full w-full flex-col rounded-xl bg-white p-6 dark:border-t-4 dark:bg-[#111823]">
                <View className="mt-24 ">
                  <Text className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white">
                    Agregar Mantenimiento
                  </Text>
                  <Input
                    label="Título"
                    placeholder="Ej: Cambio de aceite"
                    control={control}
                    name="title"
                    rules={{
                      required: 'El título es obligatorio',
                      minLength: {
                        value: 3,
                        message: 'El título debe tener al menos 3 caracteres',
                      },
                    }}
                    secureTextEntry={false}
                    error={isSubmitted ? errors.title : undefined}
                  />
                </View>

                <View>
                  <Input
                    label="Descripción"
                    placeholder="Ej: Cambio de aceite del motor"
                    control={control}
                    name="descripcion"
                    rules={{
                      required: 'La descripción es obligatoria',
                      minLength: {
                        value: 5,
                        message: 'La descripción debe tener al menos 5 caracteres',
                      },
                    }}
                    secureTextEntry={false}
                    error={isSubmitted ? errors.descripcion : undefined}
                  />
                </View>

                <TouchableOpacity
                  onPress={() => setMaintenanceTypeModalVisible(true)}
                  className="rounded-lg border border-gray-200 bg-white p-4 dark:border-color-border-dark dark:bg-color-bg-dark">
                  <Text className="text-gray-500">Marca</Text>
                  <Text
                    className={`font-medium text-gray-800 ${maintenanceValue ? ' text-color-alternative-dark dark:text-color-title-dark' : ''}`}>
                    {maintenanceValue || 'Seleccionar tipo'}
                  </Text>
                </TouchableOpacity>

                <View className='mb-6'>
                  <VehicleTypeModal
                    text='Selecciona el tipo'
                    visible={maintenanceTypeModalVisible}
                    vehicleTypes={vehicleTypes}
                    control={control}
                    name="maintenance"
                    rules={{ required: 'El tipo de mantenimiento es requerido' }}
                    onClose={() => setMaintenanceTypeModalVisible(false)}
                  />
                </View>

                <View className='mb-6'>
                  <Calendar
                    control={control}
                    name="fecha"
                    rules={{ required: 'La fecha es requerida' }}
                  />
                </View>

                <View>
                  <Input
                    isNumeric={true}
                    label="Kilómetros"
                    placeholder="Ej: 50000"
                    control={control}
                    name="kilometros"
                    rules={{
                      required: 'Los kilómetros son obligatorios',
                      validate: (value) => /^\d+$/.test(value) || 'Debe contener solo números',
                      minLength: {
                        value: 1,
                        message: 'Los kilómetros son obligatorios',
                      },
                    }}
                    secureTextEntry={false}
                    error={isSubmitted ? errors.kilometros : undefined}
                  />
                </View>

                <TouchableOpacity
                  onPress={handleSubmit(onSubmit)}
                  className="rounded-xl bg-color-secondary px-4 py-3">
                  <Text className="text-center text-lg font-bold text-white">Agregar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
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

export default TabBar;
