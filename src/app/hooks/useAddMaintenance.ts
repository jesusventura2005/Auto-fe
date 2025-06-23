import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface Maintenance {
  carId: string;
  title: string;
  description: string;
  type: string;
  date: string;
  kilometers: number;
  completed: boolean;
}

const useAddMaintenance = () => {
  const queryclient = useQueryClient()

  const addMaintenanceMutation = useMutation({
    mutationFn: async ({
      carId,
      title,
      description,
      type,
      date,
      kilometers,
      completed,
    }: Maintenance) => {
      const requestData = {
        carId,
        title,
        description,
        type,
        date,
        kilometers,
        completed,
      };

      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/maintenance`,
        requestData
      );
      return response;
    },
    onSuccess: (response) => {
      queryclient.invalidateQueries({queryKey: ['maintenance']})
      
    },
  });

  return addMaintenanceMutation;
};

export default useAddMaintenance;
