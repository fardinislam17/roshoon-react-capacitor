import React from 'react';
import Carousel from 'src/components/LandingPageComponents/Carousel';
import EveryoneChefSection from 'src/components/LandingPageComponents/EveryoneChefSection';
import LearnMore from 'src/components/LandingPageComponents/LearnMore';
import LandingFeature from 'src/components/LandingPageComponents/MealOpportunityCommunity';
import OrderNow from 'src/components/LandingPageComponents/OrderNow';
import { slides } from 'src/data/Slides';

const LandingPageContent = () => {
  return (
    <div className="w-full flex flex-col">
      <OrderNow />
      <Carousel slides={slides} autoSlide={true} slideDuration={5} />
      <LearnMore />
      <LandingFeature />
      <EveryoneChefSection />
    </div>
  );
};

export default LandingPageContent;
