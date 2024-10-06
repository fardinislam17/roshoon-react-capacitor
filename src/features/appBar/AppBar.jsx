import React from 'react';
import { Stack, styled, AppBar as MuiAppBar, Toolbar } from '@mui/material';
import SearchBar from '@/components/SearchBar';

const BarHeader = styled(Stack)(({ theme }) => ({
  color: theme.palette.common.white,
}));

const StyledAppBar = styled(MuiAppBar)(({ theme }) => ({
  height: 80,
  padding: 4,
}));

const AppBar = () => {
  return (
    <StyledAppBar>
      <Toolbar disableGutters className='flex justify-between'>
        <BarHeader>
          <h1 className="text-3xl w-full text-slate-300 mx-3 font-bold">
            Roshoon
          </h1>
        </BarHeader>
        <SearchBar />
      </Toolbar>
    </StyledAppBar>
  );
};

export default AppBar;
