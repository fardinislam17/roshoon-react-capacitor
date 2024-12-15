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
    <div className="flex flex-col lg:flex-row w-full mb-10 lg:mb-0">
      <img
        className="hidden xl:block"
        src="/images/sign-up.png"
        alt={t('common.signUp')}
      />
      <div className="py-0 lg:py-24 mx-auto px-8 w-full lg:w-1/2 2xl:w-[35%]">
        <h5 className="font-lato font-bold text-4xl mb-8 text-center">
          {asChef ? t('common.becomeAChef') : t('common.signUp')}
        </h5>
        {renderCurrentForm()}
      </div>
    </div>
  );
};

export default SignUp;
