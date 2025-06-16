import { TouchableOpacity } from 'react-native';

interface IconButtonProps {
  icon: React.ReactNode;
  onPress: () => void;
  disabled?: boolean;
  className?: string;
}

export default function IconButton({
  icon,
  onPress,
  disabled = false,
  className = '',
}: IconButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`rounded-full p-2 ${className}`}
      activeOpacity={0.7}
      accessibilityRole="button">
      {icon}
    </TouchableOpacity>
  );
}
