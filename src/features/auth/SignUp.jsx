import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as paths from 'src/paths';
import { useRegisterLazyQuery } from 'src/apis';
import { SIGN_UP_FIELDS } from 'src/app/constants';
import { FormLayout } from 'src/components/Forms';
import { signUpSchema } from 'src/schemas/authSchema';
import {
  notifyError,
  notifySuccess,
} from 'src/features/snackbarProvider/useSnackbar';

export default function SignUp() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const asChef = params.get('asChef') === 'true';

  const [register, { isLoading }] = useRegisterLazyQuery();

  const handleSignUp = async ({
    phoneOrEmail: email,
    firstName,
    lastName,
    password,
  }) => {
    try {
      const { isSuccess, data, error } = await register({
        email,
        password,
        firstName,
        lastName,
      });
      if (isSuccess) {
        notifySuccess(data.message);
        navigate(paths.homepage);
      } else {
        notifyError(error?.data?.message);
        if (error?.data?.message === 'Email already exists') {
          navigate(paths.login);
        }
      }
    } catch (error) {
      notifyError(error.message);
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 ">
      <img
        className="hidden xl:block"
        src={'/images/sign-up.png'}
        alt="sign-up"
      />
      <div className="flex flex-col justify-center items-center mx-6 my-4">
        <h5 className="font-lato font-bold text-4xl mb-8">
          {t('common.signUp')}
        </h5>
        <FormLayout
          fields={SIGN_UP_FIELDS}
          onSubmit={handleSignUp}
          schema={signUpSchema}
          buttonLabel={asChef ? t('common.continue') : t('common.signUp')}
        />
      </div>
    </div>
  );
}
