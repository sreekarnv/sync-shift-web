import { axios } from '@/config/axios';
import useAppContext from '@/hooks/use-app-context';
import { useMutation } from '@tanstack/react-query';

export type DefaultAvailableInput = {
  startTimeStamp: string;
  endTimeStamp: string;
};

const useBookMemberMutation = (id: string | number, onSuccess?: () => void) => {
  const { token } = useAppContext();

  const res = useMutation<any, any, DefaultAvailableInput, any>(
    (data) => {
      return axios({
        url: '/api/v1/users/members/slots/' + id,
        method: 'POST',
        data,
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    {
      onSuccess() {
        onSuccess?.();
      },
    }
  );

  return res;
};

export default useBookMemberMutation;
