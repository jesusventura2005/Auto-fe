import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface maintenance {
  id: string;
  title?: string;
  description?: string;
  type?: string;
  date?: string;
  dateNotFixed?: Date;
  kilometers?: number;
  completed?: boolean;
}

export const usePatchMaintenance = () => {
  const queryclient = useQueryClient();
  const patchMaintenanceMutation = useMutation({
    mutationFn: async ({
      id,
      title,
      description,
      type,
      date,
      kilometers,
      completed,
    }: maintenance) => {
      const requestData = {
        id,
        title,
        description,
        type,
        date,
        kilometers,
        completed,
      };

      console.log(requestData);

      const response = await axios.patch(
        `${process.env.EXPO_PUBLIC_API_URL}/maintenance/${id}`,
        requestData
      );
      console.log(response);
      return response;
    },
    onSuccess: (response) => {
      console.log(response);
      queryclient.invalidateQueries({ queryKey: ['maintenance'] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return patchMaintenanceMutation;
};
