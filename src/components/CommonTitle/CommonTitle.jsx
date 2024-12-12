import React from 'react';

const CommonTitle = ({ className, title, children }) => {
  return (
    <h2
      className={`${className ? className : ''} font-julius text-2xl sm:text-3xl  md:text-5xl uppercase tracking-tight md:tracking-[-3px] md:leading-[57px] `}
    >
      {children || title || 'Common Title'}
    </h2>
  );
};

export default CommonTitle;
