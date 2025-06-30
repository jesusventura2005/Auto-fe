import { Modal, View, Text, Pressable } from 'react-native';
import { useForm } from 'react-hook-form';
import ButtonCmp from '~/components/ui/ButtonCmp';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import Input from '../ui/Input';
import Toast from 'react-native-toast-message';

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
    lastName: string;
    email: string;
    password?: string;
  };
}) {
  // Queries and Mutations
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      _id,
      name,
      email,
      lastName,
      password,
    }: {
      _id: string;
      name: string;
      lastName: string;
      email: string;
      password: string;
    }) => {
      try {
        const response = await axios.patch(`${process.env.EXPO_PUBLIC_API_URL}/users/${_id}`, {
          name,
          lastName,
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
      Toast.show({
        type: 'success',
        text1: 'Perfil actualizado correctamente',
      });
      queryClient.invalidateQueries({ queryKey: ['user'] });
      onClose();
    },
    onError: (error) => {
      Toast.show({
        type: 'error',
        text1: 'Error actualizando el perfil',
        text2: error instanceof Error ? error.message : 'An unexpected error occurred',
      });
      console.error('Error updating profile:', error);
    },
  });

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitted },
  } = useForm({
    defaultValues: {
      name: user?.name || '',
      lastName: user?.lastName || '',
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
        lastName: user.lastName || '',
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
      lastName: data.lastName,
      email: data.email,
      password: data.password ? data.password : undefined, // Only send if not empty
    });
    if (!isPending) {
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 items-center justify-center bg-black/50">
        <View className=" w-11/12 rounded-2xl bg-white p-6 shadow-lg dark:border dark:border-color-border-dark dark:bg-color-bg-dark">
          <Text className="mb-4 text-center text-xl font-bold dark:text-white">Editar Perfil</Text>

          <View key={'Name'}>
            <Input
              name={'name'}
              control={control}
              placeholder={`Ingresar nombre`}
              label={'Nombre'}
              rules={{
                required: `Nombre es requerido`,
              }}
              error={isSubmitted ? errors.name : undefined}
            />
          </View>
          <View key={'LastName'}>
            <Input
              name={'lastName'}
              control={control}
              placeholder={`Ingresar apellido`}
              label={'Apellido'}
              rules={{
                required: `Apellido es requerido`,
              }}
              error={isSubmitted ? errors.lastName : undefined}
            />
          </View>
          <View key={'Email'}>
            <Input
              name={'email'}
              control={control}
              placeholder={`Ingresar email`}
              label={'Email'}
              rules={{
                required: `Email es requerido`,
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Formato de email inválido',
                },
              }}
              error={isSubmitted ? errors.email : undefined}
            />
          </View>
          <View key={'Password'}>
            <Input
              name={'password'}
              control={control}
              placeholder={`Ingresar contraseña`}
              label={'Contraseña'}
              rules={{
                validate: (value: string) => {
                  if (value && value.length < 6) {
                    return 'La contraseña debe tener al menos 6 caracteres';
                  }
                  return true;
                },
              }}
              error={isSubmitted ? errors.password : undefined}
            />
          </View>
          <View key={'ConfirmPassword'}>
            <Input
              name={'confirmPassword'}
              control={control}
              placeholder={`Confirmar contraseña`}
              label={'Confirmar Contraseña'}
              rules={{
                validate: (value: string) => {
                  if (watch('password') !== value) {
                    return 'Las contraseñas no coinciden';
                  }
                },
              }}
              error={isSubmitted ? errors.confirmPassword : undefined}
            />
          </View>

          <ButtonCmp
            animated
            title="Actualizar Perfil"
            onPress={handleSubmit(onSubmit)}
            className="mt-4 rounded-xl bg-color-primary px-6 py-3 text-white"
            disabled={isPending}
          />

          <Pressable onPress={onClose} className="mt-4" disabled={isPending}>
            <Text className="text-center text-blue-500">Cancelar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
