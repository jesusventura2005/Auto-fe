import { useEffect } from 'react';
import { ScrollView, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '~/components/Card';
import CreateVehicleCard from '~/components/CreateVehicleCard';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const Dashboard = () => {
  const VehiclesList = () => {
    const {
      data: vehicles,
      isLoading,
      isError,
      error,
    } = useQuery({
      queryKey: ['vehicles'],
      queryFn: async () => {
        const response = await axios.get(`http://localhost:3000/cars/6835050ec4e9f8af39fc9314`);
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
        key={vehicle.id}
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
          {/* <Card
            kilometers={200}
            lastService="20/05/2003"
            age={2003}
            brand="Toyota"
            model="Camry"></Card> */}

          <VehiclesList></VehiclesList>

          <CreateVehicleCard></CreateVehicleCard>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Dashboard;
