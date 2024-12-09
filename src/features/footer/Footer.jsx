import { Stack, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import arrow from '../../assets/svgs/arrow.svg';
import footerImage1 from '../../assets/footer1.png';
import footerImage2 from '../../assets/footer2.jpg';
import footerImage3 from '../../assets/footer3.jpg';
import {
  FOOTER_ELEMENT_L,
  FOOTER_ELEMENT_R,
  SOCIAL_MEDIA_LINKS,
} from 'src/app/constants';
const FooterBox = styled(Stack)(({ theme }) => ({
  width: '100%',
  zIndex: 100,
  background: theme.palette.background.footer.primary,
}));

const Footer = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [footerImage1, footerImage2, footerImage3];
  const { t } = useTranslation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.email.value);
  };

  return (
    <FooterBox>
      <div className="flex justify-between flex-col-reverse gap-10 lg:flex-row">
        <div className="flex flex-col lg:flex-col xl:flex-row justify-between w-full mb-3 relative px-8 lg:mt-24 lg:mb-16 lg:ml-0 2xl:mt-32 2xl:ml-32">
          <div className="space-y-5 mb-0 lg:mb-5 xl:mb-0">
            <h3 className="text-footerText tracking-tight font-lato text-base lg:text-xl font-medium uppercase">
              {t('footer.signUpForNewsLetter')}
            </h3>
            <form onSubmit={handleSubmit} className="flex">
              <input
                name="email"
                className="bg-roshoon-background placeholder:text-text-footerEmail font-normal focus:outline-none pl-7 font-lato text-base w-full lg:text-2xl text-text-footerEmail"
                placeholder="Email address"
                type="text"
              />
              <button className="flex bg-icon-primary p-5 justify-center items-center">
                <img src={arrow} alt="" />
              </button>
            </form>
            <h4 className="text-footerText hidden absolute bottom-0 lg:flex gap-1 tracking-tighter font-lato text-xl font-medium">
              {t('footer.needSomeHelp')}
              <Link to="" className="border-b border-footerText">
                {t('footer.getInTouch')}
              </Link>
            </h4>
          </div>
          <div>
            <div className="flex flex-col mt-8 lg:mt-0 lg:flex-col xl:flex-row justify-between gap-5 xl:gap-32">
              <div className="flex flex-row lg:flex-row justify-between xl:flex-col lg:justify-between xl:justify-normal gap-8">
                <div className="flex flex-col gap-8">
                  {FOOTER_ELEMENT_L.map((element, index) => (
                    <Link
                      key={index}
                      to={element.path}
                      className="underline text-footerText text-lg font-medium font-lato border-secondary"
                    >
                      {t(element.name)}
                    </Link>
                  ))}
                </div>
                <div className="flex flex-col gap-8">
                  {FOOTER_ELEMENT_R.map((element, index) => (
                    <Link
                      key={index}
                      to={element.path}
                      className="underline text-footerText text-lg font-medium font-lato border-secondary"
                    >
                      {t(element.name)}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex flex-row lg:flex-row xl:flex-col lg:mb-10 xl:mb-0 gap-5">
                {SOCIAL_MEDIA_LINKS.map((media, index) => (
                  <a
                    href={media.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={index}
                  >
                    <button className="bg-icon-primary text-text-secondary p-2 sm:p-3 md:p-4 rounded-full">
                      <media.icon className={`${media.className}`} />
                    </button>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <h4 className="text-footerText flex justify-center mt-14 md:mt-10 lg:hidden gap-1 tracking-tighter font-lato text-xl font-medium">
            {t('footer.needSomeHelp')}
            <Link to="" className="border-b border-footerText">
              {t('footer.getInTouch')}
            </Link>
          </h4>
        </div>
        <div
          className="w-full h-80 md:h-96 relative lg:w-full lg:h-full xl:h-full xl:w-1/2 2xl:w-[45%] bg-cover bg-center"
          style={{
            backgroundImage: `url(${images[currentImage]})`,
            transition: 'background-image 1s ease-in',
          }}
        >
          <h4 className="text-secondary bg-roshoonBackground absolute bottom-10 left-10 w-40 px-5 py-2 rounded-full text-2xl font-medium font-inter">
            @Roshoon
          </h4>
        </div>
      </div>
    </FooterBox>
  );
};

export default Footer;
