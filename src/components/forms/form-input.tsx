import clsx from 'clsx';
import React from 'react';

interface FormInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, type = 'text', label, required = true, id, ...props }, ref) => {
    return (
      <>
        <div className="mb-3">
          <label className="form-label" htmlFor={id}>
            {label}
          </label>
          <input
            ref={ref}
            type={type}
            id={id}
            className={clsx(['form-control', className])}
            required={required}
            {...props}
          />
        </div>
      </>
    );
  }
);

FormInput.displayName = 'FormInput';

export default FormInput;
