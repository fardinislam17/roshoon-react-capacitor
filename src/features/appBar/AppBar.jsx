import {
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  AppBar as MuiAppBar,
  Stack,
  styled,
  Toolbar,
} from '@mui/material';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CiLocationOn } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from 'src/apis';
import RoshoonLogo from 'src/assets/roshoon.png';
import { generatePath } from 'src/paths';
import { getCurrentUser } from 'src/slices';
import * as paths from '../../paths.js';
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
          <div className="flex gap-10 mr-5 items-center">
            <div className=" flex items-center gap-[10px] p-[10px]">
              <button className="text-[#272727] text-xl">
                <CiLocationOn />
              </button>
              <Link to="#" className="text-[#272727] font-lato font-medium">
                {t('Locate me')}
              </Link>
            </div>
            <Link
              to={paths.login}
              className="text-[#272727] font-lato font-medium p-[10px]"
            >
              {t('Become a Chef')}
            </Link>
            <Link
              to={paths.register}
              className="text-[#272727] font-lato font-medium p-[10px]"
            >
              {t('Sign Up')}
            </Link>
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
              <Link
                to={paths.login}
                className="text-[#272727] font-lato font-medium p-[10px]"
              >
                {t('common.logIn')}
              </Link>
            )}
          </div>
        </RightBox>
      </Toolbar>
    </StyledAppBar>
  );
};

export default AppBar;
