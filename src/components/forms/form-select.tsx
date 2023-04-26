import React from 'react';

interface FormOptionProps
  extends React.DetailedHTMLProps<
    React.OptionHTMLAttributes<HTMLOptionElement>,
    HTMLOptionElement
  > {}

interface FormSelectProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  options: FormOptionProps[];
  rootClassName?: string;
  label: string;
  id: string;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  options,
  rootClassName,
  label,
  id,
  ...props
}) => {
  return (
    <div className={rootClassName}>
      <label htmlFor={id}>{label}</label>
      <select className="form-select" id={id} {...props}>
        {options.map((option) => (
          <FormOption {...option} key={option.label} />
        ))}
      </select>
    </div>
  );
};

export const FormOption: React.FC<FormOptionProps> = (props) => {
  return <option {...props} />;
};
