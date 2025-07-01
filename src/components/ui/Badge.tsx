import { View, Text } from 'react-native';

interface BadgeProps {
  isCompleted: boolean;
}

const Badge = ({ isCompleted }: BadgeProps) => {
  return (
    <View
      className={`h-8 w-fit rounded-xl border border-[#dce4ec] dark:border-color-border-dark dark:bg-color-bg-dark ${isCompleted ? 'bg-green-500 dark:bg-green-500' : 'bg-yellow-400'} p-1 px-2 `}>
      <Text
        className={`text-sm font-semibold ${isCompleted ? 'text-white' : 'dark:text-color-text-dark'}`}>
        {isCompleted ? 'Completado' : 'Pendiente'}
      </Text>
    </View>
  );
};

export default Badge;
