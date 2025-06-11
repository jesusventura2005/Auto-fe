import { View } from 'react-native';
import TabBarButtonCustom from './TabBarButtonCustom';
import Home from '../assets/home.svg';
import Maintenance from '../assets/maintenance.svg';
import User from '../assets/user.svg';
import Checklist from '../assets/checklist.svg';

const VISIBLE_TABS = [
  'index',
  '(home)/(maintenance)/maintenanceLog',
  '(home)/(maintenance)/RegisterVehicle',
  'checklist',
  'profile',
];

const TabBar = ({ state, descriptors, navigation }: any) => {
  const visibleRoutes = state.routes.filter((route: any) => VISIBLE_TABS.includes(route.name));

  return (
    <View
      className="absolute bottom-10 mx-5 w-11/12 flex-1
     flex-row items-center justify-between rounded-3xl bg-white p-4 
     shadow-md shadow-black 
     
    ">
      {visibleRoutes.map((route: any, index: any) => {
        const { options } = descriptors[route.key];
        const label =
          options.taBarLabel !== undefined
            ? options.tarBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

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
            text={`${label === '+' ? 'text-4xl text-white' : isFocused ? ' text-[8px] text-blue-600' : 'text-[8px]'}`}
            key={index}
            className={` w-[55px]  rounded-full ${
              label === '+'
                ? 'bottom-2 flex  h-[55px] items-center  justify-center bg-blue-600 shadow-xl shadow-blue-500'
                : isFocused
                  ? 'color-blue-600'
                  : 'bg-transparent'
            }`}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.taBarLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            label={label}
            isFocused={isFocused}
            icon={
              label === 'Home' ? (
                <Home width={24} height={24} stroke={isFocused ? '#2563eb' : '#000000'} />
              ) : label === 'Maintenance' ? (
                <Maintenance width={24} height={24} stroke={isFocused ? '#2563eb' : '#000000'} />
              ) : label === 'Profile' ? (
                <User width={24} height={24} stroke={isFocused ? '#2563eb' : '#000000'} />
              ) : label === 'Checklist' ? (
                <Checklist width={24} height={24} stroke={isFocused ? '#2563eb' : '#000000'} />
              ) : (
                label
              )
            }
          />
        );
      })}
    </View>
  );
};

export default TabBar;
