import { View, Text, TextInput, TextInputProps } from 'react-native';
import { Controller, ControllerProps } from 'react-hook-form';
import { ReactElement } from 'react';

type InputProps = {
  label: string;
  icon?: ReactElement;
  placeholder: string;
} & TextInputProps &
  Pick<ControllerProps<any>, 'control' | 'name' | 'rules'>;

const Input = ({ label, icon, control, name, rules, placeholder, ...props }: InputProps) => (
  <View className="mb-5">
    <Text className="mb-2 font-semibold text-gray-700">{label}</Text>
    <View className="flex-row items-center rounded-xl border border-gray-200 bg-gray-100 px-4">
      {icon}
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            className="flex-1 py-3 text-xl"
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
