import { AxiosError } from 'axios';
import React from 'react';

interface FormErrorProps {
  error: AxiosError<any>;
}

const FormError: React.FC<FormErrorProps> = ({ error }) => {
  return (
    <>
      {error?.response?.data?.errors && (
        <div className="alert alert-danger mb-4">
          <ul>
            {error?.response?.data?.errors?.map((el: any, i: number) => {
              return (
                <li key={i}>
                  {(typeof el === 'string' && el) ||
                    (el?.message && el.message)}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default FormError;
