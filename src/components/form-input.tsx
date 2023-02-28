import React from 'react';
import clsx from 'clsx';

interface FormInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, type = 'text', label, required = true, ...props }, ref) => {
    return (
      <>
        <div className="mb-3">
          <label className="form-label">{label}</label>
          <input
            ref={ref}
            type={type}
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
