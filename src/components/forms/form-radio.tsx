import React from 'react';

interface FormRadioContextProps {
  name: string;
}

interface FormRadioProviderProps extends FormRadioContextProps {
  className?: string;
  children: React.ReactNode;
}

interface FormRadioProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
}

const FormRadioContext = React.createContext<FormRadioContextProps>(
  {} as FormRadioProviderProps
);

const useFormRadioContext = () => React.useContext(FormRadioContext);

export const FormRadioGroup: React.FC<FormRadioProviderProps> = ({
  className,
  children,
  name,
}) => {
  return (
    <FormRadioContext.Provider value={{ name }}>
      <div className={className}>{children}</div>
    </FormRadioContext.Provider>
  );
};

export const FormRadio = React.forwardRef<HTMLInputElement, FormRadioProps>(
  (props, ref) => {
    const { id, label, ...rest } = props;
    const { name } = useFormRadioContext();

    return (
      <>
        <div className="form-check form-check-secondary form-check-inline">
          <input
            ref={ref}
            className="form-check-input"
            type="radio"
            id={id}
            name={name}
            {...rest}
          />
          <label className="form-check-label" htmlFor={id}>
            {label}
          </label>
        </div>
      </>
    );
  }
);
