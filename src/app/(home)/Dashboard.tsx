import { ScrollView  } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '~/components/Card';

const Dashboard = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top']}>
        <ScrollView
          className="flex h-screen  bg-white"
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: 'center',
            gap: 24
          }}>
          <Card 
          kilometers={200}
          lastService='20/05/2003'
          age={2003}
          brand='Toyota'
          model='Camry'
          ></Card>

        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Dashboard;
