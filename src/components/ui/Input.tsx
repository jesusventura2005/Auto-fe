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
  isNumeric?: boolean;
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
  isNumeric,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="mb-5 ">
      <Text className="mb-2 font-semibold text-color-text dark:text-color-text-dark">{label}</Text>
      <View
        className={` flex-row items-center rounded-xl border bg-color-bg px-4 py-3 dark:border-color-border-dark dark:bg-color-bg-dark ${
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
                keyboardType={isNumeric ? 'numeric' : 'default'}
                value={value}
                onChangeText={onChange}
                onBlur={() => {
                  onBlur();
                  setIsFocused(false);
                }}
                onFocus={() => setIsFocused(true)}
                className="flex-1 text-xl  leading-[20px] dark:text-color-text-dark   "
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
      {error && <Text className="mt-2 text-sm text-color-alert">{error?.message}</Text>}
    </View>
  );
};

export default Input;
