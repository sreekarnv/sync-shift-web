import { axios } from '@/config/axios';
import useAppContext from '@/hooks/use-app-context';
import { FacilitySlot } from '@/types/FacilitySlot';
import { useQuery } from '@tanstack/react-query';

const useUserFacilitySlotsQuery = () => {
  const { token } = useAppContext();

  return useQuery<any, any, FacilitySlot[]>(
    ['user-facility-slots'],
    async () => {
      const res = await axios({
        url: '/api/v1/users/slots',
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data;
    }
  );
};

export default useUserFacilitySlotsQuery;
