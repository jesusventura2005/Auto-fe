import { Modal, View, Text, Image, Pressable } from 'react-native';
import { useForm } from 'react-hook-form';
import { RegisterInput } from '~/components/RegisterInput';
import Button from '~/components/ButtonCmp';
import { useState } from 'react';

export default function EditProfileModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
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
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white rounded-2xl p-6 w-11/12">
          <Text className="text-xl font-bold text-center mb-4">Edit Your Profile</Text>

          <View className="items-center mb-4">
            <Image
              source={{ uri: 'https://via.placeholder.com/100' }}
              className="w-24 h-24 rounded-full"
            />
          </View>

          {['name', 'email', 'password'].map((field) => (
            <View key={field} className="mb-6">
              <Text className="text-blue-700 font-semibold capitalize mb-1">{field}</Text>
              <RegisterInput
                name={field}
                control={control}
                placeholder={`Enter ${field}`}
                label={''}
                rules={{}} 
              />
            </View>
          ))}

          <Button
            animated
            title="Update Profile"
            onPress={handleSubmit(onSubmit)}
            className="bg-black rounded-xl px-6 py-3 mt-4"
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