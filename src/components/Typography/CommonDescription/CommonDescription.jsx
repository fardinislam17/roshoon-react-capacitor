import React from 'react';

const CommonDescription = ({ className, title, children }) => {
  return (
    <h2
      className={`${className ? className : ''} font-lato text-lg  leading-[30px] `}
    >
      {children || title || 'This is Description'}
    </h2>
  );
};

export default CommonDescription;
