import { Stack, styled } from "@mui/material";
import React from "react";

const FooterBox = styled(Stack)(({ theme }) => ({
  position: "fixed",
  bottom: 0,
  width: "100%",
  height: 50,
  zIndex: 100,
  background: theme.palette.background.default,
}));

const Footer = () => {
  return <FooterBox>Footer</FooterBox>;
};

export default Footer;
