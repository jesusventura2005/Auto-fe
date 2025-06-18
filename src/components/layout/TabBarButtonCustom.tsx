import { TouchableOpacity, Text, View , useColorScheme } from 'react-native';
import Home from '../../assets/home.svg';
import Maintenance from '../../assets/maintenance.svg';
import User from '../../assets/user.svg';
import Checklist from '../../assets/checklist.svg';


interface TabBarButtonCustomProps {
  label: string;
  isFocused?: boolean;
  accessibilityLabel?: string;
  testID?: string;
  onPress?: () => void;
  onLongPress?: () => void;
  text: string;
}

const TabBarButtonCustom = ({
  label,
  isFocused,
  accessibilityLabel,
  testID,
  onPress,
  onLongPress,
  text,
}: TabBarButtonCustomProps) => {
  const textLabel = label;
  const colorScheme = useColorScheme();

  return (
    <TouchableOpacity
      className={`w-[55px]  rounded-full ${
        label === '+'
          ? 'bottom-2 flex  h-[55px] items-center  justify-center bg-blue-600 shadow-md shadow-blue-500'
          : isFocused
            ? 'color-blue-600'
            : 'bg-transparent'
      }`}
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      onPress={onPress}
      onLongPress={onLongPress}>
      <View className="flex items-center">
        {textLabel === 'Home' ? (
          <Home
            width={24}
            height={24}
            stroke={isFocused ? '#2563eb' : colorScheme === 'dark' ? '#ffffff' : '#000000'}
          />
        ) : textLabel === 'Maintenance' ? (
          <Maintenance
            width={24}
            height={24}
            stroke={isFocused ? '#2563eb' : colorScheme === 'dark' ? '#ffffff' : '#000000'}
          />
        ) : textLabel === 'Profile' ? (
          <User
            width={24}
            height={24}
            stroke={isFocused ? '#2563eb' : colorScheme === 'dark' ? '#ffffff' : '#000000'}
          />
        ) : textLabel === 'Checklist' ? (
          <Checklist
            width={24}
            height={24}
            stroke={isFocused ? '#2563eb' : colorScheme === 'dark' ? '#ffffff' : '#000000'}
          />
        ) : (
          <Text className="hidden">{}</Text>
        )}
        <Text className={text}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TabBarButtonCustom;
