import React from 'react';
import { useSelector } from 'react-redux';

const Roshoon = () => {
  const roshoon = useSelector((state) => state.roshoon);
  console.log('search object =>', roshoon);
  
  function findMatchedChefs(){
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
    <div>
      <h1>Available Chefs {roshoon.search && `for "${roshoon?.search}"`}</h1>
      <ul>
        {findMatchedChefs()}
      </ul>
    </div>
  );
};

export default Roshoon;