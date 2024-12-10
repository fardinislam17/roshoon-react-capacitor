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
import RoshoonLogo from 'src/assets/images/roshoon.png';
import { generatePath } from 'src/paths';
import { getCurrentUser } from 'src/slices';
import { Constant } from 'src/utils/constant.js';
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
  const currentUser = useSelector(getCurrentUser);
  const [userLogout, { isLoading, isSuccess, isError }] = useLogoutMutation();
  const user = useSelector(getCurrentUser);
  const handleLogout = async () => {
    try {
      const status = await userLogout().unwrap();
      notifySuccess(status.message);
    } catch (error) {
      notifyError(error.message);
    }
  };

  return (
    <StyledAppBar style={{ boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)' }}>
      <Toolbar disableGutters className="flex justify-between ">
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
                {t('common.locateMe')}
              </Link>
            </div>
            {!user?.roles?.includes(Constant.CHEF) && (
              <Link
                to={`${paths.register}?asChef=true`}
                className="text-[#272727] font-lato font-medium p-[10px]"
              >
                {t('common.becomeChefForLogin')}
              </Link>
            )}

            {currentUser?.loggedIn ? (
              <div className="flex justify-center items-center gap-2">
                <button
                  className="text-[#272727] font-lato font-medium p-[10px]"
                  onClick={handleLogout}
                >
                  {t('common.logOut')}
                </button>
              </div>
            ) : isLoading ? (
              <CircularProgress size={20} />
            ) : (
              <div className="flex items-center gap-[10px]">
                <Link
                  to={paths.register}
                  className="text-[#272727] font-lato font-medium p-[10px]"
                >
                  {t('common.signUp')}
                </Link>
                <Link
                  to={paths.login}
                  className="text-[#272727] font-lato font-medium p-[10px]"
                >
                  {t('common.logIn')}
                </Link>
              </div>
            )}
          </div>
        </RightBox>
      </Toolbar>
    </StyledAppBar>
  );
};

export default AppBar;
