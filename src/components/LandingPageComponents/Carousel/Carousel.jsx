import React, { useState, useEffect, useCallback } from 'react';
import CarouselItem from './CarouselItem';

const Carousel = ({
  slides,
  autoSlide = false,
  slideDuration = 4,
  carouselHeight = '750px',
  carouselWidth = '100%',
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  }, [slides.length]);

  const goToSlide = (index) => setCurrentSlide(index);

  // Handle auto-sliding functionality
  useEffect(() => {
    if (!autoSlide) return;

    const intervalId = setInterval(nextSlide, slideDuration * 1000);
    return () => clearInterval(intervalId);
  }, [autoSlide, slideDuration, nextSlide]);

  return (
    <div
      className="relative overflow-hidden"
      style={{ height: carouselHeight, width: carouselWidth }}
    >
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <CarouselItem
            key={index}
            slide={slide}
            height={carouselHeight}
            isActive={index === currentSlide}
          />
        ))}
      </div>
      {/*  Pagination Dots  */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-[5px]">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-[5px] h-[5px] rounded-full ${
              index === currentSlide ? 'bg-greenOlive' : 'bg-grayLight'
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
