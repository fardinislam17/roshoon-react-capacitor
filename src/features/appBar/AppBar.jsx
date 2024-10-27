import React, { useState, useRef } from 'react';
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
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { logout, getCurrentUser } from 'src/slices';
import HamburgerMenu from 'src/components/HamburgerMenu';
import { generatePath } from 'src/paths';
import { SIDEBAR_MENU_OPTIONS } from 'src/app/constants';
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigateTo = (url) => {
    navigate(generatePath(url.path));
  };
  const currentUser = useSelector(getCurrentUser);
  const menuAnchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const logOut = () => {
    setOpen(false);
    dispatch(logout());
  };

  const handleMenuClose = () => {
    setOpen(false);
  };

  const handleMenuClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <StyledAppBar>
      <Toolbar disableGutters className="flex justify-between">
        <LeftBox>
          <HamburgerMenu
            menuOptions={SIDEBAR_MENU_OPTIONS}
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
            {currentUser?.loggedIn ? (
              <div className="flex justify-center items-center gap-2">
                <h1 className="text-white text-sm">
                  {currentUser.name || currentUser.email}
                </h1>
                <IconButton
                  onClick={handleMenuClick}
                  ref={menuAnchorRef}
                  aria-controls={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  className="w-10 bg-slate-300"
                  style={{ backgroundColor: '#fff', padding: 0 }}
                >
                  <img
                    width={100}
                    height={100}
                    src={currentUser.picture}
                    alt={'user'}
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
