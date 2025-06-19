/* eslint-disable react-hooks/rules-of-hooks */
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  useColorScheme,
  Modal,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { ButtonCmp } from '~/components/ui/ButtonCmp';
import { useState } from 'react';
import EditProfileModal from '~/components/modals/EditProfileModal';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '~/context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { JwtPayload } from 'jsonwebtoken';
import { Redirect, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme as useNativeWindColorScheme } from 'nativewind';

export default function ProfileScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [themeMenuVisible, setThemeMenuVisible] = useState(false);
  const { authState, onLogout } = useAuth();
  const colorScheme = useColorScheme();
  const { setColorScheme } = useNativeWindColorScheme();
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');

  console.log('Auth State:', authState?.authenticated);

  if (!authState?.token) {
    return <Redirect href="/" />;
  }

  const decodedToken = jwtDecode<JwtPayload>(authState?.token!);

  const { data: user } = useQuery({
    queryKey: ['user', decodedToken._id],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/users/${decodedToken._id}`
      );
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
      return response.data;
    },
  });

  const handleThemeSelect = (option: 'light' | 'dark' | 'system') => {
    setTheme(option);
    setThemeMenuVisible(false);
    setColorScheme(option);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top']} className="flex-1 bg-blue-50 dark:bg-color-bg-dark">
        <ScrollView
          className="flex"
          contentContainerStyle={{ flexGrow: 1, alignItems: 'center', paddingVertical: 30 }}
          showsVerticalScrollIndicator={false}>
          <View className="w-11/12 items-center rounded-2xl bg-white p-4 shadow-md dark:border dark:border-color-border-dark  dark:bg-color-bg-dark">
            <Text className="mb-4 text-lg font-bold text-gray-900 dark:text-color-title-dark">
              Profile
            </Text>
            <Ionicons
              name="person-circle"
              size={100}
              color={colorScheme === 'dark' ? '#fff' : '#888'}
            />
            <Text className="text-xl font-bold text-gray-800 dark:text-white">{user?.name}</Text>
            <Text className="text-gray-600 dark:text-gray-300">{user?.email}</Text>
            <Text className="mt-1 rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700 dark:bg-blue-900 dark:text-blue-300">
              Vehicle Owner
            </Text>

            <View className="mt-4 w-full">
              <ButtonCmp
                title="Edit Profile"
                onPress={() => setModalVisible(true)}
                animated
                className="rounded-xl bg-color-primary py-2"
                classNameText="text-white text-base text-center"
              />
            </View>
          </View>

          <View className="mt-6 w-11/12 rounded-2xl bg-white p-2 shadow-md dark:border dark:border-color-border-dark  dark:bg-color-bg-dark">
            <Text className="mb-4 text-lg font-bold text-gray-800 dark:text-white">Stats</Text>
            <View className="flex-row justify-between">
              <TouchableOpacity
                onPress={() => router.push('Dashboard')}
                className="mr-2 flex-1 items-center rounded-xl bg-color-primary px-4 py-6 dark:bg-color-primary">
                <Text className="text-xl font-bold text-white dark:text-color-text-dark">
                  {cars?.length}
                </Text>
                <Text className="text-white dark:text-color-title-dark">Vehicles</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="mt-6 w-11/12 rounded-2xl bg-white p-3 shadow-md dark:border dark:border-color-border-dark  dark:bg-color-bg-dark">
            <Text className="mb-4 text-lg font-bold text-gray-800 dark:text-white">Settings</Text>

            <View className="mb-3 flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Ionicons
                  name={theme === 'dark' ? 'moon' : theme === 'light' ? 'sunny' : 'contrast'}
                  size={20}
                  color={colorScheme === 'dark' ? '#fff' : '#222'}
                  style={{ marginRight: 8 }}
                />
                <Text className="text-base text-gray-800 dark:text-white">Theme</Text>
              </View>
              <TouchableOpacity
                onPress={() => setThemeMenuVisible(true)}
                className="rounded-xl border border-gray-300 px-3 py-2 dark:border-gray-600">
                <Ionicons
                  name={theme === 'dark' ? 'moon' : theme === 'light' ? 'sunny' : 'contrast'}
                  size={20}
                  color={colorScheme === 'dark' ? '#fff' : '#222'}
                />
              </TouchableOpacity>
            </View>

            <Modal visible={themeMenuVisible} transparent animationType="fade">
              <View className="flex-1 items-center justify-center bg-black/50">
                <View className="w-56 rounded-lg bg-white p-4 dark:bg-color-bg-dark">
                  {['light', 'dark', 'system'].map((option) => (
                    <TouchableOpacity
                      key={option}
                      onPress={() => handleThemeSelect(option as 'light' | 'dark' | 'system')}
                      className={`rounded px-2 py-2 ${theme === option ? 'bg-blue-100 dark:bg-blue-900' : ''}`}>
                      <Text
                        className={`text-base ${theme === option ? 'font-bold text-blue-700 dark:text-blue-300' : 'text-gray-800 dark:text-white'}`}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                  <TouchableOpacity
                    onPress={() => setThemeMenuVisible(false)}
                    className="mt-2 py-2">
                    <Text className="text-center text-gray-500 dark:text-gray-300">Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <ButtonCmp
              title="Sign Out"
              onPress={() => {
                onLogout?.();
                router.push('/');
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
