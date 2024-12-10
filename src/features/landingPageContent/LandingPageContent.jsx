import React from 'react';
import Carousel from 'src/components/LandingPageComponents/Carousel';
import LearnMore from 'src/components/LandingPageComponents/LearnMore';
import { slides } from 'src/data/Slides';

const LandingPageContent = () => {
  return (
    <div className="w-full flex flex-col">
      <Carousel slides={slides} autoSlide={true} slideDuration={3} />
      <LearnMore />
    </div>
  );
};

export default LandingPageContent;
