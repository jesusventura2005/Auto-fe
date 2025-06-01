import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import Input from '../../components/Input';
import Button from '../../components/Button';

const userType = 'owner';

const RegisterScreen = () => {
  return (
    <ScrollView
      className="bg-blue-50"
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 32 }}
    >
      <View className="bg-white rounded-2xl p-6 shadow-lg max-w-md w-[90%]">
        <Text className="text-3xl font-bold text-violet-600 text-center mb-2">Crea tu cuenta</Text>
        <Text className="text-base text-purple-500 text-center mb-8">Únete a nuestra comunidad</Text>
{/* 
        <Input
          label="Nombre"
          icon="👤"
          placeholder="Juan Pérez"
        />
        <Input
          label="Correo electrónico"
          icon="✉️"
          placeholder="tucorreo@ejemplo.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input
          label="Contraseña"
          icon="🔒"
          placeholder="••••••••"
          secureTextEntry
        />
        <Input
          label="Confirmar Contraseña"
          icon="🔒"
          placeholder="••••••••"
          secureTextEntry
        /> */}

        <View className="mt-2 mb-6">
          <Text className="text-gray-700 font-semibold mb-3">Soy un:</Text>
          <View className="flex-row justify-between space-x-4">
            <TouchableOpacity
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

        <Link href="/" asChild>
          <Button title="Crear cuenta" />
        </Link>

        <View className="flex-row justify-center mt-6">
          <Text className="text-gray-600 text-base">¿Ya tienes una cuenta? </Text>
          <Link href="/screens/Login" asChild>
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