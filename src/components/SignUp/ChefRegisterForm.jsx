import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { fetchCities } from 'src/utils/statesAndCities';
import FormInput from '../Forms/FormInput';
import { cn } from 'src/utils/cn';
import { useChefRegisterMutation } from 'src/apis';
import { ADDRESS_FIELDS } from 'src/app/constants';
import { addressSchema } from 'src/schemas/authSchema';
import { notifyError, notifySuccess } from '../SnackbarProvider/useSnackbar';
import { homepagePath } from 'src/paths';
import { useNavigate } from 'react-router-dom';

const ChefRegisterForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [chefRegister, { isLoading: isChefRegistering }] =
    useChefRegisterMutation();

  // Form hook setup
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(addressSchema),
    mode: 'onChange',
  });

  // State for options and dependent options
  const [options, setOptions] = useState({});
  const [dependentOptions, setDependentOptions] = useState({});

  // Effect to load dynamic options for fields
  useEffect(() => {
    loadFieldOptions();
  }, [ADDRESS_FIELDS]);

  const loadFieldOptions = async () => {
    // Iterate through ADDRESS_FIELDS to load options dynamically
    for (const field of ADDRESS_FIELDS) {
      if (field.loadOptions && !options[field.name]) {
        const fieldOptions = await field.loadOptions();
        setOptions((prev) => ({ ...prev, [field.name]: fieldOptions }));
      }
    }
  };

  const handleFieldChange = (name, value) => {
    setValue(name, value?.value || value, {
      shouldValidate: true,
      shouldDirty: true,
    });

    // Trigger dependent options for the field
    const field = ADDRESS_FIELDS.find((field) => field.name === name);
    if (field && field.onChange) {
      field.onChange(value, setDependentOptions);
    }

    // Fetch cities for dynamic "state" field
    if (name === 'state' && value) {
      fetchCities(value?.value).then((cities) => {
        setDependentOptions((prev) => ({
          ...prev,
          city: cities,
        }));
      });
    }
  };

  const handleAddressSubmit = async (chefInfo) => {
    const { data, error } = await chefRegister(chefInfo);
    if (data) {
      notifySuccess(data.message);
      navigate(homepagePath);
    } else {
      notifyError(error?.data?.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleAddressSubmit)}
      className="w-full max-w-[560px] space-y-6"
    >
      {ADDRESS_FIELDS.map(
        ({ name, type, required, defaultValue, readonly }) => (
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
        )
      )}
      <div className="w-full flex justify-center">
        <button
          type="submit"
          disabled={!isValid || isChefRegistering}
          className={cn(
            'w-fit bg-darkGreen text-white font-lato text-lg py-3 px-8 rounded',
            { 'bg-darkGray cursor-not-allowed': !isValid || isChefRegistering }
          )}
        >
          {t('common.submit')}
        </button>
      </div>
    </form>
  );
};

export default ChefRegisterForm;
