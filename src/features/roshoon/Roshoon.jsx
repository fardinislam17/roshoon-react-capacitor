import React from 'react';
import Carousel from 'src/components/Carousel';
import { slides } from 'src/data/Slides';

const Roshoon = () => {
  return (
    <div className="flex flex-col">
      <div className="p-4">
        <Carousel slides={slides} autoSlide={true} slideDuration={5} />
      </div>
    </div>
  );
};

export default Roshoon;
