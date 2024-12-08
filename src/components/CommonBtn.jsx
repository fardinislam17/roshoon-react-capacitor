import React from 'react';

const CommonBtn = ({ className, title, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative overflow-hidden 
        font-lato px-6 py-4 xl:px-[44px] xl:py-[31px] text-white text-sm uppercase bg-[#50704C] 
        tracking-[.66px]  transition-all duration-300 
        ${className ? className : ''}
        before:content-[''] before:absolute before:inset-0 before:bg-white 
        before:w-[300%] before:h-[300%] before:rounded-full before:scale-0 
        before:origin-bottom-center before:transition-transform before:duration-500 
        hover:before:scale-100 hover:text-[#50704C]
      `}
    >
      <span className="relative z-10">
        {children || title || 'Button Title'}
      </span>
    </button>
  );
};

export default CommonBtn;
