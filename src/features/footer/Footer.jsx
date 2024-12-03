import { Stack, styled, TextField } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const FooterBox = styled(Stack)(({ theme }) => ({

  width: '100%',
  zIndex: 100,
  background: theme.palette.background.footer,
}));

const Footer = () => {
  const handleSubmit = event => {
    event.preventDefault()
    console.log(event.target.email.value);
    
  }
  return <FooterBox>
    <div className=' flex justify-between flex-col-reverse gap-10  lg:flex-row'>
      <div className='flex flex-col  lg:flex-col xl:flex-row justify-between w-full mb-3 relative px-8 lg:mt-24 lg:mb-16 lg:ml-0 2xl:mt-32 2xl:ml-32 '>
        <div className='space-y-5 mb-0 lg:mb-5 xl:mb-0'>
          <h3 className='footer-text-color tracking-tight font-lato text-base lg:text-xl font-medium uppercase'>Sign up for our Newsletter</h3>
          <form onSubmit={handleSubmit} className='flex'>
            <input name='email' className='bg-[#E6E4C6] placeholder:text-[#50704C] font-normal focus:outline-none pl-7 font-lato text-base w-full lg:text-2xl text-[#50704C]' placeholder='Email address' type="text" />
            <button className='flex bg-[#B2D99A] p-5 justify-center items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="22" viewBox="0 0 31 27" fill="none">
                <g clip-path="url(#clip0_24_1693)">
                  <path d="M1.84766 13.5449H27.5757" stroke="#195908" stroke-width="2.19761" stroke-linecap="square" stroke-linejoin="round" />
                  <path d="M19 3.55273L29.0053 13.5453L19 23.5378" stroke="#195908" stroke-width="2.19761" stroke-linecap="square" />
                </g>
                <defs>
                  <clipPath id="clip0_24_1693">
                    <rect width="30.7665" height="26.3713" fill="white" transform="translate(0.0625 0.380859)" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </form>
          <h4 className='footer-text-color hidden absolute bottom-0 lg:flex gap-1 tracking-tighter font-lato text-xl font-medium'>Need some help?<Link to='' className='border-b border-[#BBD6B8]'>Get in touch</Link></h4>
        </div>
        <div>
          <div className='flex flex-col mt-8 lg:mt-0 lg:flex-col xl:flex-row justify-between gap-5 xl:gap-32'>
            <div className='flex flex-row lg:flex-row xl:flex-col justify-between gap-8'>
              <div className='flex flex-col gap-8'>
              <Link to='' className='underline footer-text-color text-base lg:text-lg font-medium font-lato border-[#BBD6B8]'>Our Services</Link>
              <Link to='' className='underline footer-text-color text-base lg:text-lg font-medium font-lato border-[#BBD6B8]'>Become chef</Link>
              <Link to='' className='underline footer-text-color text-base lg:text-lg font-medium font-lato border-[#BBD6B8]'>FAQ</Link>
              </div>
              <div className='flex flex-col gap-8'>
              <Link to='' className='underline footer-text-color text-base lg:text-lg font-medium font-lato border-[#BBD6B8]'>Account</Link>
              <Link to='' className='underline footer-text-color text-base lg:text-lg font-medium font-lato border-[#BBD6B8]'>Terms of Service</Link>
              <Link to='' className='underline footer-text-color text-base lg:text-lg font-medium font-lato border-[#BBD6B8]'>Privacy Policy</Link>
              </div>
            </div>
            <div className='flex flow-row lg:flex-row xl:flex-col
             lg:mb-10 xl:mb-0 gap-5'>
              <Link to='' >
                <button className='bg-[#B2D99A] rounded-full'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="59" height="59" viewBox="0 0 59 59" fill="none">
                    <path d="M36.1832 39.99H22.4142C20.5115 39.99 18.957 38.4355 18.957 36.5328V22.7638C18.957 20.8611 20.5115 19.3066 22.4142 19.3066H36.1832C38.0861 19.3066 39.6405 20.8611 39.6405 22.7638V36.5328C39.6405 38.444 38.0946 39.99 36.1832 39.99Z" fill="#195908" />
                    <path d="M29.3049 34.9616C27.8864 34.9616 26.5528 34.4094 25.5505 33.4071C24.5483 32.4047 23.9961 31.0712 23.9961 29.6527C23.9961 28.2341 24.5483 26.9006 25.5505 25.8982C26.5528 24.8959 27.8864 24.3438 29.3049 24.3438C30.7236 24.3438 32.0571 24.8959 33.0595 25.8982C34.0617 26.9006 34.6139 28.2341 34.6139 29.6527C34.6139 31.0712 34.0617 32.4047 33.0595 33.4071C32.0486 34.4094 30.7236 34.9616 29.3049 34.9616ZM29.3049 25.4735C27.003 25.4735 25.1258 27.3423 25.1258 29.6527C25.1258 31.9547 26.9945 33.8319 29.3049 33.8319C31.6069 33.8319 33.4842 31.9632 33.4842 29.6527C33.4757 27.3508 31.6069 25.4735 29.3049 25.4735Z" fill="#B2D99A" />
                    <path d="M35.6483 24.1695C36.2112 24.1695 36.6676 23.7131 36.6676 23.1501C36.6676 22.5872 36.2112 22.1309 35.6483 22.1309C35.0853 22.1309 34.6289 22.5872 34.6289 23.1501C34.6289 23.7131 35.0853 24.1695 35.6483 24.1695Z" fill="#B2D99A" />
                  </svg>
                </button>
              </Link>
              <Link to='' >
                <button className='bg-[#B2D99A] rounded-full'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="59" height="59" viewBox="0 0 59 59" fill="none">
                    <path d="M34.2608 19.4206L33.7029 18.541H30.3268V26.4635L30.3154 34.2022C30.3211 34.2596 30.3268 34.3229 30.3268 34.3804C30.3268 36.3179 28.751 37.8989 26.807 37.8989C24.8629 37.8989 23.287 36.3236 23.287 34.3804C23.287 32.4428 24.8629 30.8618 26.807 30.8618C27.2096 30.8618 27.6006 30.9366 27.9629 31.063V27.1995C27.5892 27.1363 27.2037 27.1017 26.807 27.1017C22.7981 27.1074 19.5312 30.3731 19.5312 34.3861C19.5312 38.3992 22.7981 41.6647 26.8127 41.6647C30.8273 41.6647 34.0941 38.3992 34.0941 34.3861V25.1815C35.5492 26.636 37.4299 28.0561 39.5119 28.5103V24.5606C37.2516 23.5602 35.0029 20.605 34.2608 19.4206Z" fill="#195908" />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>
        <h4 className='footer-text-color flex justify-center mt-14 md:mt-10  lg:hidden gap-1 tracking-tighter font-lato text-xl font-medium'>Need some help?<Link to='' className='border-b border-[#BBD6B8]'>Get in touch</Link></h4>
      </div>
      
      <img className='' src="./footer-img.png" alt="" />
    </div>
  </FooterBox>;
};

export default Footer;
