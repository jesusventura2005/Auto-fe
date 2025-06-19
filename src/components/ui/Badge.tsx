import { View, Text } from 'react-native';

const Badge = () => {
  return (
    <View className="w-fit h-8 rounded-xl border border-[#dce4ec] dark:bg-color-bg-dark dark:border-color-border-dark bg-white p-1 px-2">
      <Text className="text-sm font-semibold dark:text-color-text-dark">Pending</Text>
    </View>
  );
};

export default Badge;
