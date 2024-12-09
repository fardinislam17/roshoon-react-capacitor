import React from 'react';
import { useTranslation } from 'react-i18next';
import { SIGN_UP_FIELDS } from 'src/app/constants';
import { FormLayout } from 'src/components/Forms';
import { signUpSchema } from 'src/schemas/authSchema';

export default function SignUp() {
  const { t } = useTranslation();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="grid grid-cols-2">
      <img src={'/images/sign-up.png'} alt="sign-up" />
      <div className="flex flex-col justify-center items-center">
        <h5 className="font-lato font-bold text-[33.52px] leading-[40.23px] mb-6">
          {t('common.signUp')}
        </h5>
        <FormLayout
          fields={SIGN_UP_FIELDS}
          onSubmit={onSubmit}
          schema={signUpSchema}
          buttonLabel={'Continue'}
        />
      </div>
    </div>
  );
}
