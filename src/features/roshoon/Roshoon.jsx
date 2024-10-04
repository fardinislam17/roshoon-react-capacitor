import React from 'react';
import { useSelector } from 'react-redux';

const Roshoon = () => {
  //const filteredChefs = useSelector((state) => state.roshoons?.filteredChefs);
  const search = useSelector((state) => state.roshoonsSlice.search);

  return (
    <div>
      <h1>Available Chefs {search && `for "${search}"`}</h1>
      {/* <ul>
        {filteredChefs?.map((chef) => (
          <li key={chef.id}>{chef.name}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default Roshoon;
