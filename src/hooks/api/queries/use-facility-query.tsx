import { axios } from '@/config/axios';
import useAppContext from '@/hooks/use-app-context';
import { Facility } from '@/types/Facility';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const useFacilityQuery = (id: string | number) => {
  const { token } = useAppContext();

  const res = useQuery<any, AxiosError, Facility>(
    ['facility', id],
    async () => {
      const res = await axios({
        url: `/api/v1/facilities/${id}`,
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    }
  );

  return res;
};

export default useFacilityQuery;
