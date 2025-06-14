import { View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import TabBarButtonCustom from './TabBarButtonCustom';


const VISIBLE_TABS = [
  '(home)/Dashboard',
  '(home)/(maintenance)/maintenanceLog',
  '(home)/(maintenance)/RegisterVehicle',
  'profile',
  'checklist',
];

const noVisibleScreens = ['(auth)/register', '(auth)/login', 'index'];

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const visibleRoutes = state.routes.filter((route) => VISIBLE_TABS.includes(route.name));
  const currentRoute = state.routes[state.index];
  const shouldHide = noVisibleScreens.includes(currentRoute.name);

  if (shouldHide) {
    return null;
  }

  return (
    <View
      className={`absolute bottom-10 mx-5 w-11/12 flex-1
     flex-row items-center justify-between rounded-3xl bg-white p-4 shadow-md 
     shadow-black blur-xl `}>
      {visibleRoutes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? String(options.tabBarLabel)
            : options.title !== undefined
              ? String(options.title)
              : String(route.name);

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
  );
};

export default TabBar;
