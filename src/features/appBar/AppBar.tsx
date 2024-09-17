import React from "react";
import { Stack, styled, AppBar as MuiAppBar, Toolbar } from "@mui/material";

const BarHeader = styled(Stack)(({ theme }) => ({
  color: theme.palette.common.white,
}));

const StyledAppBar = styled(MuiAppBar)(({ theme }) => ({
  height: 80,
  padding: 4,
}));

const AppBar = () => {
  return (
    <StyledAppBar>
      <Toolbar disableGutters>
        <BarHeader>Roshoon</BarHeader>
      </Toolbar>
    </StyledAppBar>
  );
};

export default AppBar;
