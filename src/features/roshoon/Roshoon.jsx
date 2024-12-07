import React from 'react';
import Carousel from 'src/components/Carousel';
import LearnMore from 'src/components/LandingComponents/LearnMore';
import { slides } from 'src/data/Slides';

const Roshoon = () => {
  return (
    <div className="w-full flex flex-col">
      <Carousel slides={slides} autoSlide={true} slideDuration={5} />
      <LearnMore />
    </div>
  );
};

export default Roshoon;
