import React from 'react';
import { useTranslation } from 'react-i18next';
import CommonButton from 'src/components/CommonButton';
import CommonDescription from 'src/components/CommonDescription';
import CommonTitle from 'src/components/CommonTitle';
import ChefTestimonial from './ChefTestimonial';

const EveryoneChefSection = () => {
  const { t } = useTranslation();
  return (
    <div className="py-20 px-5">
      <div className=" flex flex-col lg:mb-10 lg:flex-row lg:justify-between gap-10">
        <div className="w-full lg:w-[45%] text-center lg:text-left sm:px-10 lg:px-0 ">
          <CommonTitle
            className={
              'text-center lg:text-left tracking-tight md:tracking-[-3px]'
            }
          >
            {t('common.everyoneChefTitle')}
          </CommonTitle>
          <CommonDescription className={'text-neutral pt-4 '}>
            {t('common.everyoneChefDescription')}
          </CommonDescription>
          <div className="mb-10 mt-10 md:mt-16 flex justify-center lg:justify-start">
            <CommonButton>{t('common.becomeAChef')}</CommonButton>
          </div>
        </div>
        <div className="w-full lg:w-[50%]">
          <ChefTestimonial />
        </div>
      </div>
    </div>
  );
};

export default EveryoneChefSection;
