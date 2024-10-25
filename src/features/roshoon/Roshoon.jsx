import React from 'react';
import { useSelector } from 'react-redux';
import SearchBar from 'src/components/SearchBar';
const Roshoon = () => {
  const roshoon = useSelector((state) => state.roshoon);

  function findMatchedChefs() {
    return roshoon.filteredChefs?.map((chef) => {
      const searchRegex = new RegExp(roshoon.search, 'i');
      return (
        <li
          key={chef.id}
        >{`${chef.name} located at ${chef.deliveryAreas.find((area) => searchRegex.test(area)) || 'unidentified area'}`}</li>
      );
    });
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-center w-100 h-60 bg-slate-100">
        <div className="flex flex-col justify-center items-center w-100 gap-4">
          <SearchBar />
          <div>
            <h1>
              Available Chefs: {roshoon.search && `for "${roshoon?.search}"`}
            </h1>
            <ul>{findMatchedChefs()}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roshoon;
