import { View, ScrollView, Text, Image } from 'react-native';
import { Link } from 'expo-router';
import { ButtonCmp } from '~/components/ui/ButtonCmp';

const Index = () => {

  return (
    <ScrollView
      className="bg-color-bg dark:bg-color-bg-dark pb-32"
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image className="w-26 h-26 mb-4" source={require('../../assets/carIcon.png')} />
      <Text className="mb-2 text-center text-6xl font-extrabold text-color-primary">Auto</Text>
      <Text className="mb-6 text-center text-xl text-purple-500">Bienvenidos a nuestro app</Text>

      <Text className="text-color-text dark:text-color-text-dark mb-1 text-center text-3xl font-bold">
        Mantén tu vehículo en
      </Text>
      <Text className="mb-6 text-center text-3xl font-bold text-color-primary">perfecto estado</Text>

      <Text className="mb-8 text-center text-lg font-light text-gray-700 dark:text-color-text-dark">
        La aplicación más completa para el seguimiento del mantenimiento de tu vehículo. Nunca
        olvides una revisión importante y mantén tu auto funcionando como nuevo.
      </Text>

      <View className="mb-2 w-full flex-col items-center gap-4">
        <Link href="/(auth)/login" asChild>
          <ButtonCmp title="Iniciar sesión" className="w-64 rounded-3xl bg-color-primary/80 py-5 text-lg" />
        </Link>
        <Link href="/(auth)/register" asChild>
          <ButtonCmp title="Registrarse" className="w-64 rounded-3xl bg-color-secondary py-5 text-lg" />
        </Link>
      </View>
    </ScrollView>
  );
};

export default Index;
