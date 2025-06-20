import { Text } from 'react-native';

type Props = {
  title: string;
};

const SectionTitle = ({ title }: Props) => (
  <Text className="text-2xl font-bold text-black mt-6 mb-2 dark:text-color-title-dark">{title}</Text>
);

export default SectionTitle;
