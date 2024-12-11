import React, { useEffect, useRef, useState } from 'react';
import img1 from '../../../assets/images/chef-1.jpg';
import img2 from '../../../assets/images/chef-2.jpg';
import img3 from '../../../assets/images/chef-3.jpg';

const data = [
  {
    id: 1,
    img: img1,
    description: 'Roshoon helped me to minimize my work load.',
    name: 'Jon Doe',
    role: 'Chef',
    designation: 'Specialized in baking',
  },
  {
    id: 2,
    img: img2,
    description: 'Roshoon helped me to minimize my work load-2.',
    name: 'David Smith',
    role: 'Chef-2',
    designation: 'Specialized in baking-2',
  },
  {
    id: 3,
    img: img3,
    description: 'Roshoon helped me to minimize my work load-3.',
    name: 'Jenni Waytt',
    role: 'Chef-3',
    designation: 'Specialized in baking-3',
  },
];

const ChefTestimonial = () => {
  const [index, setIndex] = useState(1);
  const transitionRef = useRef(null);

  const slides = [data[data.length - 1], ...data, data[0]]; // Clone first and last items

  const handleTransitionEnd = () => {
    // Reset position for seamless looping
    if (index === 0) {
      setIndex(data.length);
      transitionRef.current.style.transition = 'none';
    } else if (index === slides.length - 1) {
      setIndex(1);
      transitionRef.current.style.transition = 'none';
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
      transitionRef.current.style.transition = 'transform 1s ease-in-out';
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Apply seamless reset transition after transition end
    transitionRef.current.style.transform = `translateX(-${index * 100}%)`;
  }, [index]);

  return (
    <div className="relative overflow-hidden w-full h-[483px]">
      <div
        ref={transitionRef}
        className="flex transition-transform duration-1000 ease-in-out"
        onTransitionEnd={handleTransitionEnd}
        style={{
          transform: `translateX(-${index * 100}%)`,
        }}
      >
        {slides.map((item, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-full grid grid-cols-2 2xl:grid-cols-[387px,auto]"
            style={{ width: '100%' }}
          >
            {/* Left Image Container */}
            <div className="w-full h-[483px] relative">
              <img
                src={item.img}
                alt={`chef-${item.id}`}
                className="h-full w-full object-cover "
              />

              <button className="absolute left-5 bottom-3 bg-primaryGreen text-white rounded-full py-1 px-3 font-semibold">
                {' '}
                @ {item.name}{' '}
              </button>
            </div>

            {/* Right Text Content */}
            <div className="flex flex-col pt-10 md:pt-[66px] pb-10 md:pb-12 px-5 md:px-10 bg-lightShade h-full">
              <p className="font-lato text-primaryGreen leading-[40px] tracking-[-1px] text-xl ">
                {item.description}
              </p>

              <div className="flex flex-col justify-end h-full">
                <p className="text-base text-primaryGreen">{item.name}</p>
                <p className="text-sm text-text-lightGreen uppercase py-3">
                  {item.role}
                </p>
                <p className="text-sm text-primaryGreen">{item.designation}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChefTestimonial;
