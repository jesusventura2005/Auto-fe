import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

type Props = {
  type: string;
  iconName: string;
  iconType: 'material-community' | 'font-awesome-5' | 'ionicons';
  lastDone: string;
  interval: string;
  status: 'Vencido' | 'Nunca hecho' | 'Al día';
  onPress?: () => void;
};

const getIconComponent = (
  iconType: Props['iconType'],
  iconName: string,
  color: string
) => {
  switch (iconType) {
    case 'material-community':
      return (
        <MaterialCommunityIcons name={iconName as any} size={24} color={color} />
      );
    case 'font-awesome-5':
      return <FontAwesome5 name={iconName as any} size={20} color={color} />;
    case 'ionicons':
      return <Ionicons name={iconName as any} size={24} color={color} />;
    default:
      return null;
  }
};

const getColorByStatus = (status: Props['status']) => {
  switch (status) {
    case 'Vencido':
      return '#dc2626';
    case 'Nunca hecho':
      return '#facc15';
    case 'Al día':
    default:
      return '#22c55e';
  }
};

export default function CheckListCard({
  type,
  iconName,
  iconType,
  lastDone,
  interval,
  status,
  onPress,
}: Props) {
  const color = getColorByStatus(status);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      className="mb-4 w-full rounded-xl border border-color-border dark:border-color-border-dark bg-white dark:bg-color-bg-dark p-4 flex-row items-center"
      style={{ borderLeftWidth: 5, borderLeftColor: color }}
    >
      <View className="mr-4">
        {getIconComponent(iconType, iconName, color)}
      </View>

      <View className="flex-1">
        <Text className="text-lg font-semibold text-color-title dark:text-color-title-dark">
          {type}
        </Text>
        <Text className="text-sm text-gray-500 dark:text-gray-400">
          Última vez: {lastDone}
        </Text>
        <Text className="text-xs text-gray-400 dark:text-gray-500">
          Recomendado {interval}
        </Text>
      </View>

      <View className="bg-gray-800 rounded-full px-3 py-1 min-w-[80px] items-center">
        <Text className="text-xs text-white text-center">{status}</Text>
      </View>
    </TouchableOpacity>
  );
}
