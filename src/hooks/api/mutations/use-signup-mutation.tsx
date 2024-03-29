import { axios } from '@/config/axios';
import useAppContext from '@/hooks/use-app-context';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export type SignupUserInput = {
  email: string;
  password: string;
  name: string;
  role: 'STUDENT' | 'STAFF';
};

export type SignupUserResponse = {
  token: string;
};

export const signupUser = async (input: SignupUserInput) => {
  const data = {
    name: input.name,
    email: input.email,
    password: input.password,
    isStaff: input.role === 'STAFF',
  };

  return axios({
    url: '/api/v1/auth/signup',
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
