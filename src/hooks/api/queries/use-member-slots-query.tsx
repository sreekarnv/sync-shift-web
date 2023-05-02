import { axios } from '@/config/axios';
import useAppContext from '@/hooks/use-app-context';
import { FacilitySlot } from '@/types/FacilitySlot';
import { MemberSlot } from '@/types/MemberSlot';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const useMemberSlotsQuery = (id: string | number) => {
  const { token } = useAppContext();

  const res = useQuery<any, AxiosError, MemberSlot[]>(
    ['members-slots', id],
    async () => {
      const res = await axios({
        url: `/api/v1/users/members/slots/${id}`,
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    }
  );

  return res;
};

export default useMemberSlotsQuery;
