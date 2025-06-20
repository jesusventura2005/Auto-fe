import { ScrollView, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '~/components/cards/Card';
import CreateVehicleCard from '~/components/cards/CreateVehicleCard';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '~/context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from 'jsonwebtoken';

const Dashboard = () => {
  const { authState } = useAuth();

  const user = authState?.token;

  if (!user) {
    console.error('No user token found, redirecting to login');
    return null;
  }

  const decode = jwtDecode<JwtPayload>(user);
  const owner = decode._id;

  const VehiclesList = () => {
    const {
      data: vehicles,
      isLoading,
      isError,
      error,
    } = useQuery({
      queryKey: ['vehicles'],
      queryFn: async () => {
        const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/cars/${owner}`);
        return response.data;
      },
    });

    if (isLoading) {
      return <Text>is loading</Text>;
    }

    if (isError) {
      return <Text>{error.message}</Text>;
    }

    return vehicles.map((vehicle: any) => (
      <Card
        id={vehicle._id}
        key={vehicle._id}
        kilometers={vehicle.kilometers || 0}
        age={vehicle.age}
        lastService={vehicle.plate}
        brand={vehicle.brand}
        model={vehicle.carModel}
      />
    ));
  };

  return (
    <SafeAreaProvider >
      <SafeAreaView className='dark:bg-color-bg-dark' edges={['top']}>
        <ScrollView
          className="flex h-screen  bg-color-bg dark:bg-color-bg-dark"
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: 'center',
            gap: 24,
          }}>
          <VehiclesList></VehiclesList>

          <CreateVehicleCard></CreateVehicleCard>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Dashboard;
