import { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { VehicleTypeModal } from '../../../components/ModalRegister';
import { useForm } from 'react-hook-form';
import { Button } from '../../../components/ButtonCmp';
import { RegisterInput } from '~/components/RegisterInput';
import  useAddVehicle  from '~/app/hooks/useAddVehicle';

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
  const { control, handleSubmit } = useForm({
    defaultValues: {
      type: '',
      brand: '',
      carModel: '',
      age: '',
      owner: '',
      plate: '',
      serial: '',
    },
  });

  const addVehicle = useAddVehicle();

  const onSubmit = (data: any) => {
    addVehicle.mutate({
      ...data,
    });
  };

  const [modalBrandVisible, setModalBrandVisible] = useState(false);
  const [modalTypeVisible, setModalTypeVisible] = useState(false);

  const brands = ['Nissan', 'Toyota', 'Chevrolet', 'Ford', 'Hyundai'];
  const types = ['Carro', 'Camioneta', 'Moto'];

  return (
    <ScrollView className="flex-1 bg-blue-50" contentContainerStyle={{ paddingVertical: 30 }}>
      <View className="mx-6 rounded-2xl bg-white p-8 mt-10 shadow-lg">
        <Text className="mb-8 text-center text-3xl font-bold text-blue-800">Agregar Vehículo</Text>

        <View className="grid gap-5">
          <RegisterInput label="plate" control={control} name="plate" placeholder="192j9ejs" 
          rules={{ required: 'Este campo es obligatorio', validate: { SpecialCharacters: (value)=> hasSpecialCharacters(value), spacedChars: (value) => hasSpacedCharacters(value) } }}/>
          <RegisterInput label="serial" control={control} name="serial" placeholder="192j9ejs"
          rules={{ required: 'Este campo es obligatorio', validate: { SpecialCharacters: (value)=> hasSpecialCharacters(value), spacedChars: (value) => hasSpacedCharacters(value) } }}/> /
          <RegisterInput label="age" control={control} name="age" placeholder="192j9ejs"
          rules={{ required: 'Este campo es obligatorio', validate: { SpecialCharacters: (value)=> hasSpecialCharacters(value), spacedChars: (value) => hasSpacedCharacters(value) } }}/> /
          <RegisterInput label="carModel" control={control} name="carModel" placeholder="192j9ejs"
          rules={{ required: 'Este campo es obligatorio', validate: { SpecialCharacters: (value)=> hasSpecialCharacters(value), spacedChars: (value) => hasSpacedCharacters(value) } }}/>/

          <TouchableOpacity
            onPress={() => setModalTypeVisible(true)}
            className="rounded-lg border border-gray-200 bg-white p-4">
            <Text className="text-gray-500">Tipo</Text>
            <Text className="font-medium text-gray-800">
              {control._formValues.type || 'Seleccionar Tipo'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setModalBrandVisible(true)}
            className="rounded-lg border border-gray-200 bg-white p-4">
            <Text className="text-gray-500">Marca</Text>
            <Text className="font-medium text-gray-800">
              {control._formValues.brand || 'Seleccionar Marca'}
            </Text>
          </TouchableOpacity>
        </View>

        <Button
          title="Guardar Vehículo" 
          onPress={handleSubmit((data) => onSubmit(data))}
          className="mt-8 bg-blue-600 rounded-xl py-4"
          animated
        />

        <VehicleTypeModal
          visible={modalTypeVisible}
          vehicleTypes={types}
          control={control}
          name="type"
          rules={{ required: true }}
          onClose={() => setModalTypeVisible(false)}
        />

        <VehicleTypeModal
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