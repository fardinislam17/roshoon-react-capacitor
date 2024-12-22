import React from 'react';
import { FiFilter, FiSearch } from 'react-icons/fi';

const Search = () => {
  return (
    <div className="flex items-center border  max-w-md xl:max-w-[300px] 2xl:w-[427px] h-12 px-4 relative">
      {/* Left Icon */}
      <FiSearch className="text-text-midGray text-xl absolute left-4 pointer-events-none" />

      {/* Input Field */}
      <input
        type="text"
        placeholder="Search"
        className="font-lato text-neutral outline-none text-sm w-full pl-7 pr-10"
      />

      {/* Right Icon */}
      <FiFilter className="text-text-midGray text-xl absolute right-4 cursor-pointer" />
    </div>
  );
};

export default Search;
