import { axios } from '@/config/axios';
import { useMutation } from '@tanstack/react-query';
import React from 'react';

export type SignupUserInput = {
  email: string;
  password: string;
  name: string;
};

export const signupUser = async (data: SignupUserInput) => {
  return axios({
    url: '/api/v1/users/signup',
    method: 'POST',
    data,
  });
};

const useSignupMutation = () => {
  const res = useMutation<any, any, SignupUserInput>(
    (data) => signupUser(data),
    {
      onSuccess(data, variables, context) {
        console.log(data);
      },
    }
  );

  return res;
};

export default useSignupMutation;
