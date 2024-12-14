import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import SignUpForm from './SignUpForm';
import ChefRegisterForm from './ChefRegisterForm';

const SignUp = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const asChef = searchParams.get('asChef') === 'true';

  const [currentStep, setCurrentStep] = useState('signUp');

  const renderCurrentForm = () => {
    return currentStep === 'signUp' ? (
      <SignUpForm asChef={asChef} setCurrentStep={setCurrentStep} />
    ) : (
      <ChefRegisterForm />
    );
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2">
      <img
        className="hidden xl:block"
        src="/images/sign-up.png"
        alt={t('common.signUp')}
      />
      <div className="flex flex-col justify-center items-center mx-6 my-4">
        <h5 className="font-lato font-bold text-4xl mb-8">
          {asChef ? t('common.becomeAChef') : t('common.signUp')}
        </h5>
        {renderCurrentForm()}
      </div>
    </div>
  );
};

export default SignUp;
