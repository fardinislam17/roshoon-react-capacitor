import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from './FormInput';

const Formlayout = ({ fields, schema, onSubmit, buttonLabel = 'Submit' }) => {
  const { t } = useTranslation();
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
      className="w-full flex flex-col justify-center items-center space-y-4"
    >
      {fields.map(({ name, type, required }) => (
        <FormInput
          key={name}
          name={name}
          label={t(`common.${name}`)}
          type={type}
          required={required}
          register={register}
          error={errors[name]?.message}
        />
      ))}
      <button
        type="submit"
        className="bg-darkGreen text-white font-lato text-lg py-4 px-10 "
      >
        {buttonLabel}
      </button>
    </form>
  );
};

export default Formlayout;
