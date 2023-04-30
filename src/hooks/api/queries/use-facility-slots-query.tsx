import { axios } from '@/config/axios';
import useAppContext from '@/hooks/use-app-context';
import { FacilitySlot } from '@/types/FacilitySlot';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const useFacilitySlotsQuery = (id: string | number) => {
  const { token } = useAppContext();

  const res = useQuery<any, AxiosError, FacilitySlot[]>(
    ['facility-slots', id],
    async () => {
      const res = await axios({
        url: `/api/v1/facilities/slots/${id}`,
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    }
  );

  return res;
};

export default useFacilitySlotsQuery;
