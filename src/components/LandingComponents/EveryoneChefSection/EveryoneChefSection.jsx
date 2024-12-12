import React from 'react';
import CommonButton from 'src/components/CommonButton';
import CommonDescription from 'src/components/CommonDescription';
import CommonTitle from 'src/components/CommonTitle';
import ChefTestimonial from './ChefTestimonial';
import { useTranslation } from 'react-i18next';

const EveryoneChefSection = () => {
  const { t } = useTranslation();
  return (
    <div className="py-20 px-5">
      <div className=" flex flex-col lg:mb-10 lg:px-10 lg:flex-row lg:justify-between">
        <div className="w-full lg:w-[45%] text-center lg:text-left">
          <CommonTitle>Everyone can be a chef in their own kitchen</CommonTitle>
          <CommonDescription className={'text-neutral pt-4'}>
            Indulge in the flavors of home, support local talent, and become
            part of a community that values the love and care that goes into
            every homemade meal.
          </CommonDescription>
          <div className="mb-10 mt-[60px] flex justify-center lg:justify-start">
            <CommonButton>{t('common.becomeAChef')}</CommonButton>
          </div>
        </div>
        <div className="w-full lg:w-[45%]">
          <ChefTestimonial />
        </div>
      </div>
    </div>
  );
};

export default EveryoneChefSection;
