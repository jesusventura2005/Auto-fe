import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '~/context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import { router } from 'expo-router';
import { JwtPayload } from 'jsonwebtoken';

interface AddVehicleParams {
  type: string;
  brand: string;
  age: number;
  carModel: string;
  serial: string;
  plate: string;
}

const useAddVehicle = () => {
  const queryClient = useQueryClient();
  const { authState } = useAuth();

  const addVehicleMutation = useMutation({
    mutationFn: async ({ type, brand, age, carModel, serial, plate }: AddVehicleParams) => {
      const toDecode = authState?.token;
      if (!toDecode) {
        throw new Error('No authentication token found');
      }

      const decodedToken = jwtDecode<JwtPayload>(toDecode);
      const owner = await decodedToken._id;

      if (!owner) {
        throw new Error('Could not extract owner ID from token');
      }

      const requestData = {
        type,
        brand,
        owner,
        age,
        carModel,
        serial,
        plate,
      };

      try {
        const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/cars`, requestData);
        return response;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (response) => {
      console.log(response);
      console.log(response.data);
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      router.push('/Dashboard');
    },
    onError: (error) => {
      console.error('Mutation error:', error);
    },
  });

  return addVehicleMutation;
};

export default useAddVehicle;
