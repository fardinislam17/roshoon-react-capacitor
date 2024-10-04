import React from 'react';
import { useSelector } from 'react-redux';

const Roshoon = () => {
  const roshoon = useSelector((state) => state.roshoon);
  console.log('search object =>', roshoon);
  return (
    <div>
      <h1>Available Chefs {roshoon.search && `for "${roshoon?.search}"`}</h1>
      <ul>
        {roshoon.filteredChefs?.map((chef) => (
          <li key={chef.id}>{chef.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Roshoon;