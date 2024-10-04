import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  searchChefsByAddress,
  clearSearch,
} from '../../features/roshoon/roshoonsSlice';

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (searchText.trim() !== '') {
      dispatch(searchChefsByAddress(searchText));
      console.log(searchText);
    } else {
      dispatch(clearSearch());
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <input
        type="text"
        className="border border-gray-300 rounded px-4 py-2 text-black"
        placeholder="Enter delivery address"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="bg-orange-500 text-white px-4 py-2 rounded"
      >
        Search Here
      </button>
    </div>
  );
};

export default SearchBar;
