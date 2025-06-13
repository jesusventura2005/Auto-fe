import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { VehicleTypeModal } from '../../../components/ModalRegister';
import { useForm } from 'react-hook-form';
import { AnimatedSubmitButton } from '../../../components/AnimatedButton';
import { RegisterInput } from '~/components/RegisterInput';
import useAddVehicle from '~/app/hooks/useAddVehicle';

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
    <ScrollView className="flex-1" contentContainerStyle={{ paddingVertical: 30 }}>
      <View className="mx-6 mt-10 rounded-2xl bg-white p-8 shadow-lg">
        <Text className="mb-8 text-center text-3xl font-bold text-blue-800">Agregar Vehículo</Text>

        <View className="grid gap-5">
          <RegisterInput label="plate" control={control} name="plate" placeholder="192j9ejs" />
          <RegisterInput label="serial" control={control} name="serial" placeholder="192j9ejs" />
          <RegisterInput label="age" control={control} name="age" placeholder="192j9ejs" />
          <RegisterInput
            label="carModel"
            control={control}
            name="carModel"
            placeholder="192j9ejs"
          />

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

        <AnimatedSubmitButton
          title="Guardar Vehículo"
          onPress={handleSubmit((data) => onSubmit(data))}
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
