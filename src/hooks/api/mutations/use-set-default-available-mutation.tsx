import { axios } from '@/config/axios';
import useAppContext from '@/hooks/use-app-context';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export type DefaultAvailableInput = {
  startTime: string;
  endTime: string;
};

const useSetDefaultAvailableMutation = () => {
  const navigate = useNavigate();
  const { token, saveJwtToStorage } = useAppContext();

  const res = useMutation<any, any, DefaultAvailableInput, any>(
    (data) => {
      return axios({
        url: '/api/v1/users/set-default-available',
        method: 'POST',
        data,
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    {
      onSuccess(res) {
        saveJwtToStorage(res.data.token);
      },
      onError() {},
      onSettled(res) {
        if (res.data.token) {
          navigate('/', { replace: true });
        }
      },
    }
  );

  return res;
};

export default useSetDefaultAvailableMutation;
