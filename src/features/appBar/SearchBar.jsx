// src/features/appBar/SearchBar.jsx

import React, { useState } from 'react';
import { TextField, Button, Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import { searchChefsByAddress } from '@/features/roshoon/roshoonsSlice.js'; 

const SearchBar = () => {
  const [address, setAddress] = useState('');
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (address.trim()) {
      dispatch(searchChefsByAddress(address)); 
    }
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center" className="mr-4">
      <TextField
        variant="outlined"
        size="small"
        placeholder="Enter delivery address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="bg-white rounded-lg"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        disabled={!address.trim()}
      >
        Search
      </Button>
    </Stack>
  );
};

export default SearchBar;
