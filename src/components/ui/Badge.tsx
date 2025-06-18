import { View, Text } from 'react-native';

const Badge = () => {
  return (
    <View className="w-fit rounded-xl border border-[#dce4ec] bg-white p-1 px-2">
      <Text className="text-sm font-semibold">Pending</Text>
    </View>
  );
};

export default Badge;
