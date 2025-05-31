import { View, Text, TextInput, TextInputProps } from 'react-native';

type InputProps = {
  label: string;
  icon?: string;
} & TextInputProps;

const Input = ({ label, icon, ...props }: InputProps) => (
  <View className="mb-5">
    <Text className="text-gray-700 font-semibold mb-2">{label}</Text>
    <View className="flex-row items-center bg-gray-100 rounded-xl px-4 border border-gray-200">
      {icon && <Text className="text-gray-400 text-xl mr-2">{icon}</Text>}
      <TextInput
        className="flex-1 py-3 text-lg"
        placeholderTextColor="#999"
        {...props}
      />
    </View>
  </View>
);

export default Input;