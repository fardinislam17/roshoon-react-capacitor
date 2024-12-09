import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from './FormInput';

const Formlayout = ({ fields, schema, onSubmit, buttonLabel = 'Submit' }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center items-center space-y-6"
    >
      {fields.map(({ name, label, type, required }) => (
        <FormInput
          key={name}
          name={name}
          label={label}
          type={type}
          required={required}
          register={register}
          error={errors[name]?.message}
        />
      ))}
      <button
        type="submit"
        className=" bg-[#195908] text-white font-lato text-lg py-4 px-10 shadow-md"
      >
        {buttonLabel}
      </button>
    </form>
  );
};

export default Formlayout;
