import { Text } from 'react-native';

type Props = {
  title: string;
  className?: string;
};

export default function SectionTitle({ title, className = '' }: Props) {
  return (
    <Text className={`text-2xl font-bold text-color-primary text-center mb-6 ${className}`}>
      {title}
    </Text>
  );
}
