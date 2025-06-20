import { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Appearance } from 'react-native';
import { VehicleTypeModal } from '~/components/modals/VehicleTypeModal';
import { useForm } from 'react-hook-form';
import { ButtonCmp } from '~/components/ui/ButtonCmp';
import  Input  from '~/components/ui/Input';
import useAddVehicle from '~/app/hooks/useAddVehicle';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

interface CarRegister {
  type: string;
  brand: string;
  carModel: string;
  age: number;
  owner: string;
  plate: string;
  serial: string;
}

const colorScheme = Appearance.getColorScheme()

console.log(colorScheme)

const hasSpecialCharacters = (value: string) => {
  if (!value) return 'Este campo no puede estar vacío';
  const regex = /^[a-zA-Z0-9\s]+$/;
  return regex.test(value) || 'No se permiten caracteres especiales';
};

const hasSpacedCharacters = (value: string) => {
  if (!value.trim()) return 'Este campo no puede contener solo espacios';
  if (value !== value.trim()) return 'No se permiten espacios al inicio o al final';
  if (/\s{2,}/.test(value)) return 'No se permiten espacios múltiples seguidos';
  if (/^(\w\s)+\w$/.test(value)) return 'No se permiten caracteres vacíos';
  return true;
};

const RegisterVehicle = () => {
  const { control, handleSubmit } = useForm<CarRegister>({
    defaultValues: {
      type: '',
      brand: '',
      carModel: '',
      age: 0,
      owner: '',
      plate: '',
      serial: '',
    },
  });

  const addVehicle = useAddVehicle();

  const onSubmit = (data: CarRegister) => {
    addVehicle.mutate({
      ...data,
    });
  };

  const [modalBrandVisible, setModalBrandVisible] = useState(false);
  const [modalTypeVisible, setModalTypeVisible] = useState(false);

  const brands = ['Nissan', 'Toyota', 'Chevrolet', 'Ford', 'Hyundai'];
  const types = ['Carro', 'Camioneta', 'Moto'];

  return (
    <ScrollView className="flex-1 bg-blue-50 dark:bg-color-bg-dark" contentContainerStyle={{ paddingVertical: 30 }}>
      <TouchableOpacity
        onPress={() => router.push('Dashboard')}
        className="ml-6 mt-8 flex h-10 w-10 items-center justify-center ">
        <Ionicons name="arrow-back-outline" size={24} color={colorScheme === 'dark' ? 'white' : 'black' } />
      </TouchableOpacity>
      <View className="mx-6 mt-2 rounded-2xl bg-white dark:bg-color-bg-dark dark:border dark:border-color-border-dark p-8 shadow-lg">
        <Text className="mb-8 text-center text-3xl font-bold text-color-primary">Agregar Vehículo</Text>

        <View className="grid gap-5">
          <Input
            label="plate"
            control={control}
            name="plate"
            placeholder="192j9ejs"
            rules={{
              required: 'Este campo es obligatorio',
              validate: {
                SpecialCharacters: (value) => hasSpecialCharacters(value),
                spacedChars: (value) => hasSpacedCharacters(value),
              },
            }}
          />
          <Input
            label="serial"
            control={control}
            name="serial"
            placeholder="192j9ejs"
            rules={{
              required: 'Este campo es obligatorio',
              validate: {
                SpecialCharacters: (value) => hasSpecialCharacters(value),
                spacedChars: (value) => hasSpacedCharacters(value),
              },
            }}
          />
          <Input
            label="age"
            control={control}
            name="age"
            placeholder="192j9ejs"
            rules={{
              required: 'Este campo es obligatorio',
              validate: {
                SpecialCharacters: (value) => hasSpecialCharacters(value),
                spacedChars: (value) => hasSpacedCharacters(value),
              },
            }}
          />
          <Input
            label="carModel"
            control={control}
            name="carModel"
            placeholder="192j9ejs"
            rules={{
              required: 'Este campo es obligatorio',
              validate: {
                SpecialCharacters: (value) => hasSpecialCharacters(value),
                spacedChars: (value) => hasSpacedCharacters(value),
              },
            }}
          />
          <TouchableOpacity
            onPress={() => setModalTypeVisible(true)}
            className="rounded-lg border border-gray-200 bg-white p-4 dark:border-color-border-dark dark:bg-color-bg-dark">
            <Text className="text-gray-500">Tipo</Text>
            <Text className={`font-medium text-gray-800 ${control._formValues.type ? ' text-color-alternative-dark dark:text-color-title-dark' : ''}`}>
              {control._formValues.type || 'Seleccionar Tipo'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => setModalBrandVisible(true)}
            className="rounded-lg border border-gray-200 bg-white p-4 dark:border-color-border-dark dark:bg-color-bg-dark">
            <Text className="text-gray-500">Marca</Text>
            <Text className={`font-medium text-gray-800 ${control._formValues.brand ? ' text-color-alternative-dark dark:text-color-title-dark' : ''}`}>
              {control._formValues.brand || 'Seleccionar Marca'}
            </Text>
          </TouchableOpacity>
        </View>

        <ButtonCmp
          title="Guardar Vehículo"
          onPress={handleSubmit((data) => onSubmit(data))}
          className="mt-8 rounded-xl bg-color-primary py-4"
          animated
        />

        <VehicleTypeModal
        text=' Selecciona el tipo'
          visible={modalTypeVisible}
          vehicleTypes={types}
          control={control}
          name="type"
          rules={{ required: true }}
          onClose={() => setModalTypeVisible(false)}
        />

        <VehicleTypeModal
        text='Selecciona el Modelo'
          visible={modalBrandVisible}
          vehicleTypes={brands}
          control={control}
          name="brand"
          rules={{ required: true }}
          onClose={() => setModalBrandVisible(false)}
        />
      </View>
    </ScrollView>
  );
};

export default RegisterVehicle;
