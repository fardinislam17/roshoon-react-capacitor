import { useEffect, useState } from 'react';
import { Stack, styled, AppBar as MuiAppBar, Toolbar } from '@mui/material';
import SearchBar from '@/components/SearchBar';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../session';
import axios from 'axios';

const BarHeader = styled(Stack)(({ theme }) => ({
  color: theme.palette.common.white,
}));

const StyledAppBar = styled(MuiAppBar)(({ theme }) => ({
  height: 80,
  padding: 4,
}));

const AppBar = () => {
  const navigate = useNavigate();
  const session = useSelector((state) => state.session);
  const dispatch = useDispatch();
  
  
  //function
  useEffect(() => {
    console.log('triggering');
    if (session.userApiData) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${session.userApiData.credential}`,
          {
            headers: {
              Authorization: `Bearer ${session.userApiData.credential}`,
              Accept: 'application/json',
            },
          }
        )
        .then((res) => {
          console.log('res.data', res.data);
          dispatch(login(res.data));
        })
        .catch((err) => console.log(err));
    }
  }, [session.userApiData]);
  
  const logOut = () => {
    googleLogout();
    setProfile(null);
  };
  
  return (
    <StyledAppBar>
      <Toolbar disableGutters className="flex justify-between">
        <BarHeader>
          <h1 className="text-3xl w-full text-slate-300 mx-3 font-bold">
            Roshoon
          </h1>
        </BarHeader>
        <div className="flex gap-4 mr-4">
          {session?.userApiData ? (
            <>{session.userApiData.clientId}</>
          ) : session?.user  ? (
          <>
            <div className='round-full w-10 h-10 bg-slate-400'>
              <img src={session.user.picture} alt={session.user.name} className='w-full h-full object-cover rounded-full'/>
            </div>
          </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </Toolbar>
    </StyledAppBar>
  );
};

export default AppBar;
