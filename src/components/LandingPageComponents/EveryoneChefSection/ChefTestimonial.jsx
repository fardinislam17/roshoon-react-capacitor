import React, { useEffect, useState } from 'react';
import img1 from 'src/assets/images/chef-1.jpg';
import img2 from 'src/assets/images/chef-2.jpg';
import img3 from 'src/assets/images/chef-3.jpg';

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
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % data.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [data.length]);

  return (
    <div className="relative overflow-hidden w-full h-[483px]">
      <div className="w-full grid grid-cols-12 ">
        {/* Left Image Container */}
        <div
          className="w-full h-[483px] relative bg-cover bg-center custom-animation col-span-5"
          style={{
            backgroundImage: `url(${data[index].img})`,
            transition: 'background-image 1s ease-in',
          }}
        >
          <div className="absolute inset-0 flex items-end p-5">
            <button
              className="bg-greenPrimary text-white text-sm rounded-full py-1 px-3 font-semibold"
              style={{ transition: 'background-image 1s ease-in' }}
            >
              @{data[index].name}
            </button>
          </div>
        </div>

        {/* Right Text Content */}
        <div className="w-full flex flex-col pt-10 md:pt-[66px] pb-10 md:pb-12 px-5 md:px-10 lg:px-5 2xl:px-10 bg-light h-full col-span-7">
          <p
            className="font-lato text-greenPrimary leading-[40px] tracking-[-1px] text-xl"
            style={{ transition: 'background-image 1s ease-in' }}
          >
            {data[index].description}
          </p>
          <div className="flex flex-col justify-end h-full">
            <p
              className="text-sm text-greenPrimary font-medium"
              style={{ transition: 'background-image 1s ease-in' }}
            >
              {data[index].name}
            </p>
            <p
              className="text-sm text-text-greenOlive uppercase py-3"
              style={{ transition: 'background-image 1s ease-in' }}
            >
              {data[index].role}
            </p>
            <p
              className="text-sm text-greenPrimary"
              style={{ transition: 'background-image 1s ease-in' }}
            >
              {data[index].designation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChefTestimonial;
