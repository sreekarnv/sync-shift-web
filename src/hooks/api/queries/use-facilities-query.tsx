import { axios } from '@/config/axios';
import useAppContext from '@/hooks/use-app-context';
import { Facility } from '@/types/Facility';
import { useQuery } from '@tanstack/react-query';

const useFacilitiesQuery = () => {
  const { token } = useAppContext();

  const res = useQuery<any, any, Facility[]>(['facilities'], async () => {
    const res = await axios({
      url: '/api/v1/facilities/',
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  });

  return res;
};

export default useFacilitiesQuery;
