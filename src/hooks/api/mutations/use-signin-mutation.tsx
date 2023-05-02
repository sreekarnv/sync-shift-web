import { axios } from '@/config/axios';
import useAppContext from '@/hooks/use-app-context';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export type SigninUserInput = {
  email: string;
  password: string;
};

export type SigninUserResponse = {
  token: string;
};

export const signinUser = async (data: SigninUserInput) => {
  return axios({
    url: '/api/v1/auth/signin',
    method: 'POST',
    data,
  });
};

const useSigninMutation = () => {
  const { saveJwtToStorage } = useAppContext();

  const res = useMutation<
    AxiosResponse<SigninUserResponse>,
    any,
    SigninUserInput
  >((data) => signinUser(data), {
    onSuccess(res) {
      saveJwtToStorage(res.data.token);
    },
    onError() {},
  });

  return res;
};

export default useSigninMutation;
