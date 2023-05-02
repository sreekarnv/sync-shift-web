import FormError from '@/components/forms/form-error';
import FormInput from '@/components/forms/form-input';
import Button from '@/components/ui/button';
import useSetDefaultAvailableMutation, {
  DefaultAvailableInput,
} from '@/hooks/api/mutations/use-set-default-available-mutation';
import React from 'react';
import { useForm } from 'react-hook-form';

const SetAvailabilityIndexPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DefaultAvailableInput>();

  const { mutate } = useSetDefaultAvailableMutation();

  const onSubmit = (data: DefaultAvailableInput) => {
    mutate(data);
  };

  return (
    <>
      <div>
        <h1>Set Availability</h1>
        <p>Finish this to complete your profile</p>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormInput
            label="Start Time"
            id="startTime"
            type="time"
            {...register('startTime', {
              required: true,
              pattern: /^(?:2[0-3]|[01][0-9]):[0-5][0-9]$/,
            })}
          />
          {errors.startTime && (
            <FormError
              error={
                {
                  response: {
                    data: {
                      errors: [
                        'Start Time is Required',
                        'Start time must be in 24-hour format or 12-hour format (e.g. 17:30 or 11:20 PM)',
                      ],
                    },
                  },
                } as any
              }
            />
          )}
          <br />
          <FormInput
            label="End Time"
            id="endTime"
            type="time"
            {...register('endTime', {
              required: true,
              pattern: /^(?:2[0-3]|[01][0-9]):[0-5][0-9]$/,
            })}
          />
          {errors.endTime && (
            <FormError
              error={
                {
                  response: {
                    data: {
                      errors: [
                        'End Time is Required',
                        'End time must be in 24-hour format or 12-hour format (e.g. 17:30 or 11:20 PM)',
                      ],
                    },
                  },
                } as any
              }
            />
          )}
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </>
  );
};

export default SetAvailabilityIndexPage;
