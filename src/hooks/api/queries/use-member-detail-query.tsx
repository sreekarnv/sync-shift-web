import { axios } from '@/config/axios';
import useAppContext from '@/hooks/use-app-context';
import { User } from '@/types/User';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const useMemberDetailQuery = (id: number | string) => {
  const { token } = useAppContext();

  return useQuery<{}, AxiosError, User>(['members'], async () => {
    const res = await axios({
      url: '/api/v1/users/' + id,
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  });
};

export default useMemberDetailQuery;
