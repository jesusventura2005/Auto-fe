import React, { useState } from 'react';
import { Alert, ScrollView, View, Text } from 'react-native';
import { VehicleForm } from '../../components/VehicleForm';
import { VehicleTypeModal } from '../../components/VehicleTypeModal';
import { AnimatedSubmitButton } from '../../components/AnimatedButton';

const RegisterVehicle = () => {
  const [plate, setPlate] = useState('');
  const [serial, setSerial] = useState('');
  const [year, setYear] = useState('');
  const [model, setModel] = useState('');
  const [brand, setBrand] = useState('Nissan');
  const [type, setType] = useState('Carro');

  const [modalBrandVisible, setModalBrandVisible] = useState(false);
  const [modalTypeVisible, setModalTypeVisible] = useState(false);

  const brands = ['Nissan', 'Toyota', 'Chevrolet', 'Ford', 'Hyundai'];
  const types = ['Carro', 'Camioneta', 'Moto'];

  const validateInputs = () => {
    const fields = [
      { label: 'Placa', value: plate },
      { label: 'Serial', value: serial },
      { label: 'Año', value: year },
      { label: 'Modelo', value: model },
    ];

    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>_\-+=\\[\];'/`~]/;

    for (let field of fields) {
      if (!field.value.trim()) {
        Alert.alert('Campo vacío', `El campo "${field.label}" no puede estar vacío.`);
        return false;
      }
      if (hasSpecialChars.test(field.value)) {
        Alert.alert('Caracteres inválidos', `El campo "${field.label}" contiene caracteres especiales no permitidos.`);
        return false;
      }
    }

    if (!/^\d{4}$/.test(year)) {
      Alert.alert('Año inválido', 'El campo "Año" debe contener exactamente 4 dígitos numéricos.');
      return false;
    }

    return true;
  };

  const handleSave = () => {
    if (validateInputs()) {
      Alert.alert('Éxito', 'Vehículo guardado correctamente.');
    }
  };

  return (
    <ScrollView className="flex-1 bg-blue-50" contentContainerStyle={{ paddingVertical: 30 }}>
      <View className="bg-white rounded-2xl shadow-lg mx-6 p-8">
        <Text className="text-3xl font-bold text-blue-800 mb-8 text-center">Agregar Vehículo</Text>

        <VehicleForm
          plate={plate}
          serial={serial}
          year={year}
          model={model}
          brand={brand}
          type={type}
          setPlate={setPlate}
          setSerial={setSerial}
          setYear={setYear}
          setModel={setModel}
          onBrandPress={() => setModalBrandVisible(true)}
          onTypePress={() => setModalTypeVisible(true)}
        />

        <AnimatedSubmitButton title="Guardar Vehículo" onPress={handleSave} />

        <VehicleTypeModal
          visible={modalBrandVisible}
          vehicleTypes={brands}
          vehicleType={brand}
          onSelect={(value) => {
            setBrand(value);
            setModalBrandVisible(false);
          }}
          onClose={() => setModalBrandVisible(false)}
        />

        <VehicleTypeModal
          visible={modalTypeVisible}
          vehicleTypes={types}
          vehicleType={type}
          onSelect={(value) => {
            setType(value);
            setModalTypeVisible(false);
          }}
          onClose={() => setModalTypeVisible(false)}
        />
      </View>
    </ScrollView>
  );
};

export default RegisterVehicle;