import React from 'react';
import { useForm, Resolver } from 'react-hook-form';
import Select from 'react-select'

type FormValues = {
  SearchValue: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.SearchValue ? values : {},
    errors: !values.SearchValue
      ? {
          SearchValue: {
            type: 'required',
            message: 'This is required.',
          },
        }
      : {},
  };
};

const options = [
  { value: 'faculty', label: 'Faculty' },
  { value: 'facilities', label: 'Facilities' },
  { value: 'students', label: 'Students' }
]


interface MembersPageProps extends React.PropsWithChildren {}

const MembersPage: React.FC<MembersPageProps> = ({}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver });
  const onSubmit = handleSubmit((data) => console.log(data));
  return (
    <>
      <div className="container">
        <h1>Find Members </h1>
        <form onSubmit={onSubmit}>
          <input {...register("SearchValue")} placeholder="search for facilities, faculty, peers ..." />
          {errors?.SearchValue && <p>{errors.SearchValue.message}</p>}
          <Select options={options} />
          <button type="submit">Search</button>
        </form>
      </div>
    </>
  );
};

export default MembersPage;
