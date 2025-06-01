import { TouchableOpacity, Text } from 'react-native';

type ButtonProps = {
  title: string;
  onPress?: () => void;
  className?: string;
};

const Button = ({ title, onPress, className }: ButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    className={`bg-pink-400 rounded-xl py-4 mt-4 shadow-md ${className || ''}`}
  >
    <Text className="text-white text-center font-bold text-xl">{title}</Text>
  </TouchableOpacity>
);

export default Button;