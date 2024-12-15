import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useRegisterLazyQuery, useUserProfileQuery } from 'src/apis';
import { signUpSchema } from 'src/schemas/authSchema';
import { notifyError, notifySuccess } from '../../SnackbarProvider/useSnackbar';
import { SIGN_UP_FIELDS } from 'src/app/constants';
import FormInput from '../../Forms/FormInput';
import { cn } from 'src/utils/cn';
import { homepagePath, loginPath } from 'src/paths';

const UserRegistrationForm = ({ asChef, setCurrentStep }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data, isFetching } = useUserProfileQuery();
  const [registerUser, { isLoading }] = useRegisterLazyQuery();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
  });

  // Handle sign-up logic
  const handleSignUp = async (formData) => {
    const { phoneOrEmail, firstName, lastName, password } = formData;
    try {
      const { isSuccess, data, error } = await registerUser({
        email: phoneOrEmail,
        password,
        firstName,
        lastName,
      });

      if (isSuccess) {
        notifySuccess(data.message);
        if (asChef) {
          setCurrentStep('address');
        } else {
          navigate(homepagePath);
        }
      } else {
        notifyError(error?.data?.message);
        if (error?.data?.message === 'Email already exists') {
          navigate(loginPath);
        }
      }
    } catch (error) {
      notifyError(error.message);
    }
  };

  // Determine which fields to display based on the presence of user data
  const userInfo = data?.user;
  const fieldsToDisplay = userInfo
    ? SIGN_UP_FIELDS.filter(
        ({ name }) => !['password', 'repeatPassword'].includes(name)
      )
    : SIGN_UP_FIELDS;

  // Form submission handler based on user info state
  const submitHandler = userInfo
    ? () => setCurrentStep('address')
    : handleSubmit(handleSignUp);

  return (
    <form onSubmit={submitHandler} className="w-full space-y-6">
      {fieldsToDisplay.map(({ name, type, required }) => (
        <FormInput
          key={name}
          name={name}
          type={type}
          register={register}
          required={required}
          label={t(`common.${name}`)}
          error={errors[name]?.message}
          readOnly={
            userInfo && ['phoneOrEmail', 'firstName', 'lastName'].includes(name)
          }
          defaultValue={
            userInfo
              ? name === 'phoneOrEmail'
                ? userInfo.email
                : userInfo[name]
              : ''
          }
        />
      ))}
      <div className="w-full flex justify-center">
        <button
          type="submit"
          disabled={!isValid && !userInfo}
          className={cn(
            'w-fit bg-greenDark text-white font-lato text-lg py-4 px-10',
            { 'bg-grayDark cursor-not-allowed': !isValid && !userInfo }
          )}
        >
          {asChef ? t('common.continue') : t('common.submit')}
        </button>
      </div>
    </form>
  );
};

export default UserRegistrationForm;
