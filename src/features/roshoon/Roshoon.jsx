import React from 'react';
import Carousel from 'src/components/Carousel';
import { slides } from 'src/data/Slides';

const Roshoon = () => {
  return (
    <div className="w-full flex flex-col">
      <Carousel slides={slides} autoSlide={true} slideDuration={5} />
    </div>
  );
};

export default Roshoon;
