import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

const RegisterScreen = () => {
  const [userType, setUserType] = useState<'owner' | 'mechanic'>('owner');

  return (
    <View className="flex-1 bg-white p-6">
      <View className="space-y-4">
        {/* Name Input */}
        <View>
          <Text className="text-gray-700 mb-2">Nombre</Text>
          <View className="bg-gray-50 rounded-lg flex-row items-center px-4">
            <Text className="text-gray-400 mr-2">👤</Text>
            <TextInput
              placeholder="Juan Pérez"
              className="flex-1 py-3"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Email Input */}
        <View>
          <Text className="text-gray-700 mb-2">Correo electrónico</Text>
          <View className="bg-gray-50 rounded-lg flex-row items-center px-4">
            <Text className="text-gray-400 mr-2">✉️</Text>
            <TextInput
              placeholder="tucorreo@ejemplo.com"
              className="flex-1 py-3"
              keyboardType="email-address"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Password Input */}
        <View>
          <Text className="text-gray-700 mb-2">Contraseña</Text>
          <View className="bg-gray-50 rounded-lg flex-row items-center px-4">
            <Text className="text-gray-400 mr-2">🔒</Text>
            <TextInput
              placeholder="••••••••"
              className="flex-1 py-3"
              secureTextEntry
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Confirm Password Input */}
        <View>
          <Text className="text-gray-700 mb-2">Confirmar Contraseña</Text>
          <View className="bg-gray-50 rounded-lg flex-row items-center px-4">
            <Text className="text-gray-400 mr-2">🔒</Text>
            <TextInput
              placeholder="••••••••"
              className="flex-1 py-3"
              secureTextEntry
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* User Type Selection */}
        <View className="mt-4">
          <Text className="text-gray-700 mb-2">Soy un:</Text>
          <View className="flex-row space-x-4">
            <TouchableOpacity
              onPress={() => setUserType('owner')}
              className={`flex-1 py-2 px-4 rounded-lg ${
                userType === 'owner' ? 'bg-blue-500' : 'bg-gray-200'
              }`}
            >
              <Text
                className={`text-center ${
                  userType === 'owner' ? 'text-white' : 'text-gray-700'
                }`}
              >
                Propietario de Vehículo
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setUserType('mechanic')}
              className={`flex-1 py-2 px-4 rounded-lg ${
                userType === 'mechanic' ? 'bg-blue-500' : 'bg-gray-200'
              }`}
            >
              <Text
                className={`text-center ${
                  userType === 'mechanic' ? 'text-white' : 'text-gray-700'
                }`}
              >
                Mecánico
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Create Account Button */}
        <TouchableOpacity className="bg-blue-500 rounded-lg py-4 mt-6">
          <Text className="text-white text-center font-semibold">
            Crear cuenta
          </Text>
        </TouchableOpacity>

        {/* Sign In Link */}
        <View className="flex-row justify-center mt-4">
          <Text className="text-gray-600">¿Ya tienes una cuenta? </Text>
          <TouchableOpacity>
            <Text className="text-blue-500">Iniciar sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen; 