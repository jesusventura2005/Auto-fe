import { View , Text , TextInput , TextInputProps } from "react-native"
import { Controller , ControllerProps } from "react-hook-form"


type InputProps = {
    label: string;
    icon?: string;
    placeholder: string;
  } & TextInputProps &
    Pick<ControllerProps<any>, 'control' | 'name' | 'rules'>;



export const RegisterInput = ({name , control , placeholder, label}: InputProps) => {
  return (

    <View >
    <Text className="text-lg font-semibold text-blue-700">{label}</Text>
    <Controller
      control={control}
      name={name}
      render={({ field: { value , onChange ,onBlur } }) => (
        <TextInput
          className="rounded-xl border-2 border-blue-200 bg-white p-3 text-lg"
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          onBlur={onBlur}
          value={value}
          onChangeText={onChange}
        />
      )}></Controller>
  </View>
  )
}
