import React from 'react';

const CommonButton = ({ className, title, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={`
    relative overflow-hidden 
    font-lato px-6 h-[32px] md:h-[62px] flex items-center justify-center text-white 
    text-sm  bg-primaryGreen
    tracking-[.66px] transition-all duration-500
    ${className ? className : ''}
    before:content-[''] before:absolute before:inset-0 before:bg-secondaryGreen 
    before:w-[300%] before:h-[300%] before:rounded-full before:scale-0 
    before:origin-bottom-center before:transition-transform before:duration-500 
    hover:before:scale-100 hover:text-text-primary hover:bg-secondaryGreen
  `}
    >
      <span className="relative z-10">
        {children || title || 'Button Title'}
      </span>
    </button>
  );
};

export default CommonButton;
