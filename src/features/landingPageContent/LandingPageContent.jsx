import React from 'react';
import Carousel from 'src/components/Carousel';
import EveryoneChefSection from 'src/components/LandingComponents/EveryoneChefSection';

import LearnMore from 'src/components/LandingComponents/LearnMore';
import { slides } from 'src/data/Slides';

const LandingPageContent = () => {
  return (
    <div className="w-full flex flex-col">
      <Carousel slides={slides} autoSlide={true} slideDuration={3} />
      <LearnMore />
      <EveryoneChefSection />
    </div>
  );
};

export default LandingPageContent;
