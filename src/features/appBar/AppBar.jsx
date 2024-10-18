import React, { useState } from 'react';
import {
  Stack,
  styled,
  AppBar as MuiAppBar,
  Toolbar as MuiToolBar,
  Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ToolbarmenuOptions } from '../../app/constants';
import HamburgerMenu from '../../components/HamburgerMenu';
import { generatePath } from '../../paths';
import SearchBar from 'src/components/SearchBar';

const BarHeader = styled(Stack)(({ theme }) => ({
  color: theme.palette.common.white,
}));

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
    <StyledAppBar>
      <Toolbar disableGutters>
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
          <SearchBar />
        </RightBox>
      </Toolbar>
    </StyledAppBar>
  );
};

export default AppBar;
