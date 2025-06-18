import { TouchableOpacity, Text, Animated, View } from 'react-native';
import { useRef } from 'react';

type ButtonProps = {
  title: string;
  classNameText?: string; 
  animated?: boolean; 
  onPress?: () => void;
  className?: string;
};

export const Button = ({ title, onPress, className, animated = false, classNameText }: ButtonProps) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const buttonContent = ( 
    <TouchableOpacity
    activeOpacity={0.7}
    onPressIn={animated ? handlePressIn: undefined}
    onPressOut={animated? handlePressOut: undefined}
    onPress={onPress}
    className={`${className || ''}`}
  >
    <Text className={`${classNameText} || text-white text-center font-bold text-xl`}>{title}</Text>
  </TouchableOpacity>
  )

   if (animated) {
    return (
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        {buttonContent}
      </Animated.View>
    );
  }

  return <View>{buttonContent}</View>;
};

export default Button;