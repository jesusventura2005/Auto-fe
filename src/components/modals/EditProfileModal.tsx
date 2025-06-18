import { Modal, View, Text, Image, Pressable } from 'react-native';
import { useForm } from 'react-hook-form';
import { RegisterInput } from '~/components/forms/RegisterInput';
import { ButtonCmp } from '~/components/ui/ButtonCmp';
import { useState } from 'react';

export default function EditProfileModal({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '',
    },
  });

  const [editable, setEditable] = useState({
    name: false,
    email: false,
    password: false,
  });

  const onSubmit = (data: any) => {
    console.log('Profile updated:', data);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 items-center justify-center bg-black/50">
        <View className="w-11/12 rounded-2xl bg-white p-6">
          <Text className="mb-4 text-center text-xl font-bold">Edit Your Profile</Text>

          <View className="mb-4 items-center">
            <Image
              source={{ uri: 'https://via.placeholder.com/100' }}
              className="h-24 w-24 rounded-full"
            />
          </View>

          {['name', 'email', 'password'].map((field) => (
            <View key={field} className="mb-6">
              <Text className="mb-1 font-semibold capitalize text-blue-700">{field}</Text>
              <RegisterInput
                name={field}
                control={control}
                placeholder={`Enter ${field}`}
                label={''}
                rules={{}}
              />
            </View>
          ))}

          <ButtonCmp
            animated
            title="Update Profile"
            onPress={handleSubmit(onSubmit)}
            className="mt-4 rounded-xl bg-black px-6 py-3"
            classNameText="text-white"
          />

          <Pressable onPress={onClose} className="mt-4">
            <Text className="text-center text-blue-500">Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
