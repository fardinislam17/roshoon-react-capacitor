import React from 'react';
import { Stack, styled, AppBar as MuiAppBar, Toolbar } from '@mui/material';
import SearchBar from '@/components/SearchBar';
import { useNavigate } from 'react-router-dom';

const BarHeader = styled(Stack)(({ theme }) => ({
  color: theme.palette.common.white,
}));

const StyledAppBar = styled(MuiAppBar)(({ theme }) => ({
  height: 80,
  padding: 4,
}));

const AppBar = () => {
  const navigate = useNavigate();
  return (
    <StyledAppBar>
      <Toolbar disableGutters className="flex justify-between">
        <BarHeader>
          <h1 className="text-3xl w-full text-slate-300 mx-3 font-bold">
            Roshoon
          </h1>
        </BarHeader>
        <div className="flex gap-4 mr-4">
          <button
            onClick={() => navigate('/login')}
            className="bg-orange-700 text-white px-4 py-2 rounded"
          >
            Login
          </button>

          <button
            onClick={() => navigate('/register')}
            className="bg-orange-400 text-white px-4 py-2 rounded"
          >
            Sign Up
          </button>
        </div>
      </Toolbar>
    </StyledAppBar>
  );
};

export default AppBar;
