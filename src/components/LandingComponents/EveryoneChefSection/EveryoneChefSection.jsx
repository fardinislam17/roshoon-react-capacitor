import React from 'react';
import CommonButton from 'src/components/CommonButton';
import CommonDescription from 'src/components/CommonDescription';
import CommonTitle from 'src/components/CommonTitle';
import ChefTestimonial from './ChefTestimonial';

const EveryoneChefSection = () => {
  return (
    <div className="container px-5  mx-auto mb-10">
      <div className=" flex flex-col lg:flex-row gap-6 2xl:gap-16">
        <div className="w-full lg:w-[45%] text-center lg:text-left">
          <CommonTitle>Everyone can be a chef in their own kitchen</CommonTitle>
          <CommonDescription className={'text-neutral pt-4'}>
            Indulge in the flavors of home, support local talent, and become
            part of a community that values the love and care that goes into
            every homemade meal.
          </CommonDescription>
          <div className="mt-[60px] flex justify-center lg:justify-start">
            <CommonButton>Become a Chefs</CommonButton>
          </div>
        </div>
        <div className="w-full lg:w-[55%] ">
          <ChefTestimonial />
        </div>
      </div>
    </div>
  );
};

export default EveryoneChefSection;
