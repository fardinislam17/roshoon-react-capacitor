import { useEffect, useState, useRef } from 'react';
import {
  Stack,
  styled,
  AppBar as MuiAppBar,
  Toolbar,
  Menu,
  MenuItem,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../session'; // import the logout action

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
  const menuAnchorRef = useRef(null); // use ref for the menu anchor

  // states
  const [open, setOpen] = useState(false);

  const logOut = () => {
    dispatch(logout()); 
    setOpen(false); 
    navigate('/login');
  };

  const handleMenuClose = () => {
    setOpen(false);
  };

  // toggle menu open/close
  const handleMenuClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  useEffect(() => {
    console.log(
      'session',
      session,
      session.authenticationType.includes(['google', 'facebook', 'roshoon'])
    );
  }, [session]);

  return (
    <StyledAppBar>
      <Toolbar disableGutters className="flex justify-between">
        <BarHeader>
          <h1 className="text-3xl w-full text-slate-300 mx-3 font-bold">
            Roshoon
          </h1>
        </BarHeader>
        <div className="flex gap-4 mr-4">
          {session?.user &&
          ['google', 'facebook', 'roshoon'].includes(
            session.authenticationType
          ) ? (
            <div className="flex justify-center items-center gap-2">
              <h1 className="text-white text-sm">{session.user?.name}</h1>
              <IconButton
                onClick={handleMenuClick}
                ref={menuAnchorRef}
                aria-controls={open ? 'menu-appbar' : undefined}
                aria-haspopup="true"
                className='w-14'
              >
                <img
                  src={session.user?.picture}
                  alt={session.user?.name}
                  className="w-full h-full object-cover rounded-full cursor-pointer"
                  onError={(e) => {
                    e.target.src = '/path/to/default-image.jpg'; // Fallback image if error
                  }}
                />
              </IconButton>
              <Menu
                anchorEl={menuAnchorRef.current}
                open={open}
                onClose={handleMenuClose}
                id="menu-appbar"
              >
                <MenuItem onClick={() => navigate('/profile')}>
                  Profile
                </MenuItem>
                <MenuItem onClick={logOut}>Logout</MenuItem>
              </Menu>
            </div>
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
