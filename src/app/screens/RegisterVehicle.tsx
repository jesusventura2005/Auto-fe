import React, { useState, useRef } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Modal, Dimensions, Animated, Alert} from 'react-native';

const { width } = Dimensions.get('window');

const RegisterVehicle = () => {
  const [plate, setPlate] = useState('');
  const [serial, setSerial] = useState('');
  const [year, setYear] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [vehicleType, setVehicleType] = useState('Nissan');
  const [modalVisible, setModalVisible] = useState(false);

  const vehicleTypes = ['Nissan', 'Toyota', 'Chevrolet', 'Ford', 'Hyundai'];

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const validateInputs = () => {
    const fields = [
      { label: 'Placa', value: plate },
      { label: 'Serial', value: serial },
      { label: 'Año', value: year },
      { label: 'Nombre', value: name },
      { label: 'Apellido', value: surname },
    ];

    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>_\-+=\\[\];'/`~]/;

    for (let field of fields) {
      if (!field.value || field.value.trim() === '') {
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

  return (
    <ScrollView className="flex-1 bg-blue-50" contentContainerStyle={{ paddingVertical: 30 }}>
      <View className="bg-white rounded-2xl shadow-lg mx-6 p-8" style={{ minHeight: width * 0.9 }}>
        <Text className="text-3xl font-bold text-blue-800 mb-8 text-center">
          Agregar Vehículo
        </Text>

        <View className="flex-row flex-wrap">
          <View className="w-1/2 pr-3">
            <View className="mb-6">
              <Text className="text-blue-700 font-semibold mb-2 text-lg">Placa</Text>
              <TextInput
                className="border-2 border-blue-200 rounded-xl p-3 bg-white text-lg"
                placeholder="ABC123"
                placeholderTextColor="#9CA3AF"
                value={plate}
                onChangeText={setPlate}
              />
            </View>

            <View className="mb-6">
              <Text className="text-blue-700 font-semibold mb-2 text-lg">Serial</Text>
              <TextInput
                className="border-2 border-blue-200 rounded-xl p-3 bg-white text-lg"
                placeholder="123456789"
                placeholderTextColor="#9CA3AF"
                value={serial}
                onChangeText={setSerial}
              />
            </View>

            <View className="mb-6">
              <Text className="text-blue-700 font-semibold mb-2 text-lg">Año</Text>
              <TextInput
                className="border-2 border-blue-200 rounded-xl p-3 bg-white text-lg"
                placeholder="XXXX"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                value={year}
                maxLength={4}
                onChangeText={(text) => {
                  const filtered = text.replace(/[^0-9]/g, '');
                  setYear(filtered.slice(0, 4));
                }}
              />
            </View>
          </View>

          <View className="w-1/2 pl-3">
            <View className="mb-6">
              <Text className="text-blue-700 font-semibold mb-2 text-lg">Nombre</Text>
              <TextInput
                className="border-2 border-blue-200 rounded-xl p-3 bg-white text-lg"
                placeholder="Nombre"
                placeholderTextColor="#9CA3AF"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View className="mb-6">
              <Text className="text-blue-700 font-semibold mb-2 text-lg">Apellido</Text>
              <TextInput
                className="border-2 border-blue-200 rounded-xl p-3 bg-white text-lg"
                placeholder="Apellido"
                placeholderTextColor="#9CA3AF"
                value={surname}
                onChangeText={setSurname}
              />
            </View>

            <View className="mb-6">
              <Text className="text-blue-700 font-semibold mb-2 text-lg">Tipo</Text>
              <TouchableOpacity
                className="border-2 border-blue-200 rounded-xl p-3 bg-white flex-row justify-between items-center"
                onPress={() => setModalVisible(true)}
              >
                <Text className="text-lg">{vehicleType || 'Selecciona un tipo'}</Text>
                <Text className="text-lg text-gray-500">▼</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => {
              if (validateInputs()) {
                Alert.alert('Éxito', 'Vehículo guardado correctamente.');
              }
            }}
            className="mt-8 bg-blue-600 rounded-xl py-4"
          >
            <Text className="text-white font-bold text-center text-xl">
              Guardar Vehículo
            </Text>
          </TouchableOpacity>
        </Animated.View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View className="flex-1 justify-center items-center bg-black/70">
            <View className="bg-white rounded-2xl w-5/6 p-6">
              <Text className="text-2xl font-bold text-blue-800 mb-6 text-center">
                Selecciona el tipo
              </Text>
              {vehicleTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  className={`py-4 px-5 mb-2 rounded-lg ${vehicleType === type ? 'bg-blue-100' : 'bg-white'}`}
                  onPress={() => {
                    setVehicleType(type);
                    setModalVisible(false);
                  }}
                >
                  <Text className="text-gray-800 text-lg">{type}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                className="mt-6 py-3 bg-blue-600 rounded-lg"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-white text-center text-lg">Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default RegisterVehicle;