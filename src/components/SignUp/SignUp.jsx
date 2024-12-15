import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import UserRegistrationForm from './UserRegistrationForm/UserRegistrationForm';
import ChefRegistrationForm from './ChefRegistrationForm/ChefRegistrationForm';
import roshoon from 'src/assets/images/roshoon.png';
const SignUp = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const asChef = searchParams.get('asChef') === 'true';

  const [currentStep, setCurrentStep] = useState('signUp');

  const renderCurrentForm = () => {
    return currentStep === 'signUp' ? (
      <UserRegistrationForm asChef={asChef} setCurrentStep={setCurrentStep} />
    ) : (
      <ChefRegistrationForm />
    );
  };

  return (
    <div className="flex flex-col lg:flex-row w-full mb-10 lg:mb-0">
      <div className="h-full">
        <img
          className="lg:flex hidden h-full object-cover"
          src="/images/sign-up.png"
          alt=""
        />
      </div>
      <div className="mt-[100px]">
        <img
          className="lg:hidden flex h-[80px] w-[200px] mx-auto"
          src={roshoon}
          alt=""
        />
      </div>
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
