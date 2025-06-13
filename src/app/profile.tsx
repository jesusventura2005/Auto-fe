import { ScrollView , Button } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
// import { useAuth } from '~/context/AuthContext';

export default function ProfileScreen() {

  // const { onLogout } = useAuth();
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

            <Button title='Logout'></Button>
         
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}