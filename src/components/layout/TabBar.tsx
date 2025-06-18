import { Modal, TouchableOpacity, View, Text } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import TabBarButtonCustom from './TabBarButtonCustom';
import { useState } from 'react';

const VISIBLE_TABS = ['maintenance/[id]', 'profile', 'details/[id]', 'checklist'];

const noVisibleScreens = ['(auth)/register', '(auth)/login', 'index', 'Dashboard'];

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const visibleRoutes = state.routes.filter((route) => VISIBLE_TABS.includes(route.name));
  const currentRoute = state.routes[state.index];
  const shouldHide = noVisibleScreens.includes(currentRoute.name);
  const [modalVisible, setModalVisible] = useState(false);

  if (shouldHide) {
    return null;
  }

  const leftRoutes = visibleRoutes.slice(0, 2);
  const rightRoutes = visibleRoutes.slice(2);

  return (
    <>
      <View
        className={`absolute bottom-10 mx-5 w-11/12 flex-1
       flex-row items-center justify-between rounded-3xl bg-white p-4 shadow-md shadow-black blur-xl dark:border 
       dark:border-color-border-dark dark:bg-color-bg-dark `}>
        <View className="flex-row items-center">
          {leftRoutes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? String(options.tabBarLabel)
                : options.title !== undefined
                  ? String(options.title)
                  : String(route.name);

            const isFocused = state.index === state.routes.findIndex((r) => r.name === route.name);

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            return (
              <TabBarButtonCustom
                text={`${isFocused ? ' text-[8px] text-blue-600' : 'text-[8px] dark:text-[#ffffff] '}`}
                key={index}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarLabel ? String(options.tabBarLabel) : undefined}
                onPress={onPress}
                onLongPress={onLongPress}
                label={label}
                isFocused={isFocused}
              />
            );
          })}
        </View>

        <TabBarButtonCustom
          text="text-4xl text-white dark:text-white"
          accessibilityLabel="Add new item"
          testID="add-button"
          onPress={() => setModalVisible(true)}
          onLongPress={() => {}}
          label="+"
          isFocused={false}
        />

        <View className="flex-row items-center">
          {rightRoutes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? String(options.tabBarLabel)
                : options.title !== undefined
                  ? String(options.title)
                  : String(route.name);

            const isFocused = state.index === state.routes.findIndex((r) => r.name === route.name);

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            return (
              <TabBarButtonCustom
                text={`${isFocused ? ' text-[8px] text-blue-600' : 'text-[8px] dark:text-[#ffffff] '}`}
                key={index + leftRoutes.length}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarLabel ? String(options.tabBarLabel) : undefined}
                onPress={onPress}
                onLongPress={onLongPress}
                label={label}
                isFocused={isFocused}
              />
            );
          })}
        </View>
      </View>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View className="flex-1 items-center justify-center bg-black/50">
          <View className="w-80 rounded-lg bg-white p-6 dark:bg-color-bg-dark">
            <Text className="mb-4 text-center text-lg font-semibold text-gray-800 dark:text-white">
              ¿Qué quieres hacer?
            </Text>

            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('RegisterVehicle');
              }}
              className="mb-3 rounded-lg bg-blue-600 py-3">
              <Text className="text-center font-medium text-white">Registrar Vehículo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
              }}
              className="mb-3 rounded-lg bg-gray-200 py-3 dark:bg-gray-700">
              <Text className="text-center font-medium text-gray-800 dark:text-white">
                Agregar Mantenimiento
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)} className="mt-2 py-2">
              <Text className="text-center text-gray-500 dark:text-gray-300">Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default TabBar;
