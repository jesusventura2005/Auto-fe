import { useMutation, useQueryClient } from '@tanstack/react-query';
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

      const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/cars`, requestData);
      return response;
    },
    onSuccess: (response) => {
      console.log(response.data);
    },
  });

  return addMaintenanceMutation;
};

export default useAddMaintenance;
