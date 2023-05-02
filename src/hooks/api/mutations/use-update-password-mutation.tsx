import { axios } from '@/config/axios';
import useAppContext from '@/hooks/use-app-context';
import { useMutation } from '@tanstack/react-query';

const useUpdatePasswordMutation = () => {
  const { clearJwtFromStorage, token } = useAppContext();

  const res = useMutation<any, any, {}>(
    (data) => {
      return axios({
        url: '/api/v1/auth/update-password',
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

export default useUpdatePasswordMutation;
