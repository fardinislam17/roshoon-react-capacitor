import React from 'react';
import CommonButton from 'src/components/CommonButton';
import CommonDescription from 'src/components/Typography/CommonDescription';
import CommonTitle from 'src/components/Typography/CommonTitle';

const ImageContentLayout = ({
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
      } items-center gap-5 lg:gap-20 justify-between`}
    >
      {/* Image Section */}
      <div className="w-full sm:w-1/2">
        <img
          src={image}
          alt={title}
          className="w-full h-[300px] sm:h-[400px] lg:h-[637px]  object-cover "
        />
      </div>

      {/* Text Section */}
      <div className="w-full sm:w-1/2 text-center lg:text-left px-5 sm:px-0 ">
        <CommonTitle className={'text-center tracking-normal pt-3 sm:pt-0'}>
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

export default ImageContentLayout;
