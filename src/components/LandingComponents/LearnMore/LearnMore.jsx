import React from 'react';
import { useTranslation } from 'react-i18next';
import img1 from 'src/assets/images/learn-more-house-1.png';
import img3 from 'src/assets/images/learn-more-leaf-3.png';
import img4 from 'src/assets/images/learn-more-tropical-leaves-4.png';
import img2 from 'src/assets/images/learn-more-whisk-2.png';
import CommonButton from 'src/components/CommonButton';

const LearnMore = () => {
  const { t } = useTranslation();

  return (
    <div className="xl:pb-[143px] py-10 xl:py-0 xl:pt-[120px] w-full my-20 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-0">
      <h2 className="text-[18px] md:text-2xl xl:text-[36px] text-center text-[#195908] uppercase font-julius">
        Roshoon Provides
      </h2>
      <p className="max-w-[1171px] uppercase mt-[30px] md:mt-16 xl:mt-[94px] mx-auto text-sm sm:text-base md:text-2xl xl:text-[60px] text-[#50704C] text-center font-julius xl:leading-[96px] tracking-tight  xl:tracking-[-6px] whitespace-nowrap">
        we connect you with passionate home
      </p>
      <p className="max-w-[1171px] uppercase  mx-auto text-base md:text-2xl xl:text-[60px] text-[#50704C] text-center  font-julius xl:leading-[96px]  xl:tracking-[-6px]">
        <span className="inline-block align-middle">
          <img
            src={img2}
            alt="img"
            className="inline w-[20px] h-[20px] md:w-[40px] md:h-[40px] object-contain"
          />
        </span>{' '}
        <span className="text-base md:text-2xl xl:text-[57px]">
          chefs who create delicious, homemade meals just for you. Enjoy the
          warmth of
        </span>
        <span className="inline-block align-middle">
          <img
            src={img4}
            alt="img"
            className="inline w-[20px] h-[20px] md:w-[40px] md:h-[40px] object-contain"
          />
        </span>{' '}
        <br />
        <span className="inline-block align-middle">
          <img
            src={img3}
            alt="img"
            className="inline w-[20px] h-[20px] md:w-[40px] md:h-[40px] object-contain"
          />
        </span>{' '}
        home-cooked flavors, made with love and delivered to your door.{' '}
        <span className="inline-block align-middle">
          <img
            src={img1}
            alt="img"
            className="inline w-[20px] h-[20px] md:w-[40px] md:h-[40px] object-contain"
          />
        </span>
      </p>

      <div className="flex justify-center mt-10 xl:mt-20">
        <CommonButton>{t('common.learnMoreAboutUs')}</CommonButton>
      </div>
    </div>
  );
};

export default LearnMore;
