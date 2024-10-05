import React, { useState } from 'react';
import {
  Stack,
  styled,
  AppBar as MuiAppBar,
  Toolbar as MuiToolBar,
  Box,
  Paper,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Link, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { ToolbarmenuOptions } from '../../app/constants';
import HamburgerMenu from '../../components/HamburgerMenu';
import { generatePath } from '../../paths';

const StyledAppBar = styled(MuiAppBar)(({ theme }) => ({
  height: 80,
  padding: 4,
}));

const Toolbar = styled(MuiToolBar)(({ theme }) => ({
  padding: theme.spacing(2),
  justifyContent: 'space-between',
  alignItems: 'center',
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

  return (
    <div>
      <StyledAppBar>
        <Toolbar disableGutters>
          <LeftBox>
            <HamburgerMenu
              menuOptions={ToolbarmenuOptions}
              onMenuClick={navigateTo}
            />
            <RoshoonLogo>
              <Link component={RouterLink} to="/" underline="none">
                <StyledTypography variant="h4">Roshoon</StyledTypography>
              </Link>
            </RoshoonLogo>
          </LeftBox>
        </Toolbar>
      </StyledAppBar>
    </div>
  );
};

export default AppBar;
