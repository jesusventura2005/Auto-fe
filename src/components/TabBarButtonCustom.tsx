import { TouchableOpacity, Text, View } from "react-native"

interface TabBarButtonCustomProps {
  className: string,
  label: string;
  isFocused?: boolean;
  accessibilityLabel?: string;
  testID?: string;
  onPress?: () => void;
  onLongPress?: () => void;
  text: string;
  icon?: React.ReactNode;
}

const TabBarButtonCustom = ({
  className,
  label,
  isFocused,
  accessibilityLabel,
  testID,
  onPress,
  onLongPress,
  text,
  icon,
}: TabBarButtonCustomProps) => {
  return (
    <TouchableOpacity
      className={className}
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <View className={`flex items-center ${{text}}`}>
        {icon}
        <Text className={text}>{label}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default TabBarButtonCustom
