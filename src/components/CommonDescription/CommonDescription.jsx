import React from 'react';

const CommonDescription = ({ className, title, children }) => {
  return (
    <h2
      className={`${className ? className : ''} font-lato text-[18px]  leading-[30.4px] `}
    >
      {children || title || 'This is Description'}
    </h2>
  );
};

export default CommonDescription;
