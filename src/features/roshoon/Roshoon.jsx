import React from 'react';
import { useSelector } from 'react-redux';

const Roshoon = () => {
  const searchText = useSelector((state) => state.roshoonsSlice?.search);
  return (
    <div>
      <h1>{
        searchText && searchText.length > 0
          ? `Search results for "${searchText}"`
          : 'Roshoon'
      }</h1>
    </div>
  );
};

export default Roshoon;
