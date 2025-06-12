import { ScrollView } from 'react-native';
import { Card } from '~/components/Card';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top']}>
        <ScrollView
          className="flex  bg-white"
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: 'center',
            gap: 24
          }}>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
