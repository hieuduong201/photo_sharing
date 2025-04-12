import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

const TopBar = ({ currentUserName }) => {
  const location = useLocation();
  let contextText = '';

  if (location.pathname.startsWith('/photos/')) {
    contextText = `Photos of ${currentUserName}`;
  } else if (location.pathname.startsWith('/users/')) {
    contextText = currentUserName;
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Name
        </Typography>
        <Typography variant="subtitle1">
          {contextText}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
