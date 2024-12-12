import React from 'react';
import OrderNow from 'src/components/LandingComponents/OrderNow';
import Carousel from 'src/components/LandingPageComponents/Carousel';
import LearnMore from 'src/components/LandingPageComponents/LearnMore';
import { slides } from 'src/data/Slides';

const LandingPageContent = () => {
  return (
    <div className="w-full flex flex-col">
      <OrderNow />
      <Carousel slides={slides} autoSlide={true} slideDuration={5} />
      <LearnMore />
    </div>
  );
};

export default LandingPageContent;
