import React from 'react';

const CommonTitle = ({ className, title, children }) => {
  return (
    <h2
      className={`${className ? className : ''} font-julius text-[48px] uppercase traking-[-3.3px] leading-[57.6px]`}
    >
      {children || title || 'Common Title'}
    </h2>
  );
};

export default CommonTitle;
