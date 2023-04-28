import { axios } from '@/config/axios';
import useAppContext from '@/hooks/use-app-context';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

const useFacilitiesQuery = () => {
  const { token } = useAppContext();

  const res = useQuery<AxiosResponse<any>, any, any>(
    ['facilities'],
    async () => {
      const res = await axios({
        url: '/api/v1/facilities/',
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    }
  );

  return res;
};

export default useFacilitiesQuery;
