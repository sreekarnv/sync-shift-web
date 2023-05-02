import { axios } from '@/config/axios';
import useAppContext from '@/hooks/use-app-context';
import { useMutation } from '@tanstack/react-query';

const useUserWithdrawMutation = () => {
  const { clearJwtFromStorage, user, token } = useAppContext();

  const res = useMutation<any, any, {}>(
    (data) => {
      return axios({
        url: '/api/v1/users/' + user?.id + '/withdraw',
        method: 'POST',
        data,
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    {
      onSuccess() {
        clearJwtFromStorage();
      },
    }
  );

  return res;
};

export default useUserWithdrawMutation;
