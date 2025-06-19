import { Modal, View, Text, Pressable } from 'react-native';
import { useForm } from 'react-hook-form';
import { RegisterInput } from '~/components/forms/RegisterInput';
import { ButtonCmp } from '~/components/ui/ButtonCmp';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';

export default function EditProfileModal({
  visible,
  onClose,
  user,
}: {
  visible: boolean;
  onClose: () => void;
  user?: {
    _id: string;
    name: string;
    email: string;
    password?: string;
  };
}) {
  // Queries and Mutations
  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      _id,
      name,
      email,
      password,
    }: {
      _id: string;
      name: string;
      email: string;
      password: string;
    }) => {
      try {
        const response = await axios.patch(`${process.env.EXPO_PUBLIC_API_URL}/users/${_id}`, {
          name,
          email,
          password,
        });
        return response.data;
      } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
      }
    },
    onSuccess: () => {
      console.log('Profile updated successfully');
      onClose();
    },
    onError: (error) => {
      console.error('Error updating profile:', error);
    },
  });

  const { control, handleSubmit, getValues, reset } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    if (user) {
      // Reset form values when user prop changes
      reset({
        name: user.name || '',
        email: user.email || '',
        password: '',
        confirmPassword: '',
      });
    }
  }, [user, visible, reset]);

  const onSubmit = (data: any) => {
    mutate({
      _id: user?._id || '',
      name: data.name,
      email: data.email,
      password: data.password ? data.password : undefined, // Only send if not empty
    });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 items-center justify-center bg-black/50">
        <View className=" dark:border-color-border-dark dark:bg-color-bg-dark w-11/12 rounded-2xl bg-white p-6 shadow-lg dark:border">
          <Text className="mb-4 text-center text-xl font-bold dark:text-white">
            Edit Your Profile
          </Text>

          <View key={'Name'} className="mb-6">
            <RegisterInput
              name={'name'}
              control={control}
              placeholder={`Enter Name`}
              label={'Name'}
              rules={{
                required: `Name is required`,
              }}
            />
          </View>
          <View key={'Email'} className="mb-6">
            <RegisterInput
              name={'email'}
              control={control}
              placeholder={`Enter email`}
              label={'Email'}
              rules={{
                required: `Email is required`,
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Invalid email format',
                },
              }}
            />
          </View>
          <View key={'Password'} className="mb-6">
            <RegisterInput
              name={'password'}
              control={control}
              placeholder={`Enter password`}
              label={'Password'}
              rules={{
                validate: (value: string) => {
                  if (value && value.length < 6) {
                    return 'Password must be at least 6 characters';
                  }
                  return true;
                },
              }}
            />
          </View>
          <View key={'ConfirmPassword'} className="mb-6">
            <RegisterInput
              name={'ConfirmPassword'}
              control={control}
              placeholder={`Confirm password`}
              label={'Confirm Password'}
              rules={{
                validate: (value: string) => {
                  if (value !== getValues('password')) {
                    return 'Passwords do not match';
                  }
                  return true;
                },
              }}
            />
          </View>

          <ButtonCmp
            animated
            title="Update Profile"
            onPress={handleSubmit(onSubmit)}
            className="bg-color-primary mt-4 rounded-xl px-6 py-3 text-white"
            disabled={isPending}
          />

          <Pressable onPress={onClose} className="mt-4">
            <Text className="text-center text-blue-500">Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
