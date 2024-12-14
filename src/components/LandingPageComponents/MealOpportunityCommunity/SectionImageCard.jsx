import React from 'react';
import CommonButton from 'src/components/CommonButton';
import CommonDescription from 'src/components/CommonDescription';
import CommonTitle from 'src/components/CommonTitle';

const SectionImageCard = ({
  image,
  title,
  description,
  buttonText,
  imageOnLeft,
}) => {
  return (
    <div
      className={`flex flex-col ${
        imageOnLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'
      } items-center gap-5 lg:gap-10`}
    >
      {/* Image Section */}
      <div className="w-full sm:w-1/2">
        <img src={image} alt={title} className="w-full  object-contain " />
      </div>

      {/* Text Section */}
      <div className="w-full sm:w-1/2 text-center lg:text-left">
        <CommonTitle className={'text-center tracking-normal'}>
          {title}
        </CommonTitle>
        <CommonDescription className={'text-center pt-2 md:pt-4 lg:px-16'}>
          {description}
        </CommonDescription>
        {buttonText && (
          <div className="mb-10 mt-5 md:mt-8 lg:mt-10 xl:mt-16 flex justify-center">
            <CommonButton>{buttonText}</CommonButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionImageCard;
