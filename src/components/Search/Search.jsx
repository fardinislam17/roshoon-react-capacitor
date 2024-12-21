import React from 'react';
import { FiFilter, FiSearch } from 'react-icons/fi';

const Search = () => {
  return (
    <div className="flex items-center border  max-w-md xl:max-w-[470px] h-12 px-4">
      <FiSearch className="text-gray-500 text-xl mr-2" />
      <input
        type="text"
        placeholder="Search"
        className="font-lato text-neutral outline-none text-sm"
      />
      <FiFilter className="text-gray-500 text-xl ml-2" />
    </div>
  );
};

export default Search;
