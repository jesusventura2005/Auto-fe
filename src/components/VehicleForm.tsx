import { View, Text, TextInput, TouchableOpacity } from 'react-native';

type Props = {
  plate: string;
  serial: string;
  year: string;
  model: string;
  brand: string;
  type: string;
  setPlate: (val: string) => void;
  setSerial: (val: string) => void;
  setYear: (val: string) => void;
  setModel: (val: string) => void;
  onBrandPress: () => void;
  onTypePress: () => void;
};

export const VehicleForm = ({
  plate,
  serial,
  year,
  model,
  brand,
  type,
  setPlate,
  setSerial,
  setYear,
  setModel,
  onBrandPress,
  onTypePress
}: Props) => (
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
          maxLength={4}
          value={year}
          onChangeText={(text) => {
            const filtered = text.replace(/[^0-9]/g, '');
            setYear(filtered.slice(0, 4));
          }}
        />
      </View>
    </View>

    <View className="w-1/2 pl-3">
      
      <View className="mb-6">
        <Text className="text-blue-700 font-semibold mb-2 text-lg">Marca</Text>
        <TouchableOpacity
          className="border-2 border-blue-200 rounded-xl p-3 bg-white flex-row justify-between items-center"
          onPress={onBrandPress}
        >
          <Text className="text-lg">{brand || 'Selecciona una marca'}</Text>
          <Text className="text-lg text-gray-500">▼</Text>
        </TouchableOpacity>
      </View>

      
      <View className="mb-6">
        <Text className="text-blue-700 font-semibold mb-2 text-lg">Tipo</Text>
        <TouchableOpacity
          className="border-2 border-blue-200 rounded-xl p-3 bg-white flex-row justify-between items-center"
          onPress={onTypePress}
        >
          <Text className="text-lg">{type || 'Selecciona un tipo'}</Text>
          <Text className="text-lg text-gray-500">▼</Text>
        </TouchableOpacity>
      </View>

      
      <View className="mb-6">
        <Text className="text-blue-700 font-semibold mb-2 text-lg">Modelo</Text>
        <TextInput
          className="border-2 border-blue-200 rounded-xl p-3 bg-white text-lg"
          placeholder="Ej: Sentra"
          placeholderTextColor="#9CA3AF"
          value={model}
          onChangeText={setModel}
        />
      </View>
    </View>
  </View>
);