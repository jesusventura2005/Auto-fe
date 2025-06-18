import { View, Text, TextInput, TextInputProps, TouchableOpacity } from 'react-native';
import { Controller, ControllerProps, FieldError } from 'react-hook-form';
import { ReactElement, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

type InputProps = {
  label: string;
  icon?: ReactElement;
  placeholder: string;
  error?: FieldError;
  secureTextEntry?: boolean;
} & TextInputProps &
  Pick<ControllerProps<any>, 'control' | 'name' | 'rules'>;

const Input = ({
  label,
  icon,
  control,
  name,
  rules,
  placeholder,
  error,
  secureTextEntry,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="mb-5 ">
      <Text className="text-color-text dark:text-color-text-dark mb-2 font-semibold">{label}</Text>
      <View
        className={` py-3 bg-color-bg dark:bg-color-bg-dark flex-row items-center rounded-xl border dark:border-color-border-dark px-4 ${
          isFocused ? 'border-color-secondary dark:border-color-secondary' : 'border-gray-200'
        }`}>
        {icon}
        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({ field: { value, onChange, onBlur } }) => (
            <>
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={() => {
                  onBlur();
                  setIsFocused(false);
                }}
                onFocus={() => setIsFocused(true)}
                className="flex-1 leading-[20px]  text-xl dark:text-color-text-dark   "
                placeholder={placeholder}
                placeholderTextColor="#999"
                secureTextEntry={secureTextEntry && !showPassword}
                {...props}
              />
              {secureTextEntry && (
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  className="ml-2"
                  accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}>
                  <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="#999" />
                </TouchableOpacity>
              )}
            </>
          )}
        />
      </View>
      {error && <Text className="text-color-alert mt-2 text-sm">{error?.message}</Text>}
    </View>
  );
};

export default Input;
