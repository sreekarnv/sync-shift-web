import { axios } from '@/config/axios';
import useAppContext from '@/hooks/use-app-context';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export type SignupUserInput = {
  email: string;
  password: string;
  name: string;
};

export type SignupUserResponse = {
  token: string;
};

export const signupUser = async (data: SignupUserInput) => {
  return axios({
    url: '/api/v1/users/signup',
    method: 'POST',
    data,
  });
};

const useSignupMutation = () => {
  const { saveJwtToStorage } = useAppContext();

  const res = useMutation<
    AxiosResponse<SignupUserResponse>,
    any,
    SignupUserInput
  >((data) => signupUser(data), {
    onSuccess(res) {
      saveJwtToStorage(res.data.token);
    },
  });

  return res;
};

export default useSignupMutation;
