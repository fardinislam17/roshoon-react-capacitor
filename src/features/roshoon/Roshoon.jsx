import React from 'react';
import Carousel from 'src/components/Carousel';
import LearnMore from 'src/components/LandingComponents/LearnMore';
import OrderNow from 'src/components/LandingComponents/OrderNow';
import { slides } from 'src/data/Slides';

const Roshoon = () => {
  return (
    <div className="w-full flex flex-col">
      <OrderNow />
      <Carousel slides={slides} autoSlide={true} slideDuration={5} />
      <LearnMore />
    </div>
  );
};

export default Roshoon;
