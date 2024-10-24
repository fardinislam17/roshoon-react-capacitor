import React, { useEffect, useState, useRef } from 'react';
import {
  Stack,
  styled,
  AppBar as MuiAppBar,
  Menu,
  MenuItem,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { logout } from '../session';
import HamburgerMenu from 'src/components/HamburgerMenu';
import { generatePath } from '../../paths';
import { ToolbarmenuOptions } from '../../app/constants';
import Login from '../auth/Login';

const StyledAppBar = styled(MuiAppBar)(({ theme }) => ({
  height: 80,
  padding: 4,
}));

const LeftBox = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  flex: 1,
}));

const RightBox = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  flex: 4,
  justifyContent: 'flex-end',
}));

const RoshoonLogo = styled(Stack)(({ theme }) => ({
  color: theme.palette.common.white,
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.logo.primary,
}));

const AppBar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const navigateTo = (url) => {
    navigate(generatePath(url.path));
  };
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
      ['google', 'facebook', 'roshoon'].includes(session.authenticationType),
      session.authenticationType
    );
  }, [session]);

  return (
    <StyledAppBar>
      <Toolbar disableGutters className="flex justify-between">
        <LeftBox>
          <HamburgerMenu
            menuOptions={ToolbarmenuOptions}
            onMenuClick={navigateTo}
          />
          <RoshoonLogo>
            <Link to="/" underline="none">
              <StyledTypography variant="h4">Roshoon</StyledTypography>
            </Link>
          </RoshoonLogo>
        </LeftBox>
        <RightBox>
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
                  className="w-10 bg-slate-300"
                  style={{ backgroundColor: '#fff', padding: 0 }}
                >
                  <img
                    src={session.user?.picture || '/path/to/default-image.jpg'}
                    alt={'user'}
                    onError={(e) => {
                      e.target.src = '/path/to/default-image.jpg';
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
                <Login />
              </>
            )}
          </div>
        </RightBox>
      </Toolbar>
    </StyledAppBar>
  );
};

export default AppBar;
