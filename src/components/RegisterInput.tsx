import { View , Text , TextInput , TextInputProps } from 'react-native';
import { Controller , ControllerProps, useFormState, FieldError } from 'react-hook-form';

type InputProps = {
  label: string;
  icon?: string;
  placeholder: string;
} & TextInputProps &
  Pick<ControllerProps<any>, 'control' | 'name' | 'rules'>;

export const RegisterInput = ({ name, control, placeholder, label, rules, editable = true }: InputProps) => {
  const { errors } = useFormState({ control });
  const rawError = errors[name];
  const error = rawError as FieldError | undefined;

  return (
    <View>
      {label ? <Text className="text-lg font-semibold text-blue-700">{label}</Text> : null}
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            className="rounded-xl border-2 border-blue-200 bg-white p-3 text-lg"
            placeholder={placeholder}
            placeholderTextColor="#9CA3AF"
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
            editable={editable}
          />
        )}
      />
      {error?.message && (
        <Text className="text-red-500 text-sm">{error.message}</Text>
      )}
    </View>
  );
};