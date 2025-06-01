import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Modal, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const RegisterVehicle = () => {
  const [plate, setPlate] = useState('');
  const [serial, setSerial] = useState('');
  const [year, setYear] = useState('');
  const [owner, setOwner] = useState('');
  const [vehicleType, setVehicleType] = useState('Nissan');
  const [modalVisible, setModalVisible] = useState(false);

  const vehicleTypes = ['Nissan', 'Toyota', 'Chevrolet', 'Ford', 'Hyundai'];

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
                onChangeText={setYear}
              />
            </View>
          </View>

          
          <View className="w-1/2 pl-3">
            <View className="mb-6">
              <Text className="text-blue-700 font-semibold mb-2 text-lg">Propietario</Text>
              <TextInput
                className="border-2 border-blue-200 rounded-xl p-3 bg-white text-lg"
                placeholder="Nombre completo"
                placeholderTextColor="#9CA3AF"
                value={owner}
                onChangeText={setOwner}
              />
            </View>

            <View className="mb-6">
              <Text className="text-blue-700 font-semibold mb-2 text-lg">Tipo</Text>
              <TouchableOpacity
                className="border-2 border-blue-200 rounded-xl p-3 bg-white"
                onPress={() => setModalVisible(true)}
              >
                <Text className="text-lg">{vehicleType || 'Selecciona un tipo'}</Text>
              </TouchableOpacity>
            </View>

            
            <View className="mb-6 opacity-0">
              <Text className="text-lg">Espacio</Text>
            </View>
          </View>
        </View>

       
        <TouchableOpacity 
          className="mt-8 bg-blue-600 rounded-xl py-4"
          activeOpacity={0.7}
          onPress={() => {}}
        >
          <Text className="text-white font-bold text-center text-xl">
            Guardar Vehículo
          </Text>
        </TouchableOpacity>

        
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
}

export default RegisterVehicle; 