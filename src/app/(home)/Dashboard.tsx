import { ScrollView, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '~/components/Card';
import CreateVehicleCard from '~/components/CreateVehicleCard';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '~/context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from 'jsonwebtoken';

const Dashboard = () => {
  const { authState } = useAuth();

  const user = authState?.token;

  if (!user) {
    throw new Error('no User');
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
        const response = await axios.get(`http://localhost:3000/cars/${owner}`);
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
        key={vehicle._id}
        kilometers={vehicle.kilometers || 0}
        age={vehicle.age}
        lastService={vehicle.plate}
        brand={vehicle.brand}
        model={vehicle.carModel}></Card>
    ));
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top']}>
        <ScrollView
          className="flex h-screen  bg-white"
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
