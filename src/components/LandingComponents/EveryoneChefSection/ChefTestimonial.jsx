import React, { useEffect, useState } from 'react';
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
        setIsAnimating(false);
      }, 1000); // Match animation duration
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden w-full h-[483px]">
      <div className="relative w-full h-full">
        {data.map((item, index) => {
          const isActive = index === currentIndex;
          const isPrevious =
            index === (currentIndex - 1 + data.length) % data.length;

          return (
            <div
              key={item.id}
              className={`absolute top-0 left-0 w-full h-full flex grid-cols-[387px,auto] transition-transform duration-1000 ease-in-out ${
                isActive
                  ? 'translate-x-0'
                  : isPrevious
                    ? '-translate-x-full'
                    : 'translate-x-full'
              }`}
            >
              {/* Left Image Container */}
              <div className="w-[387px] h-[483px]">
                <img
                  src={item.img}
                  alt={`chef-${item.id}`}
                  className="h-full w-full"
                />
              </div>

              {/* Right Text Content */}
              <div className="flex flex-col pt-[66px] pb-12 px-10 bg-lightShade bg-[#E6E4C6]">
                <p className="font-lato text-primaryGreen leading-[40.8px] tracking-[-1.4px] text-[21.4px] pb-20">
                  {item.description}
                </p>
                <p className="text-[15px] text-primaryGreen">{item.name}</p>
                <p className="text-[13px] text-text-lightGreen uppercase py-3">
                  {item.role}
                </p>
                <p className="text-[13px] text-primaryGreen">
                  {item.designation}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChefTestimonial;
