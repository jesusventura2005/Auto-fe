import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import Input from '../../components/Input';
import Button from '../../components/Button';

const LoginScreen = () => {
  return (
    <ScrollView
      className="bg-blue-50"
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 32 }}
    >
      <View className="bg-white rounded-2xl p-6 shadow-lg max-w-md w-[90%]">
        <Text className="text-3xl font-bold text-violet-600 text-center mb-2">Iniciar sesión</Text>
        <Text className="text-base text-purple-500 text-center mb-8">Bienvenido de nuevo</Text>

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

        <Link href="/" asChild>
          <Button title="Entrar" />
        </Link>

        <View className="flex-row justify-center mt-6">
          <Text className="text-gray-600 text-base">¿No tienes una cuenta? </Text>
          <Link href="/screens/Register" asChild>
            <TouchableOpacity>
              <Text className="text-orange-500 font-bold text-base">Regístrate</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;