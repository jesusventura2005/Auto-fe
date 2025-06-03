import { Animated, Text, TouchableOpacity } from 'react-native';
import { useRef } from 'react';

type Props = {
  onPress: () => void;
  title: string;
};

export const AnimatedSubmitButton = ({ onPress, title }: Props) => {
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

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        className="mt-8 bg-blue-600 rounded-xl py-4"
      >
        <Text className="text-white font-bold text-center text-xl">{title}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};