import { axios } from '@/config/axios';
import useAppContext from '@/hooks/use-app-context';
import { User } from '@/types/User';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const useMembersQuery = () => {
  const { token } = useAppContext();

  const res = useQuery<{}, AxiosError, User[]>(['staff-members'], async () => {
    const res = await axios({
      url: '/api/v1/users/',
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  });

  return res;
};

export default useMembersQuery;
