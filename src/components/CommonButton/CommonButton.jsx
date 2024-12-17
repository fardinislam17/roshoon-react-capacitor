import React from 'react';

const CommonButton = ({ className, title, onClick, children, type, form }) => {
  return (
    <button
      form={form}
      type={type}
      onClick={onClick}
      className={`${className && className} px-6 md:px-12 z-30 h-[32px] md:h-[62px] bg-greenPrimary text-white relative font-medium font-lato after:-z-20 after:absolute after:h-1 after:w-1 after:bg-greenSecondary after:rounded-md after:left-[50%] overflow-hidden after:bottom-0 after:translate-y-full  after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700   hover:text-text-primary hover:bg-greenSecondary tracking-[.66px]`}
    >
      {children || title || 'Button Title'}
    </button>
  );
};

export default CommonButton;
