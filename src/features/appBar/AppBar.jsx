import React, { useState, useRef } from 'react';
import RoshoonLogo from 'src/assets/roshoon.png';
import {
  Stack,
  styled,
  AppBar as MuiAppBar,
  Menu,
  MenuItem,
  IconButton,
  Toolbar,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getCurrentUser } from 'src/slices';
import { generatePath } from 'src/paths';
import { useLogoutMutation } from 'src/apis';
import Login from 'src/features/auth/Login';
import { notifyError, notifySuccess } from '../snackbarProvider/useSnackbar';

const StyledAppBar = styled(MuiAppBar)(({ theme }) => ({
  height: 80,
  padding: 4,
  background: theme.palette.background.default,
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

const RoshoonLogoContainer = styled(Stack)(({ theme }) => ({
  color: theme.palette.common.white,
}));

const AppBar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(getCurrentUser);
  const menuAnchorRef = useRef(null);
  const [userLogout, { isLoading, isSuccess, isError }] = useLogoutMutation();
  const [open, setOpen] = useState(false);
  const navigateTo = (url) => {
    navigate(generatePath(url.path));
  };

  const handleLogout = async () => {
    try {
      const status = await userLogout().unwrap();
      notifySuccess(status.message);
      setOpen(false);
    } catch (error) {
      notifyError(error.message);
    }
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
          <RoshoonLogoContainer>
            <Link to="/" underline="none">
              <img
                src={RoshoonLogo}
                alt="Roshoon Logo"
                style={{ height: 'auto', width: '150px' }}
              />
            </Link>
          </RoshoonLogoContainer>
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
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
            ) : isLoading ? (
              <CircularProgress size={20} />
            ) : (
              <Login />
            )}
          </div>
        </RightBox>
      </Toolbar>
    </StyledAppBar>
  );
};

export default AppBar;
