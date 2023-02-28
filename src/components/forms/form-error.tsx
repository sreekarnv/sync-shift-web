import { AxiosError } from 'axios';
import React from 'react';
import Alert from '../ui/alert';

interface FormErrorProps {
  error: AxiosError<any>;
}

const FormError: React.FC<FormErrorProps> = ({ error }) => {
  return (
    <>
      {error?.response?.data?.errors && (
        <Alert className="mb-4">
          <ul className="mb-0">
            {error?.response?.data?.errors?.map((el: any, i: number) => {
              return (
                <li key={i} className="mb-1">
                  {(typeof el === 'string' && el) ||
                    (el?.message && el.message)}
                </li>
              );
            })}
          </ul>
        </Alert>
      )}
    </>
  );
};

export default FormError;
