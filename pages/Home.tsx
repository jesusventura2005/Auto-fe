import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl"></Text>
      <Button title="Presiona aquí" onPress={() => alert('¡Botón presionado!')} />
    </View>
  );
};

export default HomeScreen;
