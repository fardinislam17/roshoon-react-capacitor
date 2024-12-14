import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from 'src/utils/cn';
import FormInput from './FormInput';
import { fetchCities } from 'src/utils/statesAndCities';

const FormLayout = ({ fields, schema, onSubmit, buttonLabel = 'Submit' }) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const [options, setOptions] = useState({});
  const [dependentOptions, setDependentOptions] = useState({});

  // Effect to load options for fields that have loadOptions function
  useEffect(() => {
    fields.forEach(async (field) => {
      if (field.loadOptions && !options[field.name]) {
        const fieldOptions = await field.loadOptions();
        setOptions((prev) => ({ ...prev, [field.name]: fieldOptions }));
      }
    });
  }, [fields, options]);

  const handleFieldChange = (name, value) => {
    setValue(name, value?.value || value, {
      shouldValidate: true,
      shouldDirty: true,
    });
    const field = fields.find((field) => field.name === name);

    // Trigger dependent options for the field
    if (field && field.onChange) {
      field.onChange(value, setDependentOptions);
    }

    // If the field requires dynamic options (like 'state'), fetch cities or other dependencies
    if (name === 'state' && value) {
      fetchCities(value?.value).then((cities) => {
        setDependentOptions((prev) => ({
          ...prev,
          city: cities,
        }));
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-[560px] space-y-6"
    >
      {fields.map(({ name, type, required, defaultValue, readonly }) => (
        <FormInput
          key={name}
          name={name}
          type={type}
          register={register}
          required={required}
          readonly={readonly}
          label={t(`common.${name}`)}
          defaultValue={defaultValue}
          error={errors[name]?.message}
          options={dependentOptions[name] || options[name]}
          onChange={(value) => handleFieldChange(name, value)}
        />
      ))}
      <div className="w-full flex justify-center">
        <button
          type="submit"
          disabled={!isValid}
          className={cn(
            'w-fit bg-darkGreen text-white font-lato text-lg py-3 px-8 rounded ',
            { 'bg-darkGray cursor-not-allowed': !isValid }
          )}
        >
          {buttonLabel}
        </button>
      </div>
    </form>
  );
};

export default FormLayout;
