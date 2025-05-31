import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'; // <-- Vuelve a importar TouchableOpacity
import { Link } from 'expo-router'; // Import Link from expo-router


const RegisterScreen = () => {
  
  const userType = 'owner'; 

  return (
   
    <ScrollView contentContainerStyle="flex-grow justify-center items-center py-8" className="bg-blue-50">
      <View
        
        className="bg-white rounded-2xl p-6 shadow-lg max-w-md w-[90%]"
      >
        <Text className="text-3xl font-bold text-violet-600 text-center mb-2">Crea tu cuenta</Text>
        <Text className="text-base text-purple-500 text-center mb-8">Únete a nuestra comunidad</Text>

        {/* Name Input */}
        <View className="mb-5">
          <Text className="text-gray-700 font-semibold mb-2">Nombre</Text>
          <View className="flex-row items-center bg-gray-100 rounded-xl px-4 border border-gray-200">
            <Text className="text-gray-400 text-xl mr-2">👤</Text>
            <TextInput
              placeholder="Juan Pérez"
              className="flex-1 py-3 text-lg"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Email Input */}
        <View className="mb-5">
          <Text className="text-gray-700 font-semibold mb-2">Correo electrónico</Text>
          <View className="flex-row items-center bg-gray-100 rounded-xl px-4 border border-gray-200">
            <Text className="text-gray-400 text-xl mr-2">✉️</Text>
            <TextInput
              placeholder="tucorreo@ejemplo.com"
              className="flex-1 py-3 text-lg"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Password Input */}
        <View className="mb-5">
          <Text className="text-gray-700 font-semibold mb-2">Contraseña</Text>
          <View className="flex-row items-center bg-gray-100 rounded-xl px-4 border border-gray-200">
            <Text className="text-gray-400 text-xl mr-2">🔒</Text>
            <TextInput
              placeholder="••••••••"
              className="flex-1 py-3 text-lg"
              secureTextEntry
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Confirm Password Input */}
        <View className="mb-5">
          <Text className="text-gray-700 font-semibold mb-2">Confirmar Contraseña</Text>
          <View className="flex-row items-center bg-gray-100 rounded-xl px-4 border border-gray-200">
            <Text className="text-gray-400 text-xl mr-2">🔒</Text>
            <TextInput
              placeholder="••••••••"
              className="flex-1 py-3 text-lg"
              secureTextEntry
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* User Type Selection - Static due to no useState */}
        <View className="mt-2 mb-6">
          <Text className="text-gray-700 font-semibold mb-3">Soy un:</Text>
          <View className="flex-row justify-between space-x-4">
            {/* TouchableOpacity does not have the ({ pressed }) callback */}
            <TouchableOpacity
              // No onPress to change state
              className={`flex-1 py-3 px-4 rounded-xl border-2 ${
                userType === 'owner' ? 'bg-sky-400 border-sky-500' : 'bg-gray-200 border-gray-300'
              }`}
            >
              <Text
                className={`text-center font-bold text-base ${
                  userType === 'owner' ? 'text-white' : 'text-gray-700'
                }`}
              >
                Propietario de Vehículo
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              // No onPress to change state
              className={`flex-1 py-3 px-4 rounded-xl border-2 ${
                userType === 'mechanic' ? 'bg-sky-400 border-sky-500' : 'bg-gray-200 border-gray-300'
              }`}
            >
              <Text
                className={`text-center font-bold text-base ${
                  userType === 'mechanic' ? 'text-white' : 'text-gray-700'
                }`}
              >
                Mecánico
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Create Account Button - Using Link with TouchableOpacity */}
        <Link href="/" asChild> {/* href="/" for going to the home screen */}
          <TouchableOpacity
            className="bg-pink-400 rounded-xl py-4 mt-4 shadow-md"
            // onPress handler for submission is removed as there's no state to process
            // TouchableOpacity provides its own opacity feedback implicitly
          >
            <Text className="text-white text-center font-bold text-xl">
              Crear cuenta
            </Text>
          </TouchableOpacity>
        </Link>

        {/* Sign In Link - Using Link with TouchableOpacity */}
        <View className="flex-row justify-center mt-6">
          <Text className="text-gray-600 text-base">¿Ya tienes una cuenta? </Text>
          <Link href="/login" asChild> {/* Assuming you have a login screen at /app/login.tsx */}
            <TouchableOpacity>
              <Text className="text-orange-500 font-bold text-base">Iniciar sesión</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;