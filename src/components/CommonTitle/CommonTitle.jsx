import React from 'react';

const CommonTitle = ({ className, title, children }) => {
  return (
    <h2
      className={`${className ? className : ''} font-julius text-2xl  md:text-[48px] uppercase traking-tight md:traking-[-3px] md:leading-[57px] text-center lg:text-left`}
    >
      {children || title || 'Common Title'}
    </h2>
  );
};

export default CommonTitle;
