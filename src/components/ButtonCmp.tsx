import { TouchableOpacity, Text } from 'react-native';

type ButtonProps = {
  title: string;
  onPress?: () => void;
  className?: string;
};

const Button = ({ title, onPress, className }: ButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    className={`${className || ''}`}
  >
    <Text className="text-white text-center font-bold text-xl">{title}</Text>
  </TouchableOpacity>
);

export default Button;