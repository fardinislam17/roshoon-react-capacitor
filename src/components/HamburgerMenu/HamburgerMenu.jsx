import React, { useState } from 'react';
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText as MuiListItemText,
  styled,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const ListItemText = styled(MuiListItemText)(({ theme }) => ({
  cursor: 'pointer',
}));

const HamburgerMenu = ({ menuOptions, onMenuClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setIsOpen(open);
  };

  return (
    <>
      <IconButton
        onClick={toggleDrawer(true)}
        edge="start"
        color="inherit"
        aria-label="menu"
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
        <List>
          {menuOptions.map((option, index) => (
            <ListItem button key={index} onClick={() => onMenuClick(option)}>
              <ListItemText primary={option.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default HamburgerMenu;
