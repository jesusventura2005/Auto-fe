import { View, Text, TextInput, TextInputProps } from 'react-native';
import { Controller, ControllerProps } from 'react-hook-form';

type InputProps = {
  label: string;
  icon?: string;
  placeholder: string;
} & TextInputProps &
  Pick<ControllerProps, 'control' | 'name'>;

const Input = ({ label, icon, control, name, placeholder, ...props }: InputProps) => (
  <View className="mb-5">
    <Text className="mb-2 font-semibold text-gray-700">{label}</Text>
    <View className="flex-row items-center rounded-xl border border-gray-200 bg-gray-100 px-4">
      {icon && <Text className="mr-2 text-xl text-gray-400">{icon}</Text>}
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            className="flex-1 py-3 text-lg"
            placeholder={placeholder}
            placeholderTextColor="#999"
            {...props}
          />
        )}
      />
    </View>
  </View>
);

export default Input;
