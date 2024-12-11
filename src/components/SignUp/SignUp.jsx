import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as paths from 'src/paths';
import { useRegisterLazyQuery } from 'src/apis';
import { ADDRESS_FIELDS, SIGN_UP_FIELDS } from 'src/app/constants';
import { FormLayout } from 'src/components/Forms';
import { addressSchema, signUpSchema } from 'src/schemas/authSchema';
import {
  notifyError,
  notifySuccess,
} from 'src/components/SnackbarProvider/useSnackbar';

export default function SignUp() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const asChef = params.get('asChef') === 'true';

  const [currentStep, setCurrentStep] = useState('address'); // Track the current form step
  const [isVerified, setIsVerified] = useState(false); // Track Stripe verification

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
        if (asChef) {
          setCurrentStep('address'); // Switch to address form after successful sign-up
        } else navigate(paths.homepage);
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

  const handleAddressSubmit = (data) => {
    console.log('Address Data:', data);
    notifySuccess(t('common.addressSaved'));
    // Navigate or handle completion
  };

  const handleVerify = async () => {
    try {
      // Simulate Stripe verification
      const isVerificationSuccessful = true; // Replace with actual verification logic
      if (isVerificationSuccessful) {
        setIsVerified(true);
        notifySuccess(t('common.verificationSuccessful'));
      } else {
        notifyError(t('common.verificationFailed'));
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
          {asChef ? t('common.becomeAChef') : t('common.signUp')}
        </h5>
        {currentStep === 'signUp' ? (
          <FormLayout
            fields={SIGN_UP_FIELDS}
            onSubmit={handleSignUp}
            schema={signUpSchema}
            buttonLabel={asChef ? t('common.continue') : t('common.signUp')}
          />
        ) : (
          <FormLayout
            fields={ADDRESS_FIELDS}
            onSubmit={handleAddressSubmit}
            schema={addressSchema}
            buttonLabel={t('common.submit')}
            renderExtraButton={() => (
              <button
                type="button"
                onClick={handleVerify}
                className="bg-blue-500 text-white font-lato py-2 px-4 rounded cursor-pointer"
                disabled={isVerified}
              >
                {t('common.verifyMe')}
              </button>
            )}
          />
        )}
      </div>
    </div>
  );
}
