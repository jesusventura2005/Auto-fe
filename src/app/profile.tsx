import { ScrollView, Text, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Button from '~/components/ButtonCmp';
import { useState } from 'react';
import EditProfileModal from '~/components/EditProfileModal';

export default function ProfileScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  const vehiclesCount = 2;
  const checklistCount = 15;

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top']} className="flex-1 bg-blue-50">
        <ScrollView
          className="flex"
          contentContainerStyle={{ flexGrow: 1, alignItems: 'center', paddingVertical: 30 }}
          showsVerticalScrollIndicator={false}
        >

          <View className="w-11/12 bg-white rounded-2xl p-4 items-center shadow-md">
            <Text className="text-lg font-bold text-gray-800 mb-4">Profile</Text>
            <Image
              source={{ uri: 'https://via.placeholder.com/100' }}
              className="w-24 h-24 rounded-full mb-4"
            />
            <Text className="text-xl font-bold text-gray-800">John Doe</Text>
            <Text className="text-gray-600">john.doe@example.com</Text>
            <Text className="text-xs mt-1 text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
              Vehicle Owner
            </Text>

            <View className="mt-4 w-full">
              <Button
                title="Edit Profile"
                onPress={() => setModalVisible(true)}
                animated
                className="bg-blue-500 py-2 rounded-xl"
                classNameText="text-white text-base text-center"
              />
            </View>
          </View>

          <View className="w-11/12 bg-white rounded-2xl p-2 shadow-md mt-6">
            <Text className="text-lg font-bold text-gray-800 mb-4">Stats</Text>
            <View className="flex-row justify-between">
              <View className="bg-blue-100 px-4 py-6 rounded-xl items-center flex-1 mr-2">
                <Text className="text-blue-600 font-bold text-xl">{vehiclesCount}</Text>
                <Text className="text-gray-500">Vehicles</Text>
              </View>
              <View className="bg-blue-100 px-4 py-6 rounded-xl items-center flex-1 ml-2">
                <Text className="text-blue-600 font-bold text-xl">{checklistCount}</Text>
                <Text className="text-gray-500">Completed Tasks</Text>
              </View>
            </View>
          </View>

          <View className="w-11/12 bg-white rounded-2xl p-3 shadow-md mt-6">
            <Text className="text-lg font-bold text-gray-800 mb-4">Settings</Text>

            <TouchableOpacity className="flex-row items-center py-3 border-b border-gray-100">
              <Text className="text-gray-700">🌙  Theme</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center py-3 border-b border-gray-100">
              <Text className="text-gray-700">⚙️  App Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center py-4">
              <Text className="text-gray-700">👤  Account Information</Text>
            </TouchableOpacity>
            <Button
              title="Sign Out"
              onPress={() => console.log('logout')}
              animated
              className="bg-red-500 py-4 rounded-2xl"
              classNameText="text-white text-base text-center"
            />
          </View>

          <EditProfileModal visible={modalVisible} onClose={() => setModalVisible(false)} />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
