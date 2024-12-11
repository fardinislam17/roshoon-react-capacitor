import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CommonButton from 'src/components/CommonButton';
import bg1 from 'src/assets/images/ordernow1.png';
import bg2 from 'src/assets/images/ordernow2.png';
import bg3 from 'src/assets/images/ordernow3.png';
import bg4 from 'src/assets/images/ordernow4.png';
import bg5 from 'src/assets/images/ordernow5.png';
const OrderNow = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const { t } = useTranslation();
  const images = [bg1, bg2, bg3, bg4, bg5];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [images.length]);
  return (
    <div
      style={{
        backgroundImage: `url(${images[currentImage]})`,
        transition: 'background-image 1s ease-in',
      }}
      className="py-36 bg-fixed lg:py-0 mb-10 bg-cover bg-center lg:h-[1074px] flex flex-col justify-center items-center space-y-8"
    >
      <h2 className="text-2xl z-10 sticky lg:text-6xl text-white text-center font-julius">
        Home-Cooked <br /> Goodness
      </h2>
      <p className="font-lato z-10 sticky text-center w-[80%] md:w-3/4 lg:w-1/2 text-base lg:text-lg text-white">
        At Roshoon, we believe that home-cooked food is more than just a meal -
        it's a taste of warmth, comfort, and love. Fulfill your craving for the
        flavors of home!
      </p>
      <div className="sticky z-10">
        <CommonButton>{t('common.orderNow')}</CommonButton>
      </div>
    </div>
  );
};

export default OrderNow;
