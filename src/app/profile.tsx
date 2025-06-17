import { ScrollView, Text, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Button from '~/components/ButtonCmp';
import { useState } from 'react';
import EditProfileModal from '~/components/EditProfileModal';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '~/context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { JwtPayload } from 'jsonwebtoken';

export default function ProfileScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const { authState, onLogout } = useAuth();

  const decodedToken = jwtDecode<JwtPayload>(authState?.token!);

  const { data: user } = useQuery({
    queryKey: ['user', decodedToken._id],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/users/${decodedToken._id}`
      );
      console.log('User data:', response);
      return response.data;
    },
    enabled: !!decodedToken._id,
  });

  const { data: cars } = useQuery({
    queryKey: ['cars', decodedToken._id],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/cars/${decodedToken._id}`
      );
      console.log('Cars data:', response);
      return response.data;
    },
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top']} className="flex-1 bg-blue-50">
        <ScrollView
          className="flex"
          contentContainerStyle={{ flexGrow: 1, alignItems: 'center', paddingVertical: 30 }}
          showsVerticalScrollIndicator={false}>
          <View className="w-11/12 items-center rounded-2xl bg-white p-4 shadow-md">
            <Text className="mb-4 text-lg font-bold text-gray-800">Profile</Text>
            <Image
              source={{ uri: 'https://via.placeholder.com/100' }}
              className="mb-4 h-24 w-24 rounded-full"
            />
            <Text className="text-xl font-bold text-gray-800">{user?.name}</Text>
            <Text className="text-gray-600">{user?.email}</Text>
            <Text className="mt-1 rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700">
              Vehicle Owner
            </Text>

            <View className="mt-4 w-full">
              <Button
                title="Edit Profile"
                onPress={() => setModalVisible(true)}
                animated
                className="rounded-xl bg-blue-500 py-2"
                classNameText="text-white text-base text-center"
              />
            </View>
          </View>

          <View className="mt-6 w-11/12 rounded-2xl bg-white p-2 shadow-md">
            <Text className="mb-4 text-lg font-bold text-gray-800">Stats</Text>
            <View className="flex-row justify-between">
              <View className="mr-2 flex-1 items-center rounded-xl bg-blue-100 px-4 py-6">
                <Text className="text-xl font-bold text-blue-600">{cars?.length}</Text>
                <Text className="text-gray-500">Vehicles</Text>
              </View>
            </View>
          </View>

          <View className="mt-6 w-11/12 rounded-2xl bg-white p-3 shadow-md">
            <Text className="mb-4 text-lg font-bold text-gray-800">Settings</Text>

            <TouchableOpacity className="flex-row items-center border-b border-gray-100 py-3">
              <Text className="text-gray-700">🌙 Theme</Text>
            </TouchableOpacity>

            <Button
              title="Sign Out"
              onPress={() => {
                // onLogout?.();
                // router.push('/');
                console.log('Sign Out pressed');
              }}
              animated
              className="rounded-2xl bg-red-500 py-4"
              classNameText="text-white text-base text-center"
            />
          </View>

          <EditProfileModal visible={modalVisible} onClose={() => setModalVisible(false)} />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
