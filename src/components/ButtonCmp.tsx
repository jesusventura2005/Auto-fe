import { TouchableOpacity, Text } from 'react-native';

type ButtonProps = {
  title: string;
  classNameText?: string
  onPress?: () => void;
  className?: string;
};

const Button = ({ title, onPress, className, classNameText }: ButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    className={`${className || ''}`}
  >
    <Text className={`${classNameText} || text-white text-center font-bold text-xl`}>{title}</Text>
  </TouchableOpacity>
);

export default Button;