import { View, ScrollView, Text } from 'react-native';
import Header from '~/components/Header';
import { Card } from '~/components/Card';
// import { useEffect } from 'react';

const Index = () => {
  return (
    <ScrollView className="m-4 pt-12">
      <Header />
      <View className="mt-12 flex items-center justify-center">
        <Text className="text-4xl font-bold color-white">Manten tu vehiculo en</Text>
        <Text className="text-4xl font-bold color-[#005ee2]">perfecto estado</Text>

        <Text className="mt-5 text-center text-2xl font-light color-white">
          La aplicación más completa para el seguimiento del mantenimiento de tu vehículo. Nunca
          olvides una revisión importante y mantén tu auto funcionando como nuevo.
        </Text>
      </View>

      <Card></Card>
    </ScrollView>
  );
};

export default Index;
