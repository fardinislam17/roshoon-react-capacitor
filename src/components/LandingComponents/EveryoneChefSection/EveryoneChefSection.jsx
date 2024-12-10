import React from 'react';
import CommonButton from 'src/components/CommonButton';
import CommonDescription from 'src/components/CommonDescription';
import CommonTitle from 'src/components/CommonTitle';

const EveryoneChefSection = () => {
  return (
    <div className="max-w-[1657px] px-5 md:px-10 2xl:px-0 mx-auto mb-10">
      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="">
          <CommonTitle>Everyone can be a chef in their own kitchen</CommonTitle>
          <CommonDescription className={'text-neutral pt-4'}>
            Indulge in the flavors of home, support local talent, and become
            part of a community that values the love and care that goes into
            every homemade meal.
          </CommonDescription>
          <div className="mt-[60px]">
            <CommonButton>Become a Chef</CommonButton>
          </div>
        </div>
        <div className=""></div>
      </div>
    </div>
  );
};

export default EveryoneChefSection;
